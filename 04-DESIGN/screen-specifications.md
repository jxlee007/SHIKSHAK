# AssistantPro Screen Specifications
## Comprehensive UI/UX Technical Specifications

**Document Version**: 1.0  
**Last Updated**: June 4, 2025  
**Based on**: UI research analysis and design system documentation  
**Scope**: Technical specifications for all screen implementations

---

## 🎯 **Overview**

This document provides detailed technical specifications for implementing all AssistantPro screens, derived from comprehensive UI research and the established design system. All specifications follow India-first design principles with cultural sensitivity and privacy-first architecture.

---

## 📱 **Screen Categories & Architecture**

### **1. Onboarding Flow (3 screens)**
- Welcome/Splash Screen
- Permission Setup Screen  
- Cultural Preferences Screen

### **2. Main Application (4 tabs + modals)**
- Soch AI Conversation Hub
- Mudra Financial Dashboard
- Sikshak Educational Platform
- Settings & Profile

### **3. Feature-Specific Screens**
- Voice Command Interface
- Receipt Scanning Camera
- Transaction Details
- Learning Content Viewer
- Quiz Interface

---

## 🏗️ **Technical Implementation Standards**

### **Base Specifications**
```css
/* Viewport Standards */
Primary Target: 375x812px (iPhone X equivalent)
Minimum Support: 320x568px (iPhone SE)
Maximum Tested: 428x926px (iPhone 14 Pro Max)
Tablet Support: 768x1024px+ (horizontal layouts)

/* Performance Requirements */
Initial Load: <2s on 3G networks
Interaction Response: <100ms
Animation Frame Rate: 60fps
Memory Usage: <150MB on 2GB devices
```

### **Cultural Design Tokens**
```css
/* Color System */
--primary-saffron: #FF9933;
--primary-green: #138808;
--primary-white: #FFFFFF;
--cultural-gold: #FFD700;
--text-primary: #1B365D;
--text-secondary: #6C757D;
--background-warm: #FEFEFE;

/* Typography Scale */
--text-hero: 32px/38px;
--text-heading: 24px/28px;
--text-subheading: 20px/24px;
--text-body: 16px/20px;
--text-small: 14px/18px;
--text-caption: 12px/16px;

/* Spacing System */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

---

## 🚀 **Onboarding Screen Specifications**

### **Screen 1: Welcome/Splash**
**Layout**: Full-screen centered content
**Components**:
```css
.welcome-container {
  height: 100vh;
  background: linear-gradient(135deg, #FF9933 0%, #FFFFFF 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.app-logo {
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
  /* Lotus + geometric Indian patterns */
}

.tagline {
  font-size: 20px;
  text-align: center;
  margin-bottom: 32px;
  color: #1B365D;
  font-weight: 600;
}

.cultural-greeting {
  font-size: 24px;
  margin-bottom: 48px;
  text-align: center;
  color: #FF9933;
}

.cta-button {
  width: 280px;
  height: 56px;
  background: #138808;
  color: white;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 12px rgba(19, 136, 8, 0.3);
}
```

**Interactions**:
- Tap CTA button → Navigate to Permission Setup
- Skip option → Direct to main app
- Gentle pulse animation on logo (2s cycle)
- Floating particle effects (cultural symbols)

### **Screen 2: Permission Setup**
**Layout**: Scrollable card-based layout
**Components**:
```css
.permission-container {
  padding: 24px;
  background: #FEFEFE;
}

.permission-header {
  text-align: center;
  margin-bottom: 32px;
}

.permission-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
}

.permission-icon {
  width: 48px;
  height: 48px;
  background: #FF9933;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.permission-content {
  flex: 1;
}

