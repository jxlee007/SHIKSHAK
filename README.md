# SHIKSHAK Teaching Platform

**Version:** 1.0.0
**Last Updated:** September 5, 2025

## Project Overview

SHIKSHAK is an AI-driven learning platform where every user is a learner, student, or curious person. The platform offers two session types:  
- **General Sessions:** Open, dynamic, and knowledge-centric environments for exploring any topic with AI guidance—no explicit roles, just knowledge seekers.
- **Prebuilt Sessions:** Role-centric, structured sessions tailored to specific learning paths, templates, or curated experiences.

The AI acts as facilitator and tutor, providing real-time answers, explanations, and resources using internet knowledge and uploaded materials.

---

## Current Folder Structure

```
shared cores with native shells/
├── app.xml                  # Main application configuration file
├── configs/                 # Directory for shared configuration files
│   └── .gitkeep             # Ensures the directory is tracked by git
├── core/                    # Directory for platform-agnostic shared logic
│   └── .gitkeep             # Ensures the directory is tracked by git
├── docs/                    # Directory for all project documentation
│   ├── AGENTS.md            # Instructions and guidelines for AI agents
│   ├── Arch.txt             # High-level architecture overview
│   ├── PRD/                 # Product Requirement Documents
│   │   ├── PRD-V1.txt       # Version 1 of the PRD
│   │   └── PRD.txt          # Main PRD document
│   ├── data flow diagrams/  # Diagrams illustrating data flow
│   │   └── .gitkeep         # Ensures the directory is tracked by git
│   ├── user flow diagrams/  # Diagrams illustrating user flows
│   │   └── .gitkeep         # Ensures the directory is tracked by git
│   └── userflow-V1.txt      # Version 1 of the user flow documentation
├── scripts/                 # Directory for build and deployment scripts
│   └── .gitkeep             # Ensures the directory is tracked by git
└── shells/                  # Directory for platform-specific implementations (shells)
    └── prototype/                 # Web application prototype shell
        ├── agent-manage.html    # Prototype for agent management UI
        ├── ai-video-call-v2.zip # Zip archive for AI video call prototype
        ├── call-lobby.html      # Prototype for call lobby UI
        ├── chat-history.html    # Prototype for chat history UI
        ├── chat.html            # Prototype for main chat UI
        ├── create-agent.html    # Prototype for agent creation UI
        ├── create-meet.html     # Prototype for meeting creation UI
        ├── dashboard.html       # Prototype for user dashboard UI
        ├── dashboard.zip        # Zip archive for dashboard prototype
        ├── live session/        # Files for the live session prototype
        │   ├── app.js           # JavaScript for the live session
        │   ├── index.html       # HTML for the live session
        │   └── style.css        # CSS for the live session
        ├── meet-manage.html     # Prototype for meeting management UI
        ├── modal-template.html  # Prototype for a modal template
        ├── post-summary.html    # Prototype for post-session summary UI
        ├── styles.css           # General styles for prototypes
        └── upgrade.html         # Prototype for upgrade page UI
```

---

## Intended folder structure 

```
shared cores with native shells/
├── app.xml                       # Global app config
├── configs/                      # Shared configs (db, env templates, etc.)
│   └── .gitkeep
├── core/                         # Platform-agnostic shared logic
│   └── .gitkeep
├── docs/                         # Documentation
│   ├── AGENTS.md
│   ├── Arch.txt
│   ├── PRD/
│   │   ├── PRD-V1.txt
│   │   └── PRD.txt
│   ├── data flow diagrams/
│   │   └── .gitkeep
│   ├── user flow diagrams/
│   │   └── .gitkeep
│   └── userflow-V1.txt
├── scripts/                      # Deployment/build automation
│   └── .gitkeep
└── shells/                       # Platform-specific shells
    └──├─ prototypes/           # Old web application HTML prototypes (kept separate)
        │   ├── agent-manage.html
        │   ├── ai-video-call-v2.zip
        │   ├── call-lobby.html
        │   ├── chat-history.html
        │   ├── chat.html
        │   ├── create-agent.html
        │   ├── create-meet.html
        │   ├── dashboard.html
        │   ├── dashboard.zip
        │   ├── live session/
        │   │   ├── app.js
        │   │   ├── index.html
        │   │   └── style.css
        │   ├── meet-manage.html
        │   ├── modal-template.html
        │   ├── post-summary.html
        │   ├── styles.css
        │   └── upgrade.html
        ├─ web/           # Next.js with  App Router + Clerk auth with billing features + Convex actual product          
            │   ├── (auth)/       # Clerk auth routes
            │   ├── (dashboard)/  # User dashboard pages
            │   ├── api/          # API routes (webhooks, Convex actions)
            │   └── layout.tsx
            ├── components/       # Shared UI components (shadcn/ui, etc.)
            ├── convex/           # Convex schema & functions
            │   ├── schema.ts
            │   └── functions.ts
            ├── lib/              # Client helpers (Clerk, Convex client utils)
            │   ├── clerk.ts
            │   └── convex.ts
            ├── styles/           # Tailwind/global styles
            │   └── globals.css
            ├── public/           # Static assets
            ├── package.json
            ├── tsconfig.json
            ├── next.config.js
            └── .env.local        # Environment variables (Clerk/Convex keys)
```
___

