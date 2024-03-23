Made at Hack the Student Life 2024 (AWS Hacks 2024)

# The heartbeat of campus, right at your fingertips. 

Today, students at the University of Toronto have to navigate through a fragmented landscape of social media and word-of-mouth to discover campus events and activities when seeking to engage with their community and expand their interests. UofT's latest innovation, Campus Pulse, aims to revolutionize this experience by creating a unified platform that not only bridges the gap between students and campus activities but also tailors event recommendations to each student's interests and schedule. By integrating a comprehensive campus map, an intelligent event recommendation engine, and a conversational AI for personalized inquiries, Campus Pulse ensures that every student can easily connect with clubs, workshops, and gatherings that resonate with their passions. Whether you're looking to meet fellow ML enthusiasts, join a new sport, or simply find the next campus event, Campus Pulse brings the heartbeat of UofT to your fingertips. Join us in transforming how students experience campus life, making it more accessible, engaging, and aligned with what truly matters to them.

* For student users, Campus Pulse has four main interfaces, each with its unique functionalities and usage.
  * The home page displays recent events, where the student can filter based on their specific interests.
  * The interactive map allows the student to visualize the activities going on around campus, where they can easily find the date and time for each event.
  * The intelligent calendar optimizes the student's schedule, integrating course timetables and informing the students of the activities occurring during their free time.
  * The conversational AI chatbot engages with the student, either verbally or via text, and provides personalized recommendations and answer any inquiries.

* For club administrators, Campus Pulse has an additional feature to upload events through inputting the time, location and other details.

The backend is built using various Amazon Web Services. AWS Cognito is used for user authentication, with two user groups available, students and club administrators. AWS Transcribe and Translate are used to enable real-time verbal inputs for students. AWS Sage Maker, S3, Hugging Face, Langchain, LLAMA2, and RAG prompting are used for AI chatbot with event database. The frontend is built using HTML, Javascript, NextJS and tailwind CSS with visuals made using Figma. All in 6 hours!

Check out our devpost! 
https://devpost.com/software/campus-pulse
