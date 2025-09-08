# AGENTS.md – SHIKSHAK AI Education Platform

## Project Overview
SHIKSHAK is an AI-powered educational platform built with Next.js 15, featuring a modular architecture with shared core and native shells. It supports real-time AI tutoring, gamification (streaks, badges), session management, resources, analytics, and comprehensive user management. Users can interact with AI companions via chat, referencing YouTube videos or PDFs, with context-aware answers and transcript logging.

---

## Tech Stack
- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Auth:** Clerk (initial), BetterAuth (future), with abstracted auth interface
- **Database:** Convex (initial), PostgreSQL with pgvector (future)
- **AI/ML:** OpenRouter (Gemini/Claude), orchestrated via LangChain
- **Infrastructure:** Vercel (initial), Docker & Kubernetes for scaling
- **Monitoring:** Sentry (initial), Prometheus (future)
- **TTS:** Saarvam / Veena integration
- **UI Components:** Shadcn/UI v4 (with references to `/shells/prototype/` folder for extra UI components)
- **Styling:** Tailwind CSS
- **Dev Tools:** Context7 MCP server for documentation

---

## Key Architectural Decisions
- **Auth Abstraction:** Implemented to allow seamless switching between Clerk and BetterAuth in future.
- **AI Context Handling:** OpenRouter and LangChain chains support dynamic model switching and context-specific responses.
- **Content Storage:** No video uploads; YouTube and PDF transcripts only.
- **Web-First Approach:** Focus on responsive web app before mobile adaptation.
- **Fallback & Transition Plans:** Technologies are chosen for initial launch with planned migrations (Convex → PostgreSQL, Sentry → Prometheus, Clerk → BetterAuth).

---

## Intended Folder Structure (ASCII Tree)

Note: The Next.js project is located in `SC-NS/shells/web/`. The structure below is relative to that directory.

```text
app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Root page (e.g., /)
│   ├── chat/
│   │   └── page.tsx            # Chat page (e.g., /chat)
│   └── api/
│       └── ...                 # API routes
├── components/
│   ├── ui/                     # Shadcn UI components
│   ├── ChatWidget.tsx
│   ├── VideoEmbed.tsx
│   └── ...                     (Reference prototype folder: shells/prototype/)
├── convex/
│   ├── mutations/
│   ├── queries/
│   └── schema.ts
├── lib/
│   ├── openRouter.ts
│   ├── langchain.ts
│   └── authInterface.ts
├── hooks/
│   ├── useAuth.tsx
│   └── useChat.ts
├── public/
│   ├── icons/
│   └── logo.png
└── ...
```

---

MVP Task Table

| Task                     | Subtasks / Details                    | Tech                     | Files / Context                               | Status | Notes                                                                 |
|---------------------------|---------------------------------------|--------------------------|-----------------------------------------------|--------|-----------------------------------------------------------------------|
| Initialize project        | Scaffold Next.js 15 with TypeScript  | Next.js, TS              | package.json, next.config.js                  | ✅ Completed | Web-first setup for MVP; TypeScript strict mode enabled               |
| Configure styling         | Setup Tailwind CSS and Shadcn/UI     | Tailwind, Shadcn/UI      | tailwind.config.js, components/ui/, shells/prototype/ | ✅ Completed | Prototype folder referenced for extra UI components                  |
| Integrate authentication  | Implement Clerk-based auth system    | Clerk                    | components/auth/, hooks/useAuth.ts           | ✅ Completed | Initial auth choice; abstracted interface allows future switch to BetterAuth |
| Abstract auth interface   | Create generic auth module for future| TypeScript               | lib/authInterface.ts                         | ✅ Completed | Auth abstraction ensures seamless migration to BetterAuth later       |
| Set up database           | Configure Convex (collections & sync)| Convex                   | convex/schema.ts, convex/functions/          |        | Initial DB; scalable real-time interactions; migration plan for PostgreSQL + pgvector |
| Plan data migration       | Prepare PostgreSQL + pgvector schema | PostgreSQL, pgvector     | migrations/, docs/db-migration.md            |        | Future-proofing AI vector storage; only needed if Convex limits reached |
| Develop chat UI           | Build chat page and components       | React, Next.js           | pages/chat.tsx, components/ChatWidget.tsx    |        | References `/shells/prototype/` for components and layout patterns    |
| AI integration            | Connect OpenRouter (Gemini/Claude)   | OpenRouter, LangChain    | lib/openRouter.ts, lib/langchain.ts          |        | Live, context-aware AI companion for chat and YouTube/PDF sessions   |
| Content processing        | Implement PDF and YouTube parsing    | Node.js                  | lib/pdfParser.ts, lib/videoParser.ts         |        | Generate session context; transcripts and timestamps for AI reference|
| Log transcripts           | Store transcripts and chats to DB    | Convex                   | convex/mutations/addTranscript.js            |        | Essential for context persistence in real-time chat sessions         |
| Streaks engine            | Points, badges UI & backend logic    | React, Zustand           | components/Streaks/, pages/profile.tsx       |        | Habit-building streaks, XP, leaderboards; encourages consistent usage|
| TTS integration           | Saarvam/Veena voice output           | Saarvam, Veena           | lib/tts.ts                                   |        | AI companion voice output; flexible for future paid model integration|
| Monitoring setup          | Configure Sentry and error alerts    | Sentry                   | sentry.config.js                              |        | Initial monitoring; future migration to Prometheus for metrics       |
| Documentation & logging   | Update devlog.md and AGENTS.md tasks | -                        | devlog.md, AGENTS.md                          |        | Daily logging of progress, errors, blockers, or implementation notes |

---

Execution Protocol for Jules

1. Sequential Execution: Follow tasks one by one. Only proceed after completing the current task.


2. Task Decomposition: Break large tasks into smaller subtasks if needed; implement all required logic for feature completion.


3. Status Updates: Mark task status in the table upon completion (✅ Completed, 🔄 In Progress, ⬜ Planned).


4. Devlog Maintenance: Use devlog.md for daily progress, errors, blockers, or special notes with date stamps.


5. Clarification: Pause and request clarification if requirements are unclear before proceeding.




---

References & Best Practices

PRD & Docs: docs/PRD/, docs/architecture.md

UI/UX Reference: shells/prototype/ folder contains extra HTML/CSS/JS components and templates

AGENTS.md Standard: See OpenAI agents.md format

Best Practices: Follow modular, maintainable, and web-first design; implement abstraction layers for auth, AI, and DB.


This version includes:

- **MVP task table** updated to reflect current progress and decisions.
- **ASCII folder tree** showing final intended structure.
- **Rules for Jules** with sequential task execution, devlog maintenance, and task splitting.
- **Prototype folder reference** in both folder tree and task table for extra UI guidance.
