# AssistantPro Design System Guide

## 🎨 **Design Philosophy & Cultural Approach**

AssistantPro's design system is built on India-first principles, emphasizing cultural sensitivity, accessibility, and privacy-first visual communication. The design language celebrates Indian heritage while ensuring modern usability and cross-platform consistency.

---

## 🇮🇳 **Cultural Design Foundation**

### **Core Design Principles**
1. **Cultural Resonance**: Visual elements that connect with Indian users across regions
2. **Accessibility**: Inclusive design for diverse languages, age groups, and technical literacy
3. **Privacy Transparency**: Visual indicators of data security and local processing
4. **Regional Adaptation**: Flexible components that adapt to local contexts
5. **Hierarchical Respect**: Design patterns that reflect Indian social structures

### **Cultural Color Psychology**
```
Primary Colors (Indian National Inspiration):
- Saffron (#FF9933): Leadership, wisdom, spiritual guidance
- White (#FFFFFF): Peace, truth, purity
- Green (#138808): Prosperity, growth, harmony

Secondary Colors (Regional & Emotional):
- Deep Blue (#003366): Trust, stability, professionalism
- Warm Gold (#FFD700): Prosperity, celebration, auspiciousness
- Terracotta (#CC6600): Earthiness, tradition, craftmanship
- Peacock Blue (#005F73): Cultural richness, artistic heritage
```

---

## 🎨 **Color System**

### **Primary Color Palette**
```css
/* Primary Colors - Core Brand */
:root {
  --color-primary-saffron: #FF9933;
  --color-primary-white: #FFFFFF;
  --color-primary-green: #138808;
  
  /* Primary Variations */
  --color-saffron-light: #FFB366;
  --color-saffron-dark: #E68A00;
  --color-green-light: #4CAF50;
  --color-green-dark: #0F5F06;
}

/* Semantic Colors */
:root {
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}

/* Cultural Context Colors */
:root {
  --color-cultural-gold: #FFD700;
  --color-cultural-terracotta: #CC6600;
  --color-cultural-peacock: #005F73;
  --color-cultural-lotus: #DA70D6;
}
```

### **Dark Mode Adaptations**
```css
/* Dark Mode - Culturally Sensitive */
[data-theme="dark"] {
  --color-primary-saffron: #FFB366;
  --color-primary-green: #4CAF50;
  --color-background: #121212;
  --color-surface: #1E1E1E;
  --color-surface-variant: #2A2A2A;
  
  /* Maintain cultural warmth in dark mode */
  --color-cultural-glow: rgba(255, 153, 51, 0.1);
}
```

### **Accessibility Compliant Contrasts**
```css
/* WCAG AA Compliant Color Combinations */
.text-primary { color: #1A1A1A; } /* 13.1:1 contrast on white */
.text-secondary { color: #4A4A4A; } /* 7.1:1 contrast on white */
.text-disabled { color: #9CA3AF; } /* 3.1:1 contrast on white */

/* High Contrast Options for Accessibility */
.high-contrast {
  --color-text: #000000;
  --color-background: #FFFFFF;
  --color-primary: #0066CC;
}
```

---

## 📝 **Typography System**

### **Font Stack & Language Support**
```css
/* Primary Font Stack - Multi-script Support */
:root {
  --font-primary: 'Inter', 'Noto Sans Devanagari', 'Noto Sans Tamil', 
                  'Noto Sans Bengali', system-ui, -apple-system, sans-serif;
  --font-secondary: 'Poppins', 'Noto Sans', sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', monospace;
}

/* Script-Specific Font Assignments */
:lang(hi) { font-family: 'Noto Sans Devanagari', var(--font-primary); }
:lang(ta) { font-family: 'Noto Sans Tamil', var(--font-primary); }
:lang(bn) { font-family: 'Noto Sans Bengali', var(--font-primary); }
:lang(te) { font-family: 'Noto Sans Telugu', var(--font-primary); }
```

