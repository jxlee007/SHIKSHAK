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

Each feature is expressed in clear bullet points, with a "Why it matters" section below it.

### A. Multi-Modal Input Capture
...existing code...

### B. Smart Mind Map Engine (Knowledge Graph Core)
...existing code...

### C. Task Management & Prioritization

- **Drag-and-Drop Task Reorganization**: Users can drag tasks between swimlanes (High, Medium, Low) to visually and instantly update their priority status.
- **Dynamic Priority Update**: When a task is moved to a new swimlane, its priority badge and metadata are automatically updated.
- **Visual Feedback for Drag Operations**: Tasks show a scale and shadow effect while dragging; swimlanes highlight with a dashed border when a task is dragged over them; success notifications appear when a task is moved.
- **Task Panel Synchronization**: The floating Today panel and task views update in real time to reflect changes, with color-coded priority indicators.
- **Mind Map Integration**: Tasks converted from mind map nodes are automatically added to the swimlane system, defaulting to Medium priority, and can be further reorganized by drag-and-drop.
- **Consistent Task Creation**: New tasks created via input or context actions are immediately available for drag-and-drop and priority management.
- **Task Filtering**: Users can filter tasks by status (All, Today, Overdue, Completed) for focused task management.
- **Smart Status Management**: Task status updates are reflected across all views and panels.
- **Turn Ideas into To-Dos**: AI suggests next actions or checklist items from notes
- **Task Reminders**: Based on due dates, habits, or AI predictions
- **Equilibrium Engine**: Detects "gaps" in your plan and nudges you to finish what you start
- **1% Daily Progress System**: Encourages small, consistent wins with visible streaks
- **Context-Aware Daily Focus Panel**: A floating panel displays prioritized tasks for the day, updating in real time as tasks are added, completed, or reprioritized.

**Why it matters**: Progress isn't just about having ideas — it's about executing them. This system closes the gap between thought and action and makes prioritization and organization intuitive and actionable.

### D. Modal-Based Daily Rituals & AI Coaching

- **Morning Briefing & Evening Reflection Modals**: Modal dialogs guide users through daily planning and reflection, summarizing top tasks and prompting for next actions.
- **AI selects top 3–5 things from your mind map/tasks for daily focus**
- **Delivered via System Notifications**: Even if app isn't open.

**Why it matters**: Reflection + planning builds momentum. This keeps users grounded and guided without needing to remember themselves.

### E. Personal Knowledge Base
...existing code...

### F. Offline-First Experience + Smart Syncing
...existing code...

### G. Chats/Folders Sidebar & History Management
...existing code...

### H. Smart Context Matching & Assignment Engine
...existing code...

### I. Complete Lifecycle Flow Management
...existing code...

### J. UI/UX Design – Minimal & Focused

- **Dark Mode Default**: Reduce eye fatigue, increase focus
- **Minimal Distraction Layout**: Just input + mind map + sidebar. No content overload
- **Installable PWA**: No app store. One-tap install on mobile and desktop
- **Works Without Internet**: Powered by Service Workers + IndexedDB
- **Responsive Design**: All features, including drag-and-drop, modals, and panels, are fully usable on mobile devices.
- **Performance Optimization**: Drag-and-drop, rendering, and UI updates are optimized for speed and minimal lag.
- **Onboarding Flow**: New users are guided through key features with tooltips or a brief onboarding sequence.
- **Accessibility**: All interactive elements support ARIA labels, keyboard navigation, and color contrast for inclusive use.
- **Keyboard Shortcuts**: Core actions (input, export, panel toggle) are accessible via keyboard shortcuts for faster workflow.
- **Robust Auto-Save**: App state is automatically saved to local storage at regular intervals, ensuring data is never lost.
- **Local Recovery**: On startup, the app restores previous state from local storage before cloud sync is available.
- **Right-Click Context Menus**: Mind map nodes and tasks support context menus for quick actions (edit, convert, delete).
- **Customizable Swimlanes**: Users can rename swimlanes, change colors, or add new lanes to fit their workflow.
- **Clear Error Feedback**: Users receive immediate feedback for errors (e.g., failed voice capture, offline status) and system notifications for important events.

**Why it matters**: Quiet UX encourages deep thinking and intentional interaction, while robust accessibility, performance, and customization ensure the app fits every user and device.
### A. Multi-Modal Input Capture

- **Quick Text Notes**: Fast entry with markdown or rich-text support
- **Voice Note Input**: Capture thoughts hands-free; AI transcribes and adds to mind map
- **Image Input with OCR**: Snap a photo (book, notes, whiteboard); text is extracted and linked to your mind map
- **Attach Offline Files** (e.g., PDFs, articles) to any mind map node
- **Auto Transcription & Inference** (once online): AI converts voice/image into summaries, tasks, or insights

**Why it matters**: Users can capture anything, anywhere, in any form—even offline. Nothing is lost or delayed.

### B. Smart Mind Map Engine (Knowledge Graph Core)

