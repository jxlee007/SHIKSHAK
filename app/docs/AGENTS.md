# AGENTS.md - SHIKSHAK AI Education Platform

## Project Overview

SHIKSHAK is an AI-powered educational platform built with Next.js 15, featuring shared core architecture with native shells. The platform enables real-time learning sessions with AI tutoring, gamification, and comprehensive user management.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Backend**: Convex (real-time database and serverless functions)
- **Authentication**: Clerk (with billing features enabled)
- **AI Provider**: OpenRouter (unified access to multiple LLMs)
- **AI Framework**: LangChain (for AI workflow orchestration)
- **UI Components**: Shadcn/UI v4 (with MCP server integration)
- **Styling**: Tailwind CSS
- **Development Tools**: Context7 MCP server for documentation

## Architecture Pattern

```
SHIKSHAK/
â”œâ”€â”€ core/                    # Platform-agnostic shared logic
â”œâ”€â”€ shells/                  # Platform-specific implementations
â”œâ”€â”€ docs/                    # Documentation and architecture
â”œâ”€â”€ scripts/                 # Build and deployment automation
â””â”€â”€ configs/                 # Shared configurations
```

## Agent Tasks

### Task 1: Project Setup & Configuration
**File**: `package.json`, `next.config.js`, `tailwind.config.js`
**Context**: Initialize Next.js 15 project with required dependencies
**Instructions**:
- Set up Next.js 15 with App Router
- Install Convex, Clerk, OpenRouter, LangChain dependencies
- Configure Tailwind CSS with Shadcn/UI
- Set up TypeScript strict mode
- Configure MCP server integration for Context7 and Shadcn

### Task 2: Core Configuration Files
**Files**: `convex/schema.ts`, `convex/auth.config.ts`, `.env.local`
**Context**: Database schema and authentication setup
**Instructions**:
- Define Convex schema for User, Session, Resource, Transcript models
- Configure Clerk authentication with Convex integration
- Set up OpenRouter API configuration
- Configure billing webhooks and subscription management
- Implement privacy-first data encryption patterns

### Task 3: Shared Core - AI Module
**Files**: `core/ai/agentManager.js`, `core/ai/ragService.js`, `core/ai/ttsService.js`
**Context**: Central AI orchestration with OpenRouter and LangChain
**Instructions**:
- Create LangChain-based agent manager for session orchestration
- Implement RAG service using vector stores (Pinecone/Faiss)
- Set up OpenRouter integration for multi-LLM support
- Create TTS service abstraction (Bulbul/Saarika)
- Implement agent context switching for general/prebuilt sessions
- Add error handling and failover mechanisms

### Task 4: Shared Core - Data Layer
**Files**: `core/data/models/`, `core/data/adapters/`, `core/data/schema/`
**Context**: TypeScript models and Convex integration
**Instructions**:
- Define User, Session, Transcript, Resource TypeScript interfaces
- Create Convex adapter for database operations
- Implement blockchain adapter for privacy/encryption
- Set up data validation schemas (Zod)
- Create migration utilities for schema updates

### Task 5: Shared Core - UI Components
**Files**: `core/ui/atoms/`, `core/ui/molecules/`, `core/ui/organisms/`
**Context**: Atomic design system with Shadcn/UI integration
**Instructions**:
- Create atomic UI components (Button, Input, Avatar)
- Build molecular components (Card, Modal, MenuBar)
- Develop organism components (SessionBrowser, ChatPanel, TranscriptViewer)
- Implement theming system (dark/light mode)
- Ensure accessibility compliance (WCAG 2.1)
- Use MCP server to access latest Shadcn/UI components

### Task 6: Web Shell Implementation
**Files**: `shells/web/App.jsx`, `shells/web/pages/`, `shells/web/components/`
**Context**: Next.js web application shell
**Instructions**:
- Set up Next.js App Router structure
- Implement Clerk authentication flow
- Create responsive layouts with Tailwind CSS
- Build session management UI
- Integrate WebRTC for real-time communication
- Implement PWA capabilities for offline support

### Task 7: Authentication & Billing
**Files**: `app/(auth)/`, `convex/billing.ts`, `app/api/webhooks/`
**Context**: Clerk integration with billing features
**Instructions**:
- Set up Clerk sign-in/sign-up flows
- Implement subscription management with Clerk billing
- Create webhook handlers for payment processing
- Build user profile and settings pages
- Implement role-based access control
- Add subscription tier validation

### Task 8: AI Session Management
**Files**: `convex/sessions.ts`, `app/(dashboard)/session/`, `core/hooks/useSession.js`
**Context**: Real-time AI-powered learning sessions
**Instructions**:
- Create Convex functions for session CRUD operations
- Build session creation and joining UI
- Implement real-time chat with AI integration
- Add transcript generation and storage
- Create session analytics and progress tracking
- Build session sharing and collaboration features

### Task 9: Gamification System
**Files**: `convex/gamification.ts`, `core/hooks/useGamification.js`, `app/(dashboard)/profile/`
**Context**: XP, levels, badges, and leaderboards
**Instructions**:
- Design XP and leveling system in Convex
- Create badge achievement logic
- Build leaderboard functionality
- Implement notification system for achievements
- Create user portfolio and progress visualization
- Add social features for competition and collaboration

