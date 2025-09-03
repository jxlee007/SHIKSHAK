# SHIKSHAK Teaching Platform

## Project Overview

SHIKSHAK is an AI-driven learning platform where every user is a learner, student, or curious person. The platform offers two session types:  
- **General Sessions:** Open, dynamic, and knowledge-centric environments for exploring any topic with AI guidance—no explicit roles, just knowledge seekers.
- **Prebuilt Sessions:** Role-centric, structured sessions tailored to specific learning paths, templates, or curated experiences.

The AI acts as facilitator and tutor, providing real-time answers, explanations, and resources using internet knowledge and uploaded materials.

---

## Folder Structure

```
SHIKSHAK/
├── Arch.txt                # Architecture overview and platform design
├── PRD/
│   └── PRD.txt             # Product requirements, MVP criteria, rollout plan
└── PROTO/
    ├── chat.html           # Chat UI prototype with AI assistant features
    ├── chat-history.html   # Meeting transcript viewer and search tool
    ├── call-lobby.html     # Call pre-join UI for permissions and entry
    ├── post-summary.html   # Session summary UI for metadata and navigation
    └── live session/
        ├── app.js         # JS logic for live video, AI responses, chat, upload
        └── index.html     # Live session UI (video grid, controls, chat, transcript)
```

---

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
