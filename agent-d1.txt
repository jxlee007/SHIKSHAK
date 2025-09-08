# AGENTS.md – SHIKSHAK AI Education Platform

## Project Overview
SHIKSHAK is an AI-powered educational platform built with Next.js 15, featuring Its modular architecture shared core with native shells supports real-time AI tutoring,streaks for gamification, session management, resources, analytics, and comprehensive user management.

## Tech Stack
- Frontend: Next.js 15 (App Router), React 18, TypeScript
- Backend: Convex (real-time database and serverless functions)
Authentication: Clerk (with billing features enabled)
- AI Provider: OpenRouter (unified access to multiple LLMs)
- AI Framework: LangChain (for AI workflow orchestration)
- UI Components: Shadcn/UI v4 (with MCP server integration)
- Styling: Tailwind CSS
Development Tools: Context7 MCP server for documentation


---

## SaaS Product Development Checklist

Based on industry best practices for SaaS development from idea validation through launch and beyond:
- **Validate your idea**: Market research, competitor analysis, value proposition, audience personas, MVP testing with metrics 0  
- **Design product & roadmap**: Feature prioritization, wireframes, user flows, mockups, UX testing 1  
- **Develop & iterate**: Build MVP, use agile sprints, iterative feedback loops 2  
- **Test thoroughly**: Unit, integration, performance, UX testing, bug tracking 3  
- **Ensure security & compliance**: Data protection, encryption, GDPR, privacy-by-design 4  
- **Deploy & launch**: CI/CD, hosting, product readiness review 5  
- **Market, onboard & support**: Freemium/trials, pricing strategy, content marketing, demos, onboarding flows 6  
- **Post-launch improvements**: User feedback, analytics, support loops, iteration 7  

---

## Task Breakdown Table (ASCII Format)

Here's a more granular breakdown for Jules, with clearer context for each subtask:

