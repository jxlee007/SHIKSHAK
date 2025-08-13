# PRODUCT REQUIREMENTS DOCUMENT

**App Name (TBD)**: Offline-first PWA for personal knowledge, task, and idea capture  
**Purpose**: Help users capture, organize, and act on any input — thoughts, tasks, inspiration, content — through AI-assisted mind mapping, even offline.

## 1. PURPOSE & PRODUCT VISION

**Primary Goal**: Ensure users never miss or forget ideas, tasks, inspirations, or knowledge — whether fleeting or strategic.

**Product Philosophy**:  
*"Write it down, the rest gets done"* – capturing something is half the job; AI helps close the loop to action or insight.

**Unique Edge (Moat)**:
- AI transforms raw inputs into structured outcomes (tasks, summaries, reminders) - when online
- Visual mind maps as the central interface for personal thought organization - even offline
- Seamless online/offline experience
## 2. CORE FEATURES — WITH PURPOSE CONTEXT

Features are organized by functional area to show the complete flow from capture to action. Each section includes clear bullet points and explains why it matters for the user's journey.

### A. Sidebar Navigation & History Management

**SIDEBAR TOGGLE FUNCTIONALITY:**
- **Panel splitter toggle button** positioned in top-left corner or embedded in header
- **Smooth slide animations** with mobile overlay and desktop push content behavior
- **State persistence** using localStorage to remember toggle preference

**TOP NAVIGATION SECTION:**
- **"New chat" button** with plus/pencil icon for quick content creation
    * **Floating modal overlay** with Quick Capture - Multi-modal input capture 
    * **Quick text notes** (markdown/rich-text support)
    * **Voice note input** with AI transcription
    * **Image input** with OCR text extraction
    * **Attach offline files** (PDFs, articles, documents)
    * **Auto transcription/inference** - AI generates summaries, tasks, and insights
    * **Instant capture** works completely offline

**Why it matters**: Users can capture anything, anywhere, in any form—even offline. Nothing is lost or delayed, removing friction from the moment of inspiration.

- **Advanced search functionality:**
    * Icon + "Search chats" label with "Ctrl + K" shortcut on hover
    * **Floating modal overlay** with live filtering of chat history
    * Full-screen backdrop blur with keyboard navigation support
    * ESC key and click-outside to close functionality

**MIDDLE FEATURES SECTION:**
- **"Narrative OS"** option with play button icon for AI-guided experiences
- **"Knowledge/Insights"** (relocated from main nav) with grid/blocks icon
- **"Folders"** option with book icon for organized content management

**CHAT HISTORY SECTION:**
- **"Chats" section header** with dynamic count indicator
- **Scrollable chat conversations list** with truncated names and ellipsis overflow
- **Chat item interactions:**
    * Hover-triggered ellipsis menu with Pin, Rename, Archive, Delete options
    * Visual feedback for pinned items and active selection
    * Click-to-activate functionality

**BOTTOM USER ACCOUNT SECTION:**
- **User profile display** ("Jimmy Falcon" with avatar)
- **Account plan indicator** ("Free" with upgrade option)
- **Dropdown menu** with email display, Upgrade Plan, Settings, Help, Log Out
- **Smooth dropdown animations** with proper ARIA accessibility

