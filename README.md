## 🌟 Inspiration
Working on mental health takes incredible strength, courage, and perseverance. Yet, alongside this journey often comes the burden of tedious paperwork. For instance, therapists typically see an average of seven clients per day, and as they jot down notes in Electronic Health Records (EHR), the process can generate unnecessary physical clutter. Similarly, clients may be given actionable goals during their sessions, but without a system to track them, these valuable insights are easily forgotten. We saw an opportunity to streamline this process.

That’s why we created Therassist — a solution that empowers both therapists and clients to be the best version of themselves. By reducing the busy work, Therassist allows therapists to focus on what truly matters: fostering growth and providing personalized care. For clients, it helps track mood, mindfulness, and overall wellbeing, ensuring they stay aligned with their therapy goals.

## 🛠️ What It Does
Therassist is an intuitive web application designed to streamline and enhance the therapy experience for both clients and therapists. Upon signing in, users select their role as either a client or a therapist to access tailored features.

For Therapists: Therapists have access to a comprehensive dashboard where they can view client information, session notes, and associated data—all organized and easily accessible. Powered by interactive AI, the app helps therapists quickly generate session summaries and detailed notes based on what was documented on paper, as well as easily follow-up with patients, reducing manual work and ensuring accuracy.

For Clients: Clients have their own personalized dashboard, which includes features such as journaling, mood tracking, audio recordings, and reminders for tasks or activities designed to improve their mental well-being. These tools help clients stay engaged in their progress and stay on top of their therapy goals between sessions.

Therabot: The Virtual Assistant Both therapists and clients benefit from Therabot, an AI-driven assistant that enhances the therapy experience. Therapists can ask Therabot for concise summaries of patient data or treatment plan suggestions. Clients can interact with Therabot outside of their sessions to reflect on their emotions, practice grounding exercises, and receive support for mental well-being. After each therapy session, an automatic email is sent to the client with a recap of the session's key points and any homework or tasks to focus on for the week.

Seamless Data Upload and Integration Therassist makes it easy to upload and manage session data in three convenient ways:

— File Upload: Clients and therapists can easily upload documents or notes.

— Image Capture: Users can take pictures using their webcam, and the app will automatically detect and convert handwritten notes or journal entries into digital text using Google Cloud Vision OCR. This allows for quick, seamless updates to session records.

— Audio Recordings: Users can record their thoughts or sessions, and the app will transcribe audio to text, making it easy to track progress and review key insights from recordings.

## 🧱 How we built it
Frontend: Next.js, React.js, Flowbite, Tailwind CSS Backend: MongoDB, Express.js

## Challenges we ran into
Connecting to MongoDB: a port 5000 error on Mac stumped us for many hours
A loading issue with Flowbite (React UI)
Switching from Tesseract to Google Cloud Vision for OCR
Accomplishments that we're proud of
Fully incorporating text recognition with OCR
Incorporating Gemini API with the chatbot and responds in real time
Integrating the database
What's next for Therabot
Add integration with health data from Apple watches or fitbit (sleep, heart rate, wellness)

## To Run
First, 
```
cd bitcamp2025
npm install
```
Then, run ```npm run dev``` and the frontend should show up on localhost:3000.

To run the backend, 
```
cd bitcamp2025
cd server
npm install
```
and run ```node index.js``` and the backend should be running on localhost:5000.
