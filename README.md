# 📊 Track Expense AI with Next.js 
### Live Link: https://ai-integrated-expense-tracker-next.vercel.app/

A **full-stack AI-powered expense tracker** built with **Next.js** that helps you track daily expenses seamlessly while providing intelligent insights.  
Designed with **Tailwind CSS v4**, secured with **Clerk authentication**, and powered by **OpenAI** for smart expense categorization and analysis.

---

## 🚀 Features

- **💳 Expense Tracking** – Log your daily expenses quickly and easily.
- **🎨 Modern UI** – Fully responsive, sleek design using Tailwind CSS v4.
- **🔐 Secure Authentication** – Clerk provides a robust and flexible auth system.
- **🧠 AI Assistant (OpenAI)**:
  - Auto-categorizes new expenses.
  - Summarizes your spending into clear insights.
  - Answers follow-up questions about your spending patterns.
  - Handles errors gracefully with safe fallbacks.
- **📈 Visual Analytics** – View your expenses in a **Chart.js bar chart**.
- **🏆 Best/Worst Expense Highlights** – See your highest and lowest expenses.
- **🗄 Database & ORM** – **Neon PostgreSQL** with **Prisma ORM**.
- **☁️ Deployment** – Hosted and deployed on **Vercel**.

---

## 🛠 Tech Stack

| Category         | Technology |
|------------------|------------|
| Frontend         | Next.js 14, Tailwind CSS v4 |
| Backend          | Next.js (Server Actions) |
| Database         | Neon – PostgreSQL |
| ORM              | Prisma |
| Authentication   | Clerk |
| AI Integration   | OpenAI API |
| Charts           | Chart.js |
| Deployment       | Vercel |

---

## 📸 Screenshots

*(Add screenshots of your app here for better presentation)*

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AsmShuvo/AI-Integrated-Expense-Tracker-NextJS-UPDATED-.git
cd AI-Integrated-Expense-Tracker-NextJS-UPDATED-
npm i
```
### At the root of the project folder, create a file named `.env` and paste the following
```
DATABASE_URL = postgresql://neondb_owner:<Your UrL here>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here>
CLERK_SECRET_KEY=<your secret key here>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

OPENROUTER_API_KEY = <your open API key here>
NEXT_PUBLIC_APP_URL = http://localhost:3000/
```

### Generate Prisma client

```
npx prisma generate
```

### Run the development server
```
npm run dev
```

Your application should now be running at `localhost`
