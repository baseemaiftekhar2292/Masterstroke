Act as a Senior Full-Stack Software Engineer and EdTech Architect. Build a modern, highly responsive web platform for "Masterstroke" — an online learning and test preparation app tailored for NEET and JEE aspirants.

System & Application Architecture Guidelines:

1. CORE OVERVIEW & TARGET AUDIENCE
- Platform Name: Masterstroke
- Target Audience: NEET (Medical) & JEE (Engineering) Aspirants
- Primary Goal: Deliver an interactive, fast, and scalable learning dashboard with test series, AI doubt solving, and personalized analytics.

2. TECHNICAL STACK (Vercel Ready)
- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS + Shadcn UI / Radix UI components
- Database: PostgreSQL (Prisma ORM / Supabase) for user records, tests, and subscriptions; MongoDB/Redis for fast question bank queries.
- Authentication: NextAuth.js / Clerk
- Real-time Engine: WebSockets / Server-Sent Events (SSE) for real-time test timer and AI Avatar chat streams.
- Deployment: Optimized for Vercel Edge Runtime and Vercel Serverless Functions.

3. KEY FEATURES & MODULES
- Dashboard: Performance overview, subject-wise accuracy (Physics, Chemistry, Biology, Mathematics), weak-area alerts, and test history.
- Dynamic Test Engine: Real-time NTA-pattern mock tests with timer, question navigation grid, single/multiple option selection, bookmarking, and instant scoring.
- AI Avatar & Doubt Solver: Streaming AI chatbot interface for step-by-step doubt resolution.
- Multilingual Toggle: UI dynamic state switching between English, Hindi, and Hinglish.

4. SUBSCRIPTION & SYLLABUS DATA SCHEMA
- Data models for Users, Subscriptions (Free, Pro NEET, Pro JEE, Masterstroke Ultimate), Tests, and Subject Modules.
- Authentic NTA-mapped syllabus schema for NEET (Physics, Chemistry, Biology) and JEE (Physics, Chemistry, Mathematics).

OUTPUT INSTRUCTIONS:
Provide full production-ready code setups, Next.js page components, Prisma database schema, and step-by-step instructions to deploy directly on Vercel.
