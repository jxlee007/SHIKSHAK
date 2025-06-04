# AssistantPro Development Setup Guide

**Target Platform**: React Native (iOS/Android)  
**Primary Market**: India  
**Architecture**: Offline-first with SaaS scalability  

---

## 🚀 **Quick Start Development Environment**

### **Prerequisites**
- **Node.js**: v18.0+ with npm/yarn
- **React Native CLI**: Latest stable version
- **Android Studio**: For Android development and emulation
- **Xcode**: For iOS development (macOS only)
- **Git**: Version control and repository management

### **Project Initialization**
```bash
# Clone the AssistantPro repository
git clone https://github.com/your-org/assistantpro-mvp
cd assistantpro-mvp

# Install dependencies
npm install
# or
yarn install

# Setup environment configuration
cp .env.example .env
```

### **Environment Configuration**
```bash
# .env configuration
SARVAM_API_KEY=your_sarvam_api_key_here
ENVIRONMENT=development
ENCRYPTION_KEY=generate_secure_32_char_key
LOG_LEVEL=debug

# India-specific configurations
DEFAULT_CURRENCY=INR
DEFAULT_LANGUAGE=hi-IN
REGIONAL_SETTINGS=india
GST_TAX_RATE=0.18
```

---

## 🏗️ **Project Architecture Overview**

### **Folder Structure**
```
src/
├── modules/
│   ├── soch/              # Core AI conversational engine
│   │   ├── sarvam-api/    # Sarvam AI integration
│   │   ├── voice/         # ASR/TTS components
│   │   └── cultural/      # Indian cultural context
│   ├── mudra/             # Financial intelligence module
│   │   ├── sms-parser/    # SMS transaction detection
│   │   ├── categorization/# AI-powered categorization
│   │   └── analytics/     # Financial insights
│   └── sikshak/           # Educational module (Phase 2)
│       ├── content/       # Educational content management
│       ├── quizzes/       # Interactive learning tools
│       └── progress/      # Learning analytics
├── shared/
│   ├── components/        # Reusable UI components
│   ├── utils/            # Common utilities
│   ├── database/         # Local SQLite management
│   ├── encryption/       # Privacy-first data protection
│   └── cultural/         # Indian localization
├── screens/              # React Native screens
├── navigation/           # App navigation structure
└── services/            # Background services and APIs
```

### **Core Technology Stack**
```javascript
// package.json key dependencies
{
  "dependencies": {
    "react-native": "^0.73.0",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "react-native-sqlite-storage": "^6.0.1",
    "react-native-voice": "^3.2.4",
    "react-native-tts": "^4.1.0",
    "react-native-sms-android": "^1.13.0",
    "react-native-camera": "^4.2.1",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-vector-icons": "^10.0.3",
    "@react-navigation/native": "^6.1.9",
    "react-native-crypto-js": "^1.0.0",
    "axios": "^1.6.0"
  }
}
```

---

## 🛠️ **Module Development Workflow**

### **Phase 1: Core AI + Finance (Months 1-6)**

#### **Step 1: Soch AI Foundation Setup**
```bash
# Initialize Sarvam AI integration
cd src/modules/soch/sarvam-api
npm run setup-sarvam-config

# Test API connectivity
npm run test-sarvam-connection

# Setup voice processing
cd ../voice
npm run configure-voice-permissions
```

#### **Step 2: Mudra Financial Module**
```bash
# Setup SMS permissions and monitoring
cd src/modules/mudra/sms-parser
npm run setup-sms-permissions

# Initialize local financial database
cd ../categorization
npm run init-financial-db

# Test transaction categorization
npm run test-transaction-parsing
```

#### **Step 3: Core App Integration**
```bash
# Run comprehensive tests
npm run test:integration

# Start development server
npm run start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios
```

### **Phase 2: Educational Module (Months 7-12)**

#### **Sikshak Educational Integration**
```bash
# Setup educational content database
cd src/modules/sikshak/content
npm run init-education-db

# Configure multi-language support
cd ../progress
npm run setup-learning-analytics

# Integration testing with existing modules
npm run test:sikshak-integration
```

---

## 📱 **Platform-Specific Development**

### **Android Development**
```bash
# Android-specific setup
cd android/
./gradlew clean

# Indian market optimizations
# Configure for entry-level devices (2GB RAM minimum)
# Setup Hindi/Devanagari font support
# Configure UPI deep linking

# Debug on physical device
adb devices
npm run android -- --device

# Generate release build
npm run build:android:release
```

### **iOS Development**
```bash
# iOS-specific setup
cd ios/
pod install

# Indian market adaptations
# Configure Indian number formatting
# Setup regional keyboard support
# Configure voice recognition for Hindi

# Debug on simulator
npm run ios -- --simulator="iPhone 14"

# Generate release build
npm run build:ios:release
```