```ascii
| Done | ID   | Task/Subtask                  | Context (Files & Purpose)       | Technology Applied                      | Notes / Owner                |
|------|------|-------------------------------|----------------------------------|------------------------------------------|------------------------------|
| [ ]  | 0.1  | Userflow diagrams               | —                                | Use mermaid chart for diagrams in ASCII format  | Market research, personas, MVP test |
| [ ]  | 0.2  | data flow diagram for validation               | —                                | mermaid chart for diagrams in ASCII format     | Inputs, Output, integration points |
| [ ]  | 0.3  | Design roadmap                | —                          | PROTO folder for UI component reference in HTML/CSS/JS code            | Wireframes / user flows      |
| [ ]  | 1.1  | Init project structure        | package.json, next.config.js     | Next.js 15, TypeScript, Tailwind CSS     | App Router, TS strict mode   |
| [ ]  | 1.2  | Add core dependencies         | package.json                     | Convex, Clerk, LangChain, OpenRouter, Shadcn/UI, Context7 MCP | |
| [ ]  | 1.3  | Setup configurations          | next.config.js, tailwind.config.js | Tailwind, MCP integration, Env setup   | |
| [ ]  | 2.1  | Define DB models              | convex/schema.ts                 | Convex schema, TypeScript                | User, Session, Resource etc. |
| [ ]  | 2.2  | Configure auth flow           | convex/auth.config.ts            | Clerk (auth and billing), Convex         | |
| [ ]  | 2.3  | Setup billing & webhooks      | convex/billing.ts, .env.local    | Clerk billing, Webhooks, API integration | |
| [ ]  | 3.1  | AI orchestration manager      | core/ai/agentManager.js          | LangChain, OpenRouter                    | Context switching, error handling |
| [ ]  | 3.2  | Build RAG service             | core/ai/ragService.js            | Pinecone or Faiss, vector search         | |
| [ ]  | 3.3  | TTS abstraction               | core/ai/ttsService.js            | Bulbul / Saarika TTS APIs                | |
| [ ]  | 4.1  | Define TS models + validation | core/data/models/, Zod           | TypeScript, Zod                          | Schema & type safety         |
| [ ]  | 4.2  | Data adapters setup           | core/data/adapters/              | Convex adapter, blockchain integration   | |
| [ ]  | 4.3  | Migration utilities           | core/data/schema/                | Node.js scripts, Convex migrations       | |
| [ ]  | 5.1  | Atomic UI components          | core/ui/atoms/                   | Shadcn/UI, Tailwind, React               | Buttons, inputs, avatars     |
| [ ]  | 5.2  | Build molecular components    | core/ui/molecules/               | React, Tailwind, Shadcn/UI               | Cards, modals, menu bars     |
| [ ]  | 5.3  | Organisms + theming           | core/ui/organisms/               | Shadcn/UI, Tailwind, dark mode, WCAG     | Panels, theming, accessibility |
| [ ]  | 6.1  | Web shell & auth              | shells/web/, app/(auth)/         | Next.js, Clerk, React, Tailwind          | Layouts, sign-in flows       |
| [ ]  | 6.2  | Session UI responsiveness     | shells/web/components/           | Tailwind CSS, React                      | Session UI design            |
| [ ]  | 6.3  | WebRTC & offline support      | core/webrtc/, manifest           | WebRTC, PWA manifest                     | Real-time class, offline features |
| [ ]  | 7.1  | Subscription UI & logic       | app/(auth)/, billing.ts          | Clerk billing, React, Convex             | Subscription flows           |
| [ ]  | 7.2  | Settings & RBAC               | app/(auth)/settings/             | Role-based UI, Clerk + Convex            | Profiles and access control  |
| [ ]  | 8.1  | Session CRUD flow             | convex/sessions.ts, dashboard    | Convex Functions, React                  | Session create/join          |
| [ ]  | 8.2  | Live chat + transcripts       | useSession.js, Convex            | React hooks, Convex real-time             | AI chat, transcript saving   |
| [ ]  | 8.3  | Collaboration UI              | session dashboard                | React, Convex real-time sharing           | Group sessions               |
| [ ]  | 9.1  | Gamification logic            | convex/gamification.ts           | Convex, TypeScript                       | XP, leaderboards, badges     |
| [ ]  | 9.2  | Gamification hooks            | useGamification.js               | React hooks                              | UI logic and notifications   |
| [ ]  | 10.1 | Resource indexing             | convex/resources.ts              | Convex File Storage, OpenRouter          | Uploads & indexing           |
| [ ]  | 10.2 | Resource UI + versioning      | dashboard/resources/             | React, Convex, version control logic     | Resource browsing, versions  |
| [ ]  | 11.1 | Video/Audio calls             | core/webrtc/, call modules       | WebRTC, React                            | Call features, recording     |
| [ ]  | 11.2 | Call analytics & UI           | useWebRTC.js                     | React hooks, analytics tools              | Permissions, quality metrics |
| [ ]  | 12.1 | Analytics schema + logic      | convex/analytics.ts              | Convex, TypeScript                       | Metrics & engagement         |
| [ ]  | 12.2 | Analytics UI                  | dashboard/analytics/             | React, charting libs                     | Reporting dashboard          |
| [ ]  | 13.1 | Privacy & consent UI          | convex/privacy.ts, privacy UI    | Convex, React, encryption patterns       | GDPR, consent management     |
| [ ]  | 13.2 | Data export + logs            | utils/encryption.js              | Node.js, encryption libraries             | Audit, deletion, compliance  |
| [ ]  | 14.1 | Unit testing                  | tests/, jest.config.js           | Jest, React Testing Library              | Core logic coverage          |
| [ ]  | 14.2 | E2E & accessibility testing   | cypress/, RTL tests              | Cypress, React Testing Library           | User flows, WCAG             |
| [ ]  | 15.1 | CI/CD pipelines               | .github/workflows/, scripts/     | GitHub Actions, Node.js scripts           | Build, test, deploy cycles   |
| [ ]  | 15.2 | Monitoring & backups          | scripts/, config files           | Monitoring tools (Sentry, Vercel, etc.) | Alerts, disaster recovery    |
| [ ]  | 16.1 | Launch preparation            | All modules                      | All above components                      | Product readiness & QA       |
| [ ]  | 16.2 | Onboarding UX & flows         | Auth flows, dashboard            | React, Clerk flows                       | Trial signup, onboarding UX  |
| [ ]  | 16.3 | Marketing & support           | Docs, content, demos             | Documentation tools, SEO, help tools     | SEO, demos, support content  |
| [ ]  | 16.4 | Post-launch iteration         | Analytics + feedback system      | Convex, Analytics tools                  | Improve based on data        |



```

---

## How It Helps Jules
- **Clarity**: Every task is broken down to manageable pieces.
- **Purposeful context**: Files and functional purpose listed for faster comprehension.
- **Actionable**: Assign, check off, and update tasks as development progresses.
- **Aligned to SaaS strategy**: Ensures product is not just built—but developed with market-fit, quality, and launch success in mind.

---