.permission-toggle {
  width: 48px;
  height: 28px;
  background: #138808;
  border-radius: 14px;
  position: relative;
}
```

**Required Permissions**:
1. SMS Access - "Auto-detect transactions"
2. Camera Access - "Scan receipts"
3. Microphone - "Voice commands"
4. Storage - "Local data storage"

### **Screen 3: Cultural Setup**
**Layout**: Multi-section form with progress indicator
**Components**:
```css
.cultural-setup {
  padding: 24px;
  background: linear-gradient(135deg, #FEFEFE 0%, rgba(255, 153, 51, 0.02) 100%);
}

.progress-indicator {
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  margin-bottom: 32px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #138808, #FF9933);
  border-radius: 2px;
  width: 100%; /* Step 3/3 */
}

.language-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;
}

.language-button {
  height: 64px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  background: white;
  font-size: 16px;
  font-weight: 600;
}

.language-button.active {
  border-color: #FF9933;
  background: rgba(255, 153, 51, 0.1);
  color: #FF9933;
}
```

---

## 📊 **Main Navigation Specifications**

### **Bottom Tab Bar**
**Layout**: Fixed bottom navigation with safe area handling
**Components**:
```css
.bottom-navigation {
  height: 80px;
  background: white;
  border-top: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tab-icon {
  width: 24px;
  height: 24px;
  color: #6C757D;
}

.tab-item.active .tab-icon {
  color: #138808;
  filter: drop-shadow(0 0 4px rgba(19, 136, 8, 0.3));
}

.tab-label {
  font-size: 11px;
  color: #6C757D;
  font-weight: 500;
}

.tab-item.active .tab-label {
  color: #138808;
  font-weight: 600;
}
```

**Tab Structure**:
1. **Soch** - Chat bubble + AI spark icon
2. **Mudra** - Stylized ₹ symbol  
3. **Sikshak** - Book + brain icon
4. **Profile** - User + cultural elements

---

## 💬 **Soch AI Hub Specifications**

### **Main Conversation Interface**
**Layout**: Chat-based interface with AI avatar
**Components**:
```css
.chat-container {
  flex: 1;
  background: #FEFEFE;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.ai-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9933, #FFD700);
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.greeting-header {
  text-align: center;
  margin-bottom: 24px;
  font-size: 18px;
  color: #1B365D;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.message-ai {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 16px 16px 16px 4px;
  padding: 12px 16px;
  margin-bottom: 16px;
  max-width: 80%;
  align-self: flex-start;
}

.message-user {
  background: #138808;
  color: white;
  border-radius: 16px 16px 4px 16px;
  padding: 12px 16px;
  margin-bottom: 16px;
  max-width: 80%;
  align-self: flex-end;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #E5E7EB;
  background: white;
}

.voice-button {
  width: 48px;
  height: 48px;
  background: #FF9933;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(255, 153, 51, 0.3);
}
```

**Context Cards**:
```css
.context-card {
  background: rgba(255, 153, 51, 0.05);
  border: 1px solid rgba(255, 153, 51, 0.2);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.context-icon {
  width: 32px;
  height: 32px;
  color: #FF9933;
}

.context-content {
  flex: 1;
}

.context-title {
  font-size: 14px;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 2px;
}

.context-subtitle {
  font-size: 12px;
  color: #6C757D;
}
```

---

## 💰 **Mudra Finance Specifications**

### **Dashboard Layout**
**Layout**: Card-based dashboard with summary widgets
**Components**:
```css
.finance-dashboard {
  background: #FEFEFE;
  padding: 16px;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #138808;
}

.amount-display {
  font-size: 32px;
  font-weight: 700;
  color: #1B365D;
  margin-bottom: 8px;
  /* Indian number formatting: ₹1,23,456 */
}

.period-selector {
  background: #F8F9FA;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  margin-bottom: 20px;
}

.period-button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #6C757D;
}

.period-button.active {
  background: white;
  color: #1B365D;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--category-color);
}

.category-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  color: var(--category-color);
}

.category-amount {
  font-size: 16px;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 4px;
}

.category-name {
  font-size: 12px;
  color: #6C757D;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### **Transaction List**
**Layout**: Grouped list with date headers and swipe actions
**Components**:
```css
.transaction-list {
  background: #FEFEFE;
}

.date-header {
  background: #F8F9FA;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #1B365D;
  border-bottom: 1px solid #E5E7EB;
}

.transaction-item {
  background: white;
  padding: 16px;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: center;
  gap: 12px;
  /* Swipe gesture support */
  position: relative;
  overflow: hidden;
}

.transaction-category {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--category-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

.transaction-details {
  flex: 1;
}

.transaction-merchant {
  font-size: 16px;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 2px;
}

.transaction-time {
  font-size: 12px;
  color: #6C757D;
}

.transaction-amount {
  font-size: 16px;
  font-weight: 600;
  text-align: right;
}

.transaction-amount.expense {
  color: #DC3545;
}

.transaction-amount.income {
  color: #138808;
}

.sms-indicator {
  width: 16px;
  height: 16px;
  background: #138808;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
}
```

---

## 📚 **Sikshak Education Specifications**

### **Learning Dashboard**
**Layout**: Subject cards with progress indicators
**Components**:
```css
.learning-dashboard {
  background: #FEFEFE;
  padding: 16px;
}

.streak-banner {
  background: linear-gradient(135deg, #FF9933, #FFD700);
  color: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin-bottom: 24px;
}

.streak-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
}

.streak-text {
  font-size: 16px;
  opacity: 0.9;
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.subject-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid var(--subject-color);
}

.subject-icon {
  width: 48px;
  height: 48px;
  background: var(--subject-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-bottom: 12px;
}

.subject-name {
  font-size: 16px;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 8px;
}

.progress-bar {
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--subject-color);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #6C757D;
}
```

### **Reading Interface**
**Layout**: Full-screen reading with controls
**Components**:
```css
.reading-container {
  background: #FEFEFE;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.reading-header {
  background: white;
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 16px;
}

.reading-progress {
  height: 2px;
  background: #E5E7EB;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.reading-progress-fill {
  height: 100%;
  background: #138808;
  transition: width 0.1s ease;
}

.reading-content {
  flex: 1;
  padding: 24px 20px;
  font-size: 18px;
  line-height: 1.6;
  color: #1B365D;
  overflow-y: auto;
}

.reading-controls {
  background: white;
  padding: 16px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-size-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text-size-button {
  width: 36px;
  height: 36px;
  border: 1px solid #E5E7EB;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.audio-button {
  width: 48px;
  height: 48px;
  background: #FF9933;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 18px;
}
```

---

## 🎙️ **Voice Interface Specifications**

### **Voice Command Screen**
**Layout**: Full-screen modal with visual feedback
**Components**:
```css
.voice-interface {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.voice-modal {
  background: white;
  border-radius: 24px;
  padding: 48px 32px;
  width: 90%;
  max-width: 320px;
  text-align: center;
}

.microphone-icon {
  width: 120px;
  height: 120px;
  background: #FF9933;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
  font-size: 48px;
  position: relative;
}

.microphone-icon.listening {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 153, 51, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 153, 51, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 153, 51, 0);
  }
}

.voice-status {
  font-size: 18px;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 16px;
}

.voice-transcript {
  background: #F8F9FA;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  min-height: 60px;
  font-size: 16px;
  color: #1B365D;
  text-align: left;
}

.voice-examples {
  font-size: 14px;
  color: #6C757D;
  margin-bottom: 24px;
}

.voice-controls {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.voice-control-button {
  width: 56px;
  height: 56px;
  border: 2px solid #E5E7EB;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.voice-control-button.primary {
  background: #138808;
  border-color: #138808;
  color: white;
}
```

---

## 📸 **Camera Interface Specifications**

### **Receipt Scanning Screen**
**Layout**: Full-screen camera with overlay guides
**Components**:
```css
.camera-interface {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: black;
}

.camera-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 24px;
}

.camera-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.camera-control {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.receipt-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 360px;
  border: 2px dashed #FF9933;
  border-radius: 8px;
  background: rgba(255, 153, 51, 0.1);
}

.receipt-frame.detected {
  border-color: #138808;
  background: rgba(19, 136, 8, 0.1);
  animation: detected-pulse 0.5s ease;
}

@keyframes detected-pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

.instruction-text {
  color: white;
  font-size: 16px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 12px 20px;
  border-radius: 20px;
  margin: 20px auto;
  max-width: 280px;
}

.camera-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.capture-button {
  width: 80px;
  height: 80px;
  background: white;
  border: 4px solid #FF9933;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #FF9933;
  position: relative;
}

.capture-button::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: #FF9933;
  border-radius: 50%;
  opacity: 0;
  animation: capture-ready 2s infinite;
}

@keyframes capture-ready {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.3; }
}
```

---

## ⚙️ **Settings Specifications**

### **Main Settings Screen**
**Layout**: Grouped list with section headers
**Components**:
```css
.settings-container {
  background: #F8F9FA;
  min-height: 100vh;
}

.settings-header {
  background: white;
  padding: 20px 16px;
  border-bottom: 1px solid #E5E7EB;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FF9933, #FFD700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.profile-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1B365D;
  margin-bottom: 4px;
}

.profile-info p {
  font-size: 14px;
  color: #6C757D;
}

.settings-section {
  background: white;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  background: #F8F9FA;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #6C757D;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.settings-item {
  padding: 16px;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 153, 51, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FF9933;
  font-size: 16px;
}

.settings-content {
  flex: 1;
}

.settings-title {
  font-size: 16px;
  font-weight: 500;
  color: #1B365D;
  margin-bottom: 2px;
}

.settings-subtitle {
  font-size: 12px;
  color: #6C757D;
}

.settings-chevron {
  color: #C4C4C4;
  font-size: 16px;
}

.privacy-badge {
  background: rgba(19, 136, 8, 0.1);
  color: #138808;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## 🔧 **Interactive States & Animations**

### **Loading States**
```css
.skeleton {
  background: linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #E5E7EB;
  border-top: 3px solid #FF9933;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### **Gesture Interactions**
```css
.swipe-action {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background: #DC3545;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.swipe-action.revealed {
  transform: translateX(0);
}

.pull-to-refresh {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-60px);
  transition: transform 0.3s ease;
}

.pull-to-refresh.active {
  transform: translateY(0);
}
```

### **Accessibility Features**
```css
.focus-ring {
  outline: 2px solid #FF9933;
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  :root {
    --primary-saffron: #CC6600;
    --primary-green: #0D5F0D;
    --text-primary: #000000;
    --background-warm: #FFFFFF;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 📱 **Responsive Breakpoints**

```css
/* Mobile First */
.container {
  padding: 16px;
  max-width: 100%;
}

/* Small phones */
@media (max-width: 360px) {
  .container { padding: 12px; }
  .text-body { font-size: 14px; }
  .grid-2 { grid-template-columns: 1fr; }
}

/* Large phones */
@media (min-width: 414px) {
  .container { padding: 20px; }
  .grid-auto { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
}

/* Tablets */
@media (min-width: 768px) {
  .container { 
    padding: 24px; 
    max-width: 768px;
    margin: 0 auto;
  }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .sidebar { display: block; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 🎯 **Performance Optimization**

### **Critical Rendering Path**
```css
/* Above-the-fold critical CSS */
.critical {
  font-display: swap;
  contain: layout style paint;
}

/* Lazy loading implementation */
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.loaded {
  opacity: 1;
}

/* GPU acceleration for animations */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* Efficient shadows */
.optimized-shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  /* Avoid multiple shadow layers */
}
```

### **Memory Optimization**
```javascript
// Virtual scrolling for long lists
const VirtualizedList = {
  itemHeight: 64,
  bufferSize: 3,
  maxRenderedItems: 20
};

// Image optimization
const imageConfig = {
  formats: ['webp', 'jpg'],
  sizes: [320, 640, 1280],
  quality: 85,
  lazyLoading: true
};
```

---

This comprehensive specification document provides all the technical details needed to implement AssistantPro's user interface while maintaining cultural authenticity, privacy principles, and optimal performance for Indian users.
