# Smart Task Manager (AI Powered)

🔗 **Live Deployment:**  
https://smart-task-manager-v2.vercel.app

---

## ✨ Features

- Create / Edit / Delete tasks  
- Suggest 3-5 subtasks using Google Gemini AI  
- Responsive design (works beautifully on mobile & desktop)  
- Gemini API integration via Next.js API routes  
- Clean and simple UI built with Tailwind CSS and TypeScript

---

## 🧠 Technologies Used

- Next.js 15+ with App Router  
- TypeScript  
- Tailwind CSS  
- Google Gemini API  

---

## ⚠️ Challenges Faced

During the development of the Smart Task Manager, I encountered a few key challenges:

- **Gemini API Integration & Rate Limits:**  
  Google Gemini API sometimes enforces strict quota limits causing AI subtask suggestions to fail. I implemented robust error handling on both backend and frontend to handle these gracefully, showing user-friendly messages when AI suggestions are temporarily unavailable.

- **Environment Variable Management:**  
  Securely storing and accessing the Gemini API key through environment variables for safe deployment.

This project enhanced my skills in asynchronous API handling, error recovery, and secure environment configuration.

---

## ⚙️ Setup Instructions

1. **Clone the repository:**

   \`\`\`bash
   git clone https://github.com/toriqulislamrupai/smart-task-manager.git
   cd smart-task-manager
   \`\`\`

2. **Install dependencies:**

   Using pnpm:

   \`\`\`bash
   pnpm install
   \`\`\`

   Or using npm:

   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables:**

   Create a \`.env.local\` file at the root of the project with:

   \`\`\`env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   \`\`\`

4. **Run the development server:**

   Using pnpm:

   \`\`\`bash
   pnpm dev
   \`\`\`

   Or npm:

   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open [http://localhost:3000](http://localhost:3000) to view it in your browser.**

---

## 📚 Additional Notes

- The app is designed prioritizing **quality over features**: basic task management works flawlessly, and AI features add extra value.
- If Gemini API fails due to limits or errors, the UI handles it smoothly without crashing.
- Feel free to explore the codebase and contribute!

---

## 📧 Contact

For questions or feedback, reach out to:  
**tanvir@passlimits.com**

---

## 🔖 License

This project is open-source and free to use.

---

Thank you for reviewing my submission!

---