### **Typography Scale**
```css
/* Responsive Typography Scale */
:root {
  /* Display Sizes */
  --text-display-large: clamp(2.5rem, 4vw, 4rem);     /* 40-64px */
  --text-display-medium: clamp(2rem, 3.5vw, 3.5rem);  /* 32-56px */
  --text-display-small: clamp(1.75rem, 3vw, 3rem);    /* 28-48px */
  
  /* Headline Sizes */
  --text-headline-large: clamp(1.5rem, 2.5vw, 2.5rem); /* 24-40px */
  --text-headline-medium: clamp(1.25rem, 2vw, 2rem);   /* 20-32px */
  --text-headline-small: clamp(1.125rem, 1.5vw, 1.5rem); /* 18-24px */
  
  /* Body Text */
  --text-body-large: 1.125rem;  /* 18px */
  --text-body-medium: 1rem;     /* 16px */
  --text-body-small: 0.875rem;  /* 14px */
  
  /* Labels & Captions */
  --text-label-large: 0.875rem;  /* 14px */
  --text-label-medium: 0.75rem;  /* 12px */
  --text-label-small: 0.6875rem; /* 11px */
}

/* Line Heights for Readability */
:root {
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

### **Text Styles & Cultural Considerations**
```css
/* Cultural Text Patterns */
.text-greeting {
  font-size: var(--text-headline-medium);
  font-weight: 600;
  color: var(--color-primary-saffron);
  margin-bottom: 0.5rem;
}

.text-blessing {
  font-style: italic;
  color: var(--color-cultural-gold);
  font-size: var(--text-body-small);
  text-align: center;
}

.text-cultural-emphasis {
  border-left: 3px solid var(--color-primary-saffron);
  padding-left: 1rem;
  font-weight: 500;
}

/* Mixed Script Support */
.text-bilingual {
  line-height: var(--line-height-relaxed);
  word-spacing: 0.1em;
}
```

---

## 🧱 **Component Library**

### **Button System**

#### **Primary Buttons**
```css
/* Cultural Primary Button */
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-saffron), var(--color-saffron-dark));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: var(--text-body-medium);
  box-shadow: 0 2px 8px rgba(255, 153, 51, 0.3);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 153, 51, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(255, 153, 51, 0.3);
}

