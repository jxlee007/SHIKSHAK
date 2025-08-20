# Prototype Flow Prompts

This document provides **screen-by-screen prompts** for building a
working prototype based on the PRD. Each section includes user flows,
micro-interactions, ASCII wireframes, and contextual tie-ins to
requirements.

------------------------------------------------------------------------

## 1. Sidebar + Main Dashboard

### User Flow

1.  User logs in → lands on main screen with sidebar open.\
2.  Toggle button collapses/expands sidebar (state saved in
    localStorage).\
3.  Top nav: *New Chat* (opens Quick Capture modal) or *Search* (opens
    Search modal).\
4.  Middle nav: access to **Narrative OS**, **Knowledge Base**,
    **Folders**.\
5.  Bottom: Profile dropup (account plan, upgrade, settings, logout).\
6.  Sidebar drives navigation between major app views (Knowledge Base, Rituals, Recent chats).

### Micro-interactions

-   Smooth **300ms slide-in/out** for sidebar.\
-   Hover states for icons (background darkens).\
-   Ellipsis menus for chats (Pin, Rename, Archive, Delete) with fade-in
    transitions.\
-   Profile dropdown with bounce easing + ARIA compliance.
-   Ritual - Dynamic button changes icon state based on the user's timezone 
-   In button when there is sun icon - on-click the morning brief / moon icon - on-click the evening reflection floatiing overlay modal would open from the same button

### Wireframe

    ### Pill Switch Navigation Wireframe

        +-----------------------------------------------------------------------------------------------+
        | ◧ |                [Get plus] [🗺️ Mind Map / ✅ Tasks] [ Ritual ☀️/🌙] [⚙️]                |
        |                                      ^ Pill switch: active pill is filled                     |
        +-----------------------------------------------------------------------------------------------+
        | Sidebar collapsed: icons only (desktop expands) | Main Content (changes when pill is clicked) |
        |-----------------------------------------------------------------------------------------------|

    **Interaction:**  
    - Pills act as switch buttons.  
    - Clicking a pill changes the main content view to Mind Map, Tasks, or Knowledge.  
    - Active pill is visually highlighted (filled or colored).  
    - State persists (e.g., via localStorage).
    - Sidebar remains accessible for navigation.


------------------------------------------------------------------------

## 2. Smart Mind Map Engine (Knowledge Graph)

### User Flow

1.  User captures input (via Quick Capture).\
2.  AI auto-creates nodes on the map.\
3.  User drags nodes, connects, splits, or merges.\
4.  Click node → expand details, convert to task.\
5.  AI suggests new connections; user can accept/override.

### Micro-interactions

-   Zoom/pan with pinch or scroll-wheel.\
-   Node hover glow, click expands card.\
-   Dragging node: elastic animation with connection lines stretching.\
-   AI-suggested connection: dashed animated line until user confirms.

### Wireframe

    +------------------------------------------+
    |              Mind Map View               |
    |   (Zoomable, pannable graph space)       |
    |          /---- [Goal Node] ----\         |
    |         /         |         \            |
    |    [Task]---[Idea]---[Note]---[Project]  |
    +------------------------------------------+

------------------------------------------------------------------------

## 3. Task Management (Swimlanes)

### User Flow

1.  Switch to **Tasks view** via pill toggle.\
2.  Tasks grouped in **High / Medium / Low** swimlanes.\
3.  User drags tasks between lanes (updates priority).\
4.  Context menu (Edit, Convert, Delete).\
5.  Floating **Today's Focus** panel syncs top tasks across views.

### Micro-interactions

-   Dragging task → placeholder slot appears.\
-   Drop triggers **bounce feedback + success toast**.\
-   Hover on task card shows quick actions (✔ Complete, ✏ Edit).\
-   Smooth vertical reordering.

### Wireframe

    +------------------------------------------+
    |           Task Management View           |
    |------------------------------------------|
    | HIGH PRIORITY   | MEDIUM      | LOW      |
    | [Task1][Task2]  | [Task3]     | [Task4]  |
    | [Task5]         | [Task6]     |          |
    +------------------------------------------+

    **Interaction:**  
    - In mobile-view - Priority could be changed through the dropdown menu accessible in individual task 