### Task 10: Resource Management
**Files**: `convex/resources.ts`, `app/(dashboard)/resources/`, `core/api/uploadService.js`
**Context**: File upload and AI context integration
**Instructions**:
- Implement secure file upload with Convex File Storage
- Create resource indexing for AI retrieval
- Build resource browser and search functionality
- Add resource sharing and permissions
- Implement resource version control
- Create resource analytics and usage tracking

### Task 11: Real-time Communication
**Files**: `core/webrtc/`, `app/(dashboard)/session/[id]/call/`, `core/hooks/useWebRTC.js`
**Context**: Video, audio, and screen sharing capabilities
**Instructions**:
- Set up WebRTC connection management
- Implement video call UI components
- Add screen sharing functionality
- Create call recording and transcript integration
- Build call lobby and permissions system
- Add call analytics and quality monitoring

### Task 12: Analytics & Insights
**Files**: `convex/analytics.ts`, `app/(dashboard)/analytics/`, `core/hooks/useAnalytics.js`
**Context**: User engagement and learning progress tracking
**Instructions**:
- Design analytics schema in Convex
- Build real-time dashboard components
- Create learning progress visualization
- Implement session effectiveness metrics
- Add user engagement tracking
- Create export functionality for reports

### Task 13: Privacy & Security
**Files**: `convex/privacy.ts`, `core/utils/encryption.js`, `app/(settings)/privacy/`
**Context**: GDPR compliance and data protection
**Instructions**:
- Implement consent management system
- Create data encryption utilities
- Build privacy settings dashboard
- Add data export and deletion features
- Implement audit logging
- Create privacy policy and terms integration

### Task 14: Testing & Quality Assurance
**Files**: `__tests__/`, `cypress/`, `jest.config.js`
**Context**: Comprehensive testing strategy
**Instructions**:
- Set up Jest for unit testing
- Create Cypress e2e tests
- Build component testing with React Testing Library
- Implement API testing for Convex functions
- Add accessibility testing
- Create performance testing suite

### Task 15: Deployment & DevOps
**Files**: `scripts/build.js`, `scripts/deploy.js`, `.github/workflows/`
**Context**: Automated deployment and CI/CD
**Instructions**:
- Create Vercel deployment configuration
- Set up Convex deployment pipeline
- Build automated testing workflow
- Implement monitoring and alerting
- Create backup and disaster recovery scripts
- Set up performance monitoring

## Context Integration

### Context7 MCP Server
- Provides real-time documentation access for Next.js, Convex, Clerk
- Enables AI agents to access latest API references and best practices
- Automatically updates with framework changes and new features

### Shadcn/UI MCP Server
- Direct access to latest component implementations
- Provides TypeScript props and usage patterns
- Enables AI to build consistent UI components without hallucinations

## Development Guidelines

### Code Style
- Use TypeScript strict mode for all files
- Follow Next.js App Router conventions
- Implement atomic design principles for UI
- Use Convex functions for all database operations
- Follow privacy-by-design principles

### AI Integration Patterns
- Use LangChain for complex AI workflows
- Implement proper error handling and fallbacks
- Cache AI responses for performance
- Use streaming for real-time AI interactions
- Implement rate limiting and cost controls

### Testing Requirements
- Unit tests for all core business logic
- Integration tests for Convex functions
- E2E tests for critical user journeys
- Accessibility testing for all UI components
- Performance testing for real-time features

### Security Considerations
- Implement proper authentication flows with Clerk
- Use Convex's built-in security rules
- Encrypt sensitive data at rest and in transit
- Implement proper session management
- Add CSP headers and security middleware

## Build Commands

```bash
# Development
npm run dev              # Start Next.js development server
npm run convex:dev       # Start Convex development environment

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run e2e tests
npm run test:coverage    # Generate coverage reports

# Production
npm run build            # Build for production
npm run start            # Start production server
npm run deploy           # Deploy to Vercel with Convex
```

## Environment Variables

```bash
# Next.js
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

# AI Services
OPENROUTER_API_KEY=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=

# Optional Services
SENTRY_DSN=
VERCEL_ANALYTICS_ID=
```

## Key Features Implementation Priority

1. **Core Authentication & Session Management** (Tasks 1-4)
2. **Basic AI Integration & UI Components** (Tasks 5-6) 
3. **Real-time Communication & Sessions** (Tasks 7-8)
4. **Gamification & User Engagement** (Tasks 9-10)
5. **Advanced Features & Analytics** (Tasks 11-12)
6. **Security & Compliance** (Tasks 13)
7. **Testing & Deployment** (Tasks 14-15)

## AI Agent Instructions

When implementing features:
1. Always use the Context7 MCP server to get latest documentation
2. Leverage Shadcn/UI MCP server for consistent component implementation
3. Follow the shared core + native shell architecture pattern
4. Implement privacy-first design patterns
5. Use Convex for all real-time data operations
6. Integrate OpenRouter through LangChain for AI features
7. Ensure accessibility and responsive design
8. Write comprehensive tests for all features
9. Follow TypeScript best practices and type safety
10. Document all major architectural decisions

This specification provides a complete roadmap for building SHIKSHAK with modern AI-powered development tools and best practices.