/* Cultural Secondary Button */
.btn-secondary {
  background: white;
  color: var(--color-primary-saffron);
  border: 2px solid var(--color-primary-saffron);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

/* Icon Buttons with Cultural Elements */
.btn-icon-cultural {
  background: var(--color-cultural-gold);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}
```

#### **Button Sizes & Variants**
```css
/* Button Size Variants */
.btn-large {
  padding: 1rem 2rem;
  font-size: var(--text-body-large);
  border-radius: 12px;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: var(--text-body-small);
  border-radius: 6px;
}

/* Cultural Context Buttons */
.btn-festival {
  background: var(--color-cultural-peacock);
  color: white;
  position: relative;
  overflow: hidden;
}

.btn-festival::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

### **Card Components**

#### **Base Card System**
```css
/* Cultural Card Base */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

/* Cultural Feature Cards */
.card-cultural {
  border-top: 4px solid var(--color-primary-saffron);
  position: relative;
}

.card-cultural::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid var(--color-cultural-gold);
  border-bottom: 20px solid transparent;
}

/* Module-Specific Cards */
.card-mudra {
  border-left: 4px solid var(--color-primary-green);
  background: linear-gradient(135deg, white, rgba(19, 136, 8, 0.02));
}

.card-sikshak {
  border-left: 4px solid var(--color-info);
  background: linear-gradient(135deg, white, rgba(59, 130, 246, 0.02));
}

.card-soch {
  border-left: 4px solid var(--color-primary-saffron);
  background: linear-gradient(135deg, white, rgba(255, 153, 51, 0.02));
}
```

#### **Interactive Card States**
```css
/* Loading State */
.card-loading {
  position: relative;
  overflow: hidden;
}

.card-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Cultural Success State */
.card-success {
  border: 2px solid var(--color-success);
  background: rgba(16, 185, 129, 0.05);
  position: relative;
}

.card-success::before {
  content: '✓';
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-success);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
```

### **Input Components**

#### **Cultural Input Design**
```css
/* Base Input with Cultural Elements */
.input-cultural {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: var(--text-body-medium);
  transition: all 0.2s ease;
  background: white;
}

.input-cultural:focus {
  outline: none;
  border-color: var(--color-primary-saffron);
  box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1);
  transform: translateY(-1px);
}

/* Multi-script Input Support */
.input-multilingual {
  font-family: var(--font-primary);
  line-height: var(--line-height-relaxed);
  text-align: start;
}

.input-multilingual:lang(hi) {
  text-align: left;
  direction: ltr;
}

.input-multilingual:lang(ur) {
  text-align: right;
  direction: rtl;
}

/* Voice Input Button Integration */
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-container .voice-btn {
  position: absolute;
  right: 8px;
  background: var(--color-primary-saffron);
  border: none;
  padding: 8px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
}

.input-container .voice-btn.listening {
  background: var(--color-error);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}
```

#### **Validation & Error States**
```css
/* Cultural Error States */
.input-error {
  border-color: var(--color-error);
  background: rgba(239, 68, 68, 0.02);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: var(--color-error);
  font-size: var(--text-label-medium);
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.error-message::before {
  content: '⚠';
  font-size: 14px;
}

/* Success States */
.input-success {
  border-color: var(--color-success);
  background: rgba(16, 185, 129, 0.02);
}

.success-message {
  color: var(--color-success);
  font-size: var(--text-label-medium);
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.success-message::before {
  content: '✓';
  font-size: 14px;
}
```

---

## 🌟 **Cultural UI Patterns**

### **Greeting & Welcome Patterns**
```css
/* Time-based Cultural Greetings */
.greeting-morning {
  background: linear-gradient(135deg, #FFE082, #FFF3E0);
  color: #E65100;
}

.greeting-afternoon {
  background: linear-gradient(135deg, #FFAB40, #FFF8E1);
  color: #F57C00;
}

.greeting-evening {
  background: linear-gradient(135deg, #FF8A65, #FBE9E7);
  color: #D84315;
}

.greeting-night {
  background: linear-gradient(135deg, #5C6BC0, #E8EAF6);
  color: #283593;
}

/* Festival & Cultural Celebrations */
.celebration-banner {
  background: linear-gradient(135deg, var(--color-cultural-gold), var(--color-primary-saffron));
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.celebration-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" font-size="20" fill="rgba(255,255,255,0.1)">🪔</text></svg>');
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}
```

### **Navigation Patterns**
```css
/* Cultural Breadcrumb with Indian Elements */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  font-size: var(--text-body-small);
}

.breadcrumb-item {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.breadcrumb-item.active {
  color: var(--color-primary-saffron);
  font-weight: 600;
}

.breadcrumb-separator::before {
  content: '→';
  color: var(--color-primary-saffron);
  margin: 0 0.5rem;
}

/* Tab Navigation with Cultural Elements */
.tab-navigation {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-item {
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: 500;
}

.tab-item.active {
  background: var(--color-primary-saffron);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(255, 153, 51, 0.3);
}
```

### **Status & Feedback Patterns**
```css
/* Cultural Progress Indicators */
.progress-cultural {
  background: #E5E7EB;
  border-radius: 50px;
  height: 8px;
  overflow: hidden;
  position: relative;
}

.progress-cultural .progress-bar {
  background: linear-gradient(90deg, var(--color-primary-green), var(--color-primary-saffron));
  height: 100%;
  border-radius: 50px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-cultural .progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: progress-shimmer 2s infinite;
}

@keyframes progress-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Achievement Badges */
.achievement-badge {
  background: var(--color-cultural-gold);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: var(--text-label-small);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
}

.achievement-badge::before {
  content: '🏆';
  font-size: 12px;
}
```

---

## 📱 **Screen Layouts & Responsive Design**

### **Mobile-First Grid System**
```css
/* Cultural Grid Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive Grid */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid-sm-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-sm-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 768px) {
  .grid-md-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-md-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-md-4 { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1024px) {
  .grid-lg-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-lg-4 { grid-template-columns: repeat(4, 1fr); }
  .grid-lg-6 { grid-template-columns: repeat(6, 1fr); }
}

/* Cultural Layout Patterns */
.layout-cultural {
  display: grid;
  grid-template-areas: 
    "header"
    "main"
    "footer";
  min-height: 100vh;
}

.layout-cultural-header {
  grid-area: header;
  background: linear-gradient(135deg, var(--color-primary-saffron), var(--color-saffron-dark));
  color: white;
  padding: 1rem;
}

.layout-cultural-main {
  grid-area: main;
  padding: 1rem;
  flex: 1;
}

.layout-cultural-footer {
  grid-area: footer;
  background: var(--color-primary-green);
  color: white;
  padding: 1rem;
  text-align: center;
}
```

### **Component Spacing System**
```css
/* Cultural Spacing Scale */
:root {
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
}

/* Semantic Spacing Classes */
.m-cultural { margin: var(--space-md); }
.p-cultural { padding: var(--space-md); }
.gap-cultural { gap: var(--space-md); }

/* Cultural Section Spacing */
.section-greeting { margin-bottom: var(--space-2xl); }
.section-content { margin-bottom: var(--space-xl); }
.section-footer { margin-top: var(--space-2xl); }
```

---

## 🔧 **Implementation Guidelines**

### **CSS Custom Properties Strategy**
```css
/* Dynamic Theme Switching */
:root {
  --theme-transition: all 0.3s ease;
}

* {
  transition: var(--theme-transition);
}

/* Cultural Theme Variants */
[data-cultural-theme="festival"] {
  --color-primary-saffron: #FFB300;
  --color-primary-green: #2E7D32;
  --color-background: linear-gradient(135deg, #FFF3E0, #FFFFFF);
}

[data-cultural-theme="monsoon"] {
  --color-primary-saffron: #4FC3F7;
  --color-primary-green: #388E3C;
  --color-background: linear-gradient(135deg, #E1F5FE, #FFFFFF);
}

[data-cultural-theme="winter"] {
  --color-primary-saffron: #FF8F00;
  --color-primary-green: #1B5E20;
  --color-background: linear-gradient(135deg, #FFF8E1, #FFFFFF);
}
```

### **Accessibility Implementation**
```css
/* High Contrast Support */
@media (prefers-contrast: high) {
  :root {
    --color-primary-saffron: #CC6600;
    --color-primary-green: #0D5F0D;
    --color-text: #000000;
    --color-background: #FFFFFF;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Management */
.focus-ring {
  outline: 2px solid var(--color-primary-saffron);
  outline-offset: 2px;
  border-radius: 4px;
}

button:focus-visible,
input:focus-visible,
[tabindex]:focus-visible {
  @extend .focus-ring;
}
```

### **Performance Optimization**
```css
/* Critical CSS Patterns */
.above-fold {
  /* Critical styles for initial render */
  font-display: swap;
  contain: layout style paint;
}

/* Lazy Loading Classes */
.lazy-load {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.lazy-load.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* GPU Acceleration for Animations */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}
```

---

## 📚 **Component Documentation**

### **Usage Examples**

#### **Cultural Greeting Component**
```html
<div class="greeting-container">
  <div class="greeting-morning">
    <h2 class="text-greeting">सुप्रभात / Good Morning</h2>
    <p class="text-blessing">आपका दिन मंगलमय हो</p>
  </div>
</div>
```

#### **Multi-Module Card**
```html
<div class="card card-cultural">
  <div class="card-mudra">
    <h3>Today's Expenses</h3>
    <p class="text-cultural-emphasis">₹1,234</p>
  </div>
</div>
```

#### **Voice Input Example**
```html
<div class="input-container">
  <input 
    class="input-cultural input-multilingual" 
    placeholder="Type or speak your message..."
    lang="hi"
  />
  <button class="voice-btn" aria-label="Voice input">
    🎙️
  </button>
</div>
```

---

## 🎯 **Design Tokens Reference**

### **Complete Token System**
```json
{
  "colors": {
    "primary": {
      "saffron": "#FF9933",
      "white": "#FFFFFF", 
      "green": "#138808"
    },
    "cultural": {
      "gold": "#FFD700",
      "terracotta": "#CC6600",
      "peacock": "#005F73",
      "lotus": "#DA70D6"
    },
    "semantic": {
      "success": "#10B981",
      "warning": "#F59E0B", 
      "error": "#EF4444",
      "info": "#3B82F6"
    }
  },
  "typography": {
    "families": {
      "primary": "Inter, Noto Sans Devanagari, system-ui",
      "secondary": "Poppins, Noto Sans, sans-serif",
      "mono": "JetBrains Mono, Cascadia Code, monospace"
    },
    "sizes": {
      "display": {
        "large": "clamp(2.5rem, 4vw, 4rem)",
        "medium": "clamp(2rem, 3.5vw, 3.5rem)",
        "small": "clamp(1.75rem, 3vw, 3rem)"
      },
      "body": {
        "large": "1.125rem",
        "medium": "1rem", 
        "small": "0.875rem"
      }
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px", 
    "lg": "12px",
    "xl": "16px",
    "full": "50%"
  },
  "shadows": {
    "sm": "0 2px 4px rgba(0, 0, 0, 0.1)",
    "md": "0 4px 8px rgba(0, 0, 0, 0.12)",
    "lg": "0 8px 16px rgba(0, 0, 0, 0.15)",
    "cultural": "0 4px 12px rgba(255, 153, 51, 0.3)"
  }
}
```

---

This comprehensive design system provides the foundation for creating culturally resonant, accessible, and performant user interfaces for AssistantPro. All components are designed with India-first principles while maintaining international usability standards.