------------------------------------------------------------------------

## 4. Knowledge Base

### User Flow

1.  User clicks 📚 in sidebar.\
2.  Sees saved articles, videos, PDFs, notes as cards.\
3.  Add via Quick Capture or file upload.\
4.  Each card shows AI-generated summary + "Why did you save this?"
    prompt.\
5.  Click card → opens detail with insights and links.

### Micro-interactions

-   Card hover: lift + shadow animation.\
-   AI summary loads with shimmer skeleton.\
-   "Save reason" prompt slides up when card is opened.

### Wireframe

    +------------------------------------------+
    |          Knowledge Base Library          |
    |------------------------------------------|
    | 📄 Article | 🎥 Video | 📊 PDF | 📝 Note |
    | 📋 Report  | 🔗 Link  | ...               |
    +------------------------------------------+

------------------------------------------------------------------------

## 5. Quick Capture Modal

### User Flow

1.  Triggered by +New Chat or hotkey (Ctrl+N).\
2.  Modal overlay opens.\
3.  User enters text, voice, image, or file.\
4.  Select type (Task, Idea, Note) from dropdown.\
5.  AI categorizes instantly (offline-first; queued if offline).\
6.  Save & Process closes modal, stores in local DB, AI picks up when
    online.

### Micro-interactions

-   Input field auto-expands with typing.\
-   Capture type is selected from a dropdown menu with smooth expand/collapse animation.\
-   Dropdown options highlight on hover and ripple on selection 
-   After selection dropdown collaspe.\
-   Save button pulses green when saved offline.

### Wireframe

    +------------------------------------------+
    | Quick Capture [X]       [💡/✅/📝/✨]  |                
    |------------------------------------------|
    | [ Type your thought... ]                 |
    |    [🎤][📷][📎][🔗]                    |
    | [Cancel]        [Save & Process]         |
    +------------------------------------------+

------------------------------------------------------------------------

## 6. Search Modal

### User Flow

1.  User presses Ctrl+K or clicks search icon.\
2.  Full-screen modal with backdrop blur opens.\
3.  Type search query → live results appear.\
4.  Navigate with ↑↓, select with Enter.\
5.  ESC or click-outside closes modal.

### Micro-interactions

-   Result rows highlight on hover or keyboard nav.\
-   Animated fade-in for search bar and backdrop.\
-   AI relevance ranking reorders results live.

### Wireframe

    +------------------------------------------+
    | 🔍 Search all [X]                        |
    |------------------------------------------|
    | [ Search bar input... ]                  |
    |------------------------------------------|
    | 💬 Chat: Project planning                |
    | ✅ Task: Finish proposal (High)          |
    | 🗺️ Node: AI Research (5 links)           |
    | 📄 Article: Future of AI                 |
    +------------------------------------------+

------------------------------------------------------------------------

## 7. Daily Rituals (Morning & Evening Modals)

### User Flow

1.  **Morning:** App launches → modal suggests focus tasks + knowledge
    snippet.\
2.  User reviews yesterday's progress, sets small win, clicks *Start My
    Day*.\
3.  **Evening:** End of day → modal prompts accomplishments + insights.\
4.  User reflects, AI suggests tomorrow's priorities.

### Micro-interactions

-   Progress bars animate filling.\
-   AI suggestions fade in sequentially.\
-   Reflection text box auto-saves offline.\
-   Buttons animate press-in feedback.

### Wireframes

Morning Briefing

    +------------------------------------------+
    | Yesterday: ████████░░ 80% tasks done     |
    | Focus: 🔴 Finish proposal, 🟡 Review     |
    | Knowledge: "AI Integration Patterns"     |
    | Small Win: One 25-min session            |
    | [Skip Today]   [Start My Day]            |
    +------------------------------------------+

Evening Reflection

    +------------------------------------------+
    | Accomplishments: ✅ Proposal, ✅ Client   |
    | Insights: [ Textbox ]                    |
    | Tomorrow: 🔴 Review feedback             |
    | [Skip]   [Save & Plan]                   |
    +------------------------------------------+