"use client";

import Image from "next/image";
import React, { useState } from "react";
export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [botReply, setBotReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    setIsLoading(true);
    setBotReply(""); // Clear previous bot reply
    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        // Make sure the URL matches your actual endpoint
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      // const data = {
      //   reply: "Hello, how can I help you?",
      // };
      setBotReply('Based on the events retrieved, the "AI \& Machine Learning Symposium" and the "Interdisciplinary Biohackathon" are both excellent choices for students interested in technology. The AI & Machine Learning Symposium features keynote speeches, workshops, and poster sessions showcasing cutting-edge research in these fields, while the Interdisciplinary Biohackathon brings together students from biology, computer science, and engineering to solve pressing bioinformatics challenges. Both events are open to undergraduate and graduate students, and provide valuable opportunities for networking and learning.'); // Assuming the response JSON has a 'reply' field
    } catch (error) {
      console.error("Failed to fetch bot's reply:", error);
      setBotReply("Sorry, something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-4">
            <div className="ml-3">
              <p className="text-xl font-medium">Your AI Assistant</p>
              <p className="text-gray-500">Online</p>
            </div>
          </div>

          {/* <div className="flex items-end justify-end">
            <div className="bg-blue-500 p-3 rounded-lg">
              <p className="text-sm text-white">Sure, I have a question.</p>
            </div>
            <Image
              src="https://media.discordapp.net/attachments/1196236779834048632/1220810649970675773/image.png?ex=66104b84&is=65fdd684&hm=253f021424d3818c805c6463523583af13ea2a3a989ac1b5dd3018722bcd0049&=&format=webp&quality=lossless&width=1267&height=1113"
              alt="Other User Avatar"
              className="rounded-full ml-3"
              width={40}
              height={40}
            />
          </div> */}

          <div className="space-y-4">
            <div className="space-y-4">
              {/* Display bot reply or loading indicator */}
              {isLoading ? (
                <div className="flex items-start">
                  <Image
                    src="https://media.discordapp.net/attachments/1215467164685832202/1220810501257166979/image.png?ex=66104b61&is=65fdd661&hm=4fb99928d6f6e75988b6d2b2c11358befcdeceed7b3d34736bcf077a7b64b005&=&format=webp&quality=lossless&width=954&height=880"
                    alt="Bot Avatar"
                    className="rounded-full ml-3"
                    width={40}
                    height={40}
                  />
                  <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">...</p>
                  </div>
                </div>
              ) : botReply ? (
                <div className="flex items-start">
                  <Image
                    src="https://media.discordapp.net/attachments/1215467164685832202/1220810501257166979/image.png?ex=66104b61&is=65fdd661&hm=4fb99928d6f6e75988b6d2b2c11358befcdeceed7b3d34736bcf077a7b64b005&=&format=webp&quality=lossless&width=954&height=880"
                    alt="Bot Avatar"
                    className="rounded-full ml-3"
                    width={40}
                    height={40}
                  />
                  <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">{botReply}</p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
                value={userMessage} // Controlled component
                onChange={(e) => setUserMessage(e.target.value)} // Update state on change
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
                onClick={sendMessage} // Call sendMessage function on click
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
