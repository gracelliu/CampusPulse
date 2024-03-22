from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import GPT4All
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from datetime import datetime
import bs4
import json
load_dotenv()
app = Flask(__name__)
CORS(app)

simulator = None
iteration = 0


file_path = "test.json"
from langchain_community.document_loaders import JSONLoader
loader = JSONLoader(
    file_path=file_path,
    jq_schema='.',
    text_content=False)

data = loader.load()
vectorstore = Chroma.from_documents(documents=data, embedding=GPT4AllEmbeddings())
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 6})

retrieved_docs = retriever.get_relevant_documents( "machine learning" )

from langchain.callbacks.manager import CallbackManager

model_path="models/ggml-model-Q4_K_M.gguf"
callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])
llm = GPT4All(
    model=model_path,
    # model_path="/Users/xiao215/UofT/ASR-Multi-agent-TTS/llama-2-7b-chat.Q4_0.gguf",
    # n_gpu_layers=n_gpu_layers,
    callback_manager=callback_manager,
    verbose=True,  # Verbose is required to pass to the callback manager
    streaming=True,
)


condense_system_prompt = """Given a chat history and the latest user question \
which might reference the chat history, formulate a standalone question \
which can be understood without the chat history. Do NOT answer the question, \
just reformulate it if needed and otherwise return it as is."""
condense_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", condense_system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ]
)
condense_chain = condense_prompt | llm | StrOutputParser()

# If you don't know the answer, just say that you don't know. \

qa_system_prompt = """You are an assistant for question-answering tasks about events happening at University of Toronto. \
Use the following pieces of retrieved context about events to answer the question. \
Do not make up event yourself, only answer based on the events you got provided. \
Use three sentences maximum and keep the answer concise.\
{context}"""
qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", qa_system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ]
)


def condense_question(input: dict):
    if input.get("chat_history"):
        return condense_chain
    else:
        return input["question"]

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
        RunnablePassthrough.assign(context=condense_question | retriever | format_docs)
        | qa_prompt
        | llm
)
# print(condense_question | retriever | format_docs)
chat_history = []

@app.route('/api/chat', methods=['GET'])
def create_sim():
    question = "What event do you recommend if i want to learn about ML"
# question = request.json['question']
    question = "What is the best hackathon I should attend if Im interested in tech."
    ai_msg = rag_chain.invoke({"question": question, "chat_history": chat_history})
    chat_history.extend([HumanMessage(content=question), AIMessage(content=ai_msg)])
    print(ai_msg)
    return jsonify({"response": ai_msg})

@app.route('/', methods=['GET'])
def home():
    return "<h1>LangChain API</h1><p>This site is a prototype API for LangChain.</p>"

if __name__ == '__main__':
    app.run(debug=True)