## Feature List

| Feature                            | Summary                                                                 | Technology/API/Workflow                 | Recommendation (if not covered in PROTO)                |
|-------------------------------------|-------------------------------------------------------------------------|-----------------------------------------|---------------------------------------------------------|
| General Session (Open Knowledge)    | Users join open sessions to learn or discuss any topic with AI guidance | WebRTC, Node API, Soch AI Orchestration | UI for session browser and quick join                   |
| Prebuilt Session (Template-based)   | Structured, role-centric sessions based on curated templates            | Node API, Template Engine, React        | Add template/session gallery and onboarding flows        |
| Text/Audio/Video Interaction        | Chat or talk with AI or other learners in real time                     | WebRTC, Socket.io, Soch AI              | Mobile support, add group chat features                 |
| AI-Powered Q&A and Tutoring         | AI answers questions, explains concepts, and guides users               | Soch AI, RAG, TTS (Bulbul)              | Add toggle for AI depth/response style                  |
| Resource Search & Retrieval         | Users/AI fetch relevant resources from the internet or uploads          | Pinecone/Faiss, Web Scraper, S3         | Browser plugin for direct resource ingestion            |
| Consent & Privacy Controls          | Users control what data is shared/persisted during sessions             | Blockchain encryption, consent modal/UI | Add clear privacy dashboard and export tools            |
| Session Transcripts & Notes         | AI-generated transcripts and notes for review, search, and sharing      | STT (Saaras/Saarika), Node API           | Add export and highlight tools                          |
| Session Summary & Analytics         | Users view session summaries, achievements, and engagement stats        | Node API, Prometheus/Grafana             | Gamification UI and progress tracking                   |
| Accessibility & Responsive Design   | Platform works on desktop/mobile and meets accessibility standards      | React Native, WCAG 2.1 AA                | Audit for full compliance and touch/gesture support     |
| Social and Community Features       | Connect, share, and collaborate with other learners                     | Node API, React UI                       | Group chat, leaderboards, achievement sharing           |
| Moderation & Reporting              | AI/content moderation and reporting for safe, positive experience       | Node API, content filter workflows        | Add admin dashboard and moderation queue                |
| API Endpoints (CRUD, Ingest, AI)    | Well-defined endpoints for all platform features                        | Node/Express, OpenAPI spec                | Document endpoints and generate client SDK              |

---

## Gamification & Engagement

- **XP, Levels, Badges:** Drive habit formation, learning motivation, and user retention.
- **Leaderboards & Competitions:** Participation-based, with public displays and free rewards as the platform grows.
- **Portfolio Progress:** Users can build resumes/portfolios showing skill development and interests.
- **Notification System (Duolingo-style):** Use smart reminders and streak notifications to nudge users back into learning sessions, reinforce habits, and celebrate milestones.

---

## Session Types

- **General Sessions:**  
  - User-driven, accessible like chat or call with AI.
  - Topic discovery is organic: users share links, topics, concepts, and queries.
  - Users can start, share, and collaborate in sessions—think “Discord for teaching.”
- **Prebuilt Sessions:**  
  - Structured, role-centric learning paths curated by industry experts/teachers.
  - AI can proactively guide learning, suggest topics, and adapt paths to interests and market needs.

---

## Privacy & Moderation

- **User Data:**  
  - Session data, transcripts, and uploads are saved to a user’s encrypted knowledge base (blockchain network).
  - No anonymous participation; verified ID/account required for access.
- **Resource Uploads:**  
  - Users can upload PDFs, images, docs, code, etc. for contextual reference.
  - AI will use uploaded and internet-sourced knowledge for contextual answers.
- **Content Moderation:**  
  - Planning “book chain system” to mark/sort safe, high-quality content for AI parsing.
  - Future moderation may include user reporting, upvote/downvote, and admin dashboards.

---