**TECHNICAL IMPLEMENTATION:**
- **Mobile-first responsive design** with dark theme (#1f2937 sidebar, #374151 hover states)
- **Complete accessibility** with ARIA labels and keyboard navigation
- **Smooth transitions** (300ms duration) and loading states
- **Local storage integration** for user preferences and confirmation dialogs for destructive actions
- **Heroicons/Lucide icon library** via CDN with consistent 16px base font size

**Why it matters**: The sidebar serves as mission control for all captured knowledge, providing organized access and preventing information silos while maintaining intuitive navigation and professional UX standards.

**Why it matters**: The sidebar serves as mission control for all captured knowledge, providing organized access and preventing information silos.

### B. Smart Mind Map Engine (Knowledge Graph Core)
- **Auto-mindmap node creation** from any input type
- **Context-aware node placement** with AI suggestions
- **AI-powered graph search** across all nodes and connections
- **Clustering by topic, project, or intent** for visual organization
- **Drag & reorganize nodes visually** - AI learns from user adjustments
- **Dynamic node updates** - enrich, split, or connect distant ideas

**Why it matters**: Visual, AI-assisted mind mapping enables intuitive thinking and contextual knowledge building, turning scattered thoughts into connected insights.

### C. Task Management & Prioritization
- **Swimlane-based organization** (High, Medium, Low priority; fully customizable)
- **Drag-and-drop task reordering** with real-time visual feedback and success notifications
- **Dynamic priority & status management** - updates automatically across all views
- **Task panel synchronization** - floating "Today's Focus" panel with color-coded indicators
- **Mind map integration** - tasks auto-added from converted nodes
- **AI-powered suggestions** for next actions and smart reminders
- **Equilibrium Engine** - detects gaps in plans and nudges completion
- **1% Daily Progress System** - encourages small wins with streaks and achievements
- **Task filtering & search** by status (Today, Overdue, Completed)
- **Right-click context menus** for quick actions (edit, convert, delete)
- **Accessibility & performance** - ARIA labels, keyboard navigation, optimized UI

**Why it matters**: Closes the gap between thought and action, making prioritization intuitive and ensuring progress on what matters most.

### D. Modal-Based Daily Rituals & AI Coaching
- **Morning Briefing & Evening Reflection modals** guide daily planning and review
- **AI selects top 3-5 focus items** from mind maps and tasks
- **System notifications** deliver coaching even when app isn't open
- **Reflection prompts** build momentum and maintain direction

**Why it matters**: Structured reflection and planning builds momentum while keeping users grounded and guided without cognitive overhead.

### E. Personal Knowledge Base
- **Save articles, videos, PDFs** for offline access
- **AI content summarization** extracts key insights
- **"Why did you save this?" survey prompts** drive intentional consumption
- **Real-world application prompts** connect knowledge to action
- **Growth tracker** shows knowledge → action conversion rates

**Why it matters**: Transforms passive knowledge consumption into personal value and actionable insights, preventing information hoarding.

### F. Offline-First Experience + Smart Syncing
- **Full offline input** across all modes (voice, images, attachments, text)
- **Background sync** triggers AI processing when connection returns
- **Encrypted cloud storage** with end-to-end security
- **Queued AI tasks** process offline content after reconnection
- **Service Workers + IndexedDB** power complete offline functionality

**Why it matters**: Capture never stops due to connectivity; reliable sync ensures AI picks up where you left off without data loss.

### G. Smart Context Matching & Assignment Engine
- **AI-powered item assignment** using semantic similarity for optimal placement
- **Context-aware logic** learns from user corrections and adapts to patterns
- **Smart suggestions** for node connections and content relationships
- **User control** with easy override of AI recommendations

**Why it matters**: Reduces cognitive overhead of organization while maintaining user control and continuously improving through learning.

### H. Complete Lifecycle Flow Management
- **Notes → Items pipeline** with auto-generation and smart categorization
- **Items → Mind map integration** showing visual relationships and clustering
- **Mind map → To-do conversion** with one-click transformation and priority scoring
- **To-do → Habit/achievement tracking** with streaks, badges, and progress visualization
- **Seamless transitions** between all stages with preserved context

**Why it matters**: Creates an unbroken flow from chaotic thoughts to organized knowledge to completed achievements, ensuring nothing falls through the cracks.

### I. Minimal & Focused UI/UX Design
- **Dark mode default** reduces eye fatigue and increases focus
- **Minimal distraction layout** - just input, mind map, and sidebar
- **Installable PWA** - no app store required, one-tap install
- **Responsive design** optimized for mobile and desktop
- **Performance optimization** for smooth interactions and minimal lag
- **Comprehensive onboarding** with guided first-use experience
- **Full accessibility** with ARIA labels, keyboard navigation, and color contrast
- **Customizable elements** including swimlane colors and organization
- **Clear error feedback** and system notifications for important events

**Why it matters**: Quiet, focused UX encourages deep thinking and intentional interaction while ensuring the app works for every user and device.

## 3. Privacy & Control

- End-to-end encryption (E2EE) for cloud storage
- Export data anytime (JSON, Markdown, OPML)
- Local-only mode available (no cloud sync)
- No third-party tracking. Open data policy

## 4. Success Metrics (KPIs)

| Metric | Meaning |
|--------|---------|
| Capture → Action Rate | % of captured ideas that become to-dos or plans |
| Daily Ritual Retention | % of users who complete both morning + night coaching |
| Node Depth | Avg. depth/complexity of personal mind maps |
| Offline Session Capture | # of inputs made offline and successfully synced later |
| Knowledge Conversion Rate | % of saved articles/videos that get summarized, tagged, or acted on |
| Context Match Accuracy | % of AI-suggested node placements accepted by users |
| CRUD Usage Rate | # of user edits/updates to AI-generated content per session |
| Flow Completion Rate | % of items that complete the full notes→tasks→achievements pipeline |
| Session Return Rate | % of users who return to previous chat/folder sessions |
| Habit Streak Length | Avg. consecutive days of task completion and achievement tracking |

## 5. Launch Phases

| Phase | Focus |
|-------|-------|
| **Alpha (Internal)** | Capture engine, mind map UI, basic sync, sidebar structure |
| **Beta** | AI integrations (voice → text, summarization, task gen), CRUD operations, context matching |
| **Public Launch** | Full offline features, AI coaching, reminders, knowledge base, complete lifecycle flow |
| **V2+** | Team collaboration, advanced habit tracking, custom automations, plugin integrations |

## 6. Versioning

| Version | Date | Changes |
|---------|------|---------|
| 1.0     | 2025-08-07 | Initial PRD draft |
| 1.1     | 2025-08-07 | Added Task Drag-and-Drop, Swimlane Priority, Visual Feedback, Task Panel Sync, Mind Map Task Integration, and related enhancements |
| 1.2     | 2025-08-07 | Added Floating Today Panel, Modal-Based Daily Rituals, Keyboard Shortcuts, Auto-Save/Local Recovery, Context Menus, Task Filtering, Accessibility, Error Feedback, Customization, Mobile Responsiveness, Performance, and Onboarding |