- **Auto-Mindmap Node Creation** from any input type
- **Context-Aware Node Placement**: AI suggests where in your map each note fits
- **AI-Powered Graph Search**: Natural language querying of your entire captured knowledge
- **Clustering by Topic, Project, or Intent**: Mind map auto-groups similar ideas or content
- **Drag & Reorganize** nodes visually; AI learns from your adjustments

**Why it matters**: A visual, AI-assisted mind map allows intuitive thinking, seeing gaps, and building knowledge with context.

### C. Task Management + Decision Nudging

- **Turn Ideas into To-Dos**: AI suggests next actions or checklist items from notes
- **Task Reminders**: Based on due dates, habits, or AI predictions
- **Equilibrium Engine**: Detects "gaps" in your plan and nudges you to finish what you start
- **1% Daily Progress System**: Encourages small, consistent wins with visible streaks

**Why it matters**: Progress isn't just about having ideas — it's about executing them. This system closes the gap between thought and action.

### D. AI Coaching (Morning & Night Sessions)

**Morning Briefing**:
- What's on your plate today?
- AI selects top 3–5 things from your mind map/tasks

**Evening Reflection**:
- What did you do?
- What's next for tomorrow?

**Delivered via System Notifications**: Even if app isn't open.

**Why it matters**: Reflection + planning builds momentum. This keeps users grounded and guided without needing to remember themselves.

### E. Personal Knowledge Base

- **Save Articles, Videos, PDFs** — even offline
- **AI Summarizes** content into digestible highlights
- **"Why did you save this?" Survey Prompt** adds intent metadata to aid search/retrieval
- **Real-World Application Prompts**: AI suggests how to use the info you saved
- **Growth Tracker**: See how your knowledge base evolves and where you're improving

**Why it matters**: It's not just about consuming — it's about turning knowledge into personal value.

### F. Offline-First Experience + Smart Syncing

**Full Offline Input**:
- Voice
- Images
- Attachments
- Text notes

**Background Sync** (once online):
- Triggers AI processing
- Uploads to cloud

**Encrypted Online Storage**:
- All user data backed up online
- Synced across devices upon login

**Queued AI Tasks**:
- Offline content waits for AI
- Processes automatically after reconnection

**Why it matters**: Capture doesn't stop without internet. Sync is reliable. AI picks up where you left off.

### G. Chats/Folders Sidebar & History Management

**Organized Sidebar**:
- Chat sessions grouped by date/topic
- Folder structure for projects and themes
- Search across all historical conversations

**Session History**:
- Persistent chat logs with AI interactions
- Quick access to previous mind maps and decisions
- Timeline view of knowledge evolution

**CRUD Operations for Generated Items**:
- Create, Read, Update, Delete any AI-generated content
- Edit transcriptions, summaries, and task suggestions
- Version history for important nodes and decisions

**Why it matters**: Users build on previous thoughts and need easy access to their mental journey over time.

### H. Smart Context Matching & Assignment Engine

**AI-Powered Item Assignment**:
- Analyzes new input against existing mind map structure
- Suggests optimal node placement based on semantic similarity
- Auto-merges similar concepts and prevents duplication

**Context-Aware Logic**:
- Learns from user's manual placement corrections
- Adapts to personal organizational patterns
- Recognizes project boundaries and topic clusters

**Dynamic Node Updates**:
- Existing nodes get enriched with new related information
- AI suggests when to split overgrown nodes into sub-topics
- Smart notifications when new input connects distant ideas

**Why it matters**: Reduces cognitive overhead of organizing thoughts while maintaining user control and learning from preferences.

### I. Complete Lifecycle Flow Management

**Notes → Items Pipeline**:
- Text/Image/Voice automatically generates structured items
- AI categorizes as: task, knowledge, idea, or reference
- Each item gets metadata tags and context links

**Items → Mind Map Integration**:
- Visual representation of item relationships
- Auto-clustering by project, urgency, or theme
- Drag-and-drop reorganization with AI learning

**Mind Map → To-Do Conversion**:
- One-click transformation of ideas into actionable tasks
- Priority scoring based on deadlines and dependencies
- Smart scheduling suggestions aligned with user patterns

**To-Do → Habit/Achievement Tracking**:
- Completed tasks contribute to streak counters
- Achievement badges for consistency and milestones
- Progress visualization showing knowledge → action completion rates

**Why it matters**: Creates a seamless flow from chaotic thoughts to organized knowledge to completed achievements, ensuring nothing falls through the cracks.

### J. UI/UX Design – Minimal & Focused

- **Dark Mode Default**: Reduce eye fatigue, increase focus
- **Minimal Distraction Layout**: Just input + mind map + sidebar. No content overload
- **Installable PWA**: No app store. One-tap install on mobile and desktop
- **Works Without Internet**: Powered by Service Workers + IndexedDB

**Why it matters**: Quiet UX encourages deep thinking and intentional interaction.

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