---

## 🔐 **Security & Privacy Implementation**

### **Local Encryption Setup**
```javascript
// src/shared/encryption/financial-encryption.js
import CryptoJS from 'react-native-crypto-js';

export class FinancialDataEncryption {
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY;
  }

  encryptTransaction(transactionData) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(transactionData), 
      this.encryptionKey
    ).toString();
  }

  decryptTransaction(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
```

### **SMS Permission Management**
```javascript
// src/modules/mudra/sms-parser/permissions.js
import { PermissionsAndroid } from 'react-native';

export const requestSMSPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS Access Permission',
        message: 'Enable financial transaction detection from your UPI messages',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
```

---

## 🧪 **Testing Strategy**

### **Unit Testing**
```bash
# Run all unit tests
npm run test:unit

# Test specific modules
npm run test:unit -- mudra
npm run test:unit -- soch
npm run test:unit -- sikshak

# Test coverage report
npm run test:coverage
```

### **Integration Testing**
```bash
# Cross-module integration tests
npm run test:integration:soch-mudra
npm run test:integration:mudra-sikshak
npm run test:integration:full-platform

# Voice command testing
npm run test:voice-integration

# SMS parsing accuracy testing
npm run test:sms-parsing
```

### **Cultural & Localization Testing**
```bash
# Hinglish language testing
npm run test:localization:hindi
npm run test:localization:english

# Regional cultural context testing
npm run test:cultural:north-india
npm run test:cultural:south-india
npm run test:cultural:west-india
npm run test:cultural:east-india

# Festival and cultural awareness testing
npm run test:cultural:festivals
```

---

## 📊 **Performance Optimization**

### **Indian Market Optimizations**
```javascript
// Performance configuration for entry-level devices
const INDIAN_MARKET_CONFIG = {
  maxTransactionsInMemory: 1000,
  enableIntelligentCaching: true,
  optimizeForLowRAM: true,
  enableOfflineFirst: true,
  maxDatabaseSize: '50MB',
  enableDataCompression: true
};

// src/shared/utils/performance-optimizer.js
export class PerformanceOptimizer {
  static optimizeForIndianMarket() {
    // Configure for 2GB RAM minimum
    // Enable aggressive memory management
    // Setup intelligent data caching
    // Configure offline-first architecture
  }
}
```

### **Battery Optimization**
```javascript
// src/services/background-sms-monitor.js
export class SMSBackgroundMonitor {
  constructor() {
    this.isOptimizedForBattery = true;
    this.batchProcessingInterval = 30000; // 30 seconds
  }

  startOptimizedMonitoring() {
    // Implement intelligent SMS monitoring
    // Batch process transactions
    // Minimize background CPU usage
    // Efficient wake lock management
  }
}
```

---

## 🚀 **Deployment Configuration**

### **Development Environment**
```bash
# Start development server with hot reload
npm run dev

# Enable debug mode for all modules
npm run dev:debug

# Test on Indian banking SMS formats
npm run dev:test-indian-banks
```

### **Staging Environment**
```bash
# Build staging version
npm run build:staging

# Test with production-like data
npm run test:staging:full

# Performance benchmarking
npm run benchmark:indian-devices
```

### **Production Build**
```bash
# Generate production builds
npm run build:production:android
npm run build:production:ios

# Validate security measures
npm run security:audit

# Final testing checklist
npm run test:production:readiness
```

---

## 📚 **Development Resources**

### **API Documentation**
- **Sarvam AI Integration**: [API Documentation](../soch-ai-core/api-integration.md)
- **SMS Parsing Patterns**: [Banking Format Guide](../mudra-finance/sms-parsing-guide.md)
- **Cultural Context API**: [Cultural Intelligence Guide](../soch-ai-core/cultural-context.md)

### **UI/UX Guidelines**
- **Design System**: [Component Library](../04-DESIGN/design-system.md)
- **Indian UI Patterns**: [Cultural UI Guide](../04-DESIGN/cultural-design-patterns.md)
- **Accessibility Standards**: [Indian Accessibility Guide](../04-DESIGN/accessibility-standards.md)

### **Troubleshooting**
- **Common Issues**: [Development FAQ](./development-faq.md)
- **Indian Banking Integration**: [Banking Troubleshooting](./banking-integration-issues.md)
- **Performance Issues**: [Optimization Guide](./performance-troubleshooting.md)

This development setup guide provides a comprehensive foundation for building the AssistantPro platform with Indian market focus, privacy-first architecture, and scalable SaaS design principles.
