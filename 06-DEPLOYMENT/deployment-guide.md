# Deployment Guide - AssistantPro MVP

## Overview
Complete deployment strategy for AssistantPro, India's privacy-first AI assistant platform, covering mobile app distribution, web deployment, and infrastructure management with focus on emerging market requirements.

## Deployment Architecture

### Multi-Platform Distribution Strategy
```
AssistantPro Deployment Pipeline
├── Mobile Apps
│   ├── Android (Google Play Store + APK)
│   └── iOS (App Store)
├── Web Platform
│   ├── Progressive Web App (PWA)
│   └── Admin Dashboard
└── Backend Services
    ├── API Gateway (Vercel/Railway)
    ├── Database (PlanetScale/Supabase)
    └── AI Services (Sarvam AI)
```

## Pre-Deployment Checklist

### Technical Readiness
- [ ] **Code Quality:** > 85% test coverage, security scanned
- [ ] **Performance:** Lighthouse scores > 90
- [ ] **Accessibility:** WCAG 2.1 AA compliance verified
- [ ] **Cultural Testing:** Regional validation complete
- [ ] **API Integration:** Sarvam AI models tested in production
- [ ] **Privacy Compliance:** Data encryption and consent flows verified

### Regional Compliance
- [ ] **IT Act 2000:** Indian data protection compliance
- [ ] **RBI Guidelines:** Financial services compliance (Mudra Finance)
- [ ] **Google Play Policy:** India-specific app store requirements
- [ ] **Apple App Store:** Cultural content guidelines
- [ ] **Accessibility Standards:** GIGW compliance verification

### Business Requirements
- [ ] **Content Moderation:** Cultural sensitivity review
- [ ] **Customer Support:** Multilingual support channels
- [ ] **Legal Framework:** Terms of service localized
- [ ] **Payment Integration:** UPI, Razorpay testing complete
- [ ] **Educational Content:** Curriculum alignment verified

## Mobile App Deployment

### Android Deployment (Google Play Store)

#### Build Configuration
```javascript
// app.json - Expo configuration
{
  "expo": {
    "name": "AssistantPro",
    "slug": "assistantpro-india",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF9933"
    },
    "android": {
      "package": "com.assistantpro.india",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF9933"
      },
      "permissions": [
        "RECORD_AUDIO",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ]
    }
  }
}
```

#### Build Process
```bash
# Production Build Commands
expo build:android --type app-bundle
expo upload:android --path ./dist/app.aab

# Alternative: EAS Build
eas build --platform android --profile production
eas submit --platform android
```

#### Play Store Optimization
```yaml
# Store Listing Configuration
Title: "AssistantPro - AI Assistant for India"
Short Description: "Privacy-first AI assistant in Hindi & regional languages"
Long Description: |
  AssistantPro brings AI assistance to India with complete privacy protection.
  
  🇮🇳 MADE FOR INDIA
  • Hindi & 8+ regional languages supported
  • Cultural context understanding
  • Works offline without internet
  • Designed for 2GB RAM devices
  
  🔒 PRIVACY FIRST
  • All data stays on your device
  • No cloud storage of personal information
  • End-to-end encryption
  • GDPR compliant
  
  🎯 THREE POWERFUL FEATURES
  • Soch AI: Intelligent conversation assistant
  • Mudra Finance: Personal finance management
  • Sikshak Education: Learning and skill development

Keywords: "AI assistant, Hindi, privacy, finance, education, India"
Category: "Productivity"
Content Rating: "Everyone"
```

### iOS Deployment (App Store)

#### iOS Configuration
```javascript
// iOS specific configuration
"ios": {
  "bundleIdentifier": "com.assistantpro.india",
  "buildNumber": "1",
  "supportsTablet": true,
  "infoPlist": {
    "NSMicrophoneUsageDescription": "Voice commands and speech recognition",
    "NSCameraUsageDescription": "Document scanning and image analysis",
    "NSPhotoLibraryUsageDescription": "Access photos for analysis"
  }
}
```

#### App Store Connect Setup
```yaml
# App Store Metadata
App Name: "AssistantPro"
Subtitle: "AI Assistant for India"
Keywords: "AI, assistant, Hindi, privacy, India"
Description: |
  India's first privacy-focused AI assistant supporting Hindi and regional languages.
  
  KEY FEATURES:
  • Complete offline functionality
  • Regional language support
  • Cultural context awareness
  • Privacy-first architecture
  
  SOCH AI HUB:
  • Natural conversation in Hindi/English
  • Voice and text interaction
  • Contextual responses
  
  MUDRA FINANCE:
  • Personal expense tracking
  • UPI transaction support
  • Financial goal planning
  
  SIKSHAK EDUCATION:
  • Skill development courses
  • Interactive learning
  • Progress tracking

Primary Category: "Productivity"
Secondary Category: "Education"
Age Rating: "4+"
```

### Alternative Distribution (APK)

#### Direct APK Distribution
```bash
# Build standalone APK for direct distribution
expo build:android --type apk

# Optimize APK size
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

# Sign APK for production
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias
zipalign -v 4 app-release-unsigned.apk AssistantPro.apk
```

## Web Platform Deployment

### Progressive Web App (PWA)

#### Vercel Deployment
```yaml
# vercel.json
{
  "version": 2,
  "name": "assistantpro-web",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/service-worker.js",
      "headers": {
        "cache-control": "public, max-age=0, must-revalidate"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    }
  ]
}
```

#### PWA Configuration
```javascript
// manifest.json
{
  "name": "AssistantPro - AI Assistant for India",
  "short_name": "AssistantPro",
  "description": "Privacy-first AI assistant in Hindi & regional languages",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#FF9933",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512", 
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["productivity", "education", "finance"],
  "lang": "hi-IN",
  "screenshots": [
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "640x1136",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### Railway/Render Backend Deployment

#### Railway Configuration
```yaml
# railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

#### Environment Configuration
```bash
# Production Environment Variables
NODE_ENV=production
PORT=3000

# Sarvam AI Configuration
SARVAM_API_KEY=your_production_api_key
SARVAM_BASE_URL=https://api.sarvam.ai

# Database Configuration
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port

# Security Configuration
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# Regional Settings
DEFAULT_LANGUAGE=hi-IN
SUPPORTED_LANGUAGES=hi,en,ta,te,bn,gu,mr,kn
TIMEZONE=Asia/Kolkata

# Feature Flags
ENABLE_VOICE_COMMANDS=true
ENABLE_CAMERA_OCR=true
ENABLE_OFFLINE_MODE=true
```

## Database Deployment

### PlanetScale MySQL Configuration
```sql
-- Production Database Schema
CREATE DATABASE assistantpro_prod;

-- User Management
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone_hash VARCHAR(255) UNIQUE,
  language_preference VARCHAR(10) DEFAULT 'hi-IN',
  privacy_settings JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Conversation History (Encrypted)
CREATE TABLE conversations (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  content_encrypted TEXT,
  language VARCHAR(10),
  feature_type ENUM('soch', 'mudra', 'sikshak'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Financial Data (Encrypted)
CREATE TABLE financial_records (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  transaction_data_encrypted TEXT,
  category VARCHAR(50),
  amount_encrypted VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Learning Progress
CREATE TABLE learning_progress (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  course_id VARCHAR(100),
  progress_percentage INT DEFAULT 0,
  completion_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Supabase Alternative Configuration
```javascript
// supabase/migrations/001_initial_schema.sql
-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Users table with RLS
CREATE TABLE public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  phone_hash TEXT UNIQUE,
  language_preference TEXT DEFAULT 'hi-IN',
  privacy_settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- User can only access their own data
CREATE POLICY "Users can only see own data" ON public.users
  FOR ALL USING (auth.uid() = id);
```

## CDN & Asset Optimization

### Cloudflare Configuration
```yaml
# Cloudflare Workers for API optimization
name = "assistantpro-api-worker"
main = "src/worker.js"
compatibility_date = "2024-01-01"

[env.production]
name = "assistantpro-api-worker"
routes = [
  { pattern = "api.assistantpro.in/*", zone_name = "assistantpro.in" }
]

# Cache settings for Indian users
[[env.production.kv_namespaces]]
binding = "CACHE"
id = "your_kv_namespace_id"
```

### Asset Optimization Strategy
```javascript
// Image optimization for Indian networks
const imageOptimization = {
  formats: ['webp', 'avif', 'jpg'],
  sizes: [320, 640, 960, 1280],
  quality: {
    high: 85,    // Premium devices/WiFi
    medium: 70,  // Mid-range devices/4G
    low: 55      // Entry-level devices/3G
  }
};

// Progressive loading for slow networks
const progressiveLoadingConfig = {
  preload: 'critical-above-fold',
  lazyLoad: 'below-fold-content',
  placeholder: 'low-quality-blur'
};
```

## Monitoring & Analytics

### Production Monitoring Setup
```javascript
// Sentry Configuration
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your_sentry_dsn',
  environment: 'production',
  tracesSampleRate: 0.1, // Adjust for Indian traffic volume
  beforeSend(event) {
    // Remove PII before sending to Sentry
    return sanitizeEvent(event);
  }
});

// Performance monitoring
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User signed in',
  level: 'info'
});
```

### Analytics Configuration
```javascript
// Privacy-compliant analytics
const analyticsConfig = {
  provider: 'self-hosted', // No Google Analytics for privacy
  events: {
    // Only track essential usage patterns
    'feature_used': ['soch', 'mudra', 'sikshtak'],
    'language_changed': ['hi', 'en', 'regional'],
    'error_occurred': ['api_failure', 'offline_mode']
  },
  dataRetention: '90_days',
  userConsent: 'required'
};
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy AssistantPro

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Security scan
        run: npm audit --audit-level high

  build-android:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Setup Expo
        uses: expo/expo-github-action@v7
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Build Android
        run: expo build:android --type app-bundle
      
      - name: Upload to Play Store
        run: expo upload:android

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Security Deployment

### SSL/TLS Configuration
```nginx
# Nginx configuration for API endpoints
server {
    listen 443 ssl http2;
    server_name api.assistantpro.in;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Rate limiting for Indian traffic patterns
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### API Security Configuration
```javascript
// Express.js security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.sarvam.ai"]
    }
  }
}));

// Rate limiting adjusted for Indian usage patterns
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Requests per window
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);
```

## Environment-Specific Configurations

### Development Environment
```bash
# Development deployment (staging)
export NODE_ENV=development
export API_URL=https://staging-api.assistantpro.in
export SARVAM_API_KEY=staging_key
export LOG_LEVEL=debug
export ENABLE_ANALYTICS=false
```

### Production Environment
```bash
# Production deployment
export NODE_ENV=production
export API_URL=https://api.assistantpro.in
export SARVAM_API_KEY=production_key
export LOG_LEVEL=error
export ENABLE_ANALYTICS=true
export PRIVACY_MODE=strict
```

## Rollback Strategy

### Automated Rollback
```yaml
# Automated rollback on failure
rollback_conditions:
  - error_rate > 5%
  - response_time > 3000ms
  - user_complaints > 10/hour
  - security_alert: critical

rollback_process:
  1. Automatic traffic routing to previous version
  2. Database migration rollback (if needed)
  3. CDN cache invalidation
  4. Monitoring alert to team
  5. Post-incident analysis trigger
```

### Manual Rollback Process
```bash
# Emergency rollback commands
# Mobile Apps
expo publish --release-channel production-rollback

# Web Platform
vercel --prod --target production-1.0.0

# Database
mysql -u admin -p assistantpro_prod < backup_pre_deployment.sql

# CDN Cache Clear
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

## Post-Deployment Verification

### Health Checks
```javascript
// Automated health check endpoints
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: checkDatabase(),
      sarvamAI: checkSarvamAI(),
      cache: checkRedis(),
      storage: checkFileSystem()
    }
  };
  
  const isHealthy = Object.values(health.checks).every(check => check.status === 'ok');
  res.status(isHealthy ? 200 : 503).json(health);
});
```

### Smoke Tests
```bash
# Post-deployment smoke tests
curl -f https://api.assistantpro.in/health
curl -f https://assistantpro.in/manifest.json
curl -f -H "Authorization: Bearer test_token" https://api.assistantpro.in/api/v1/soch/status
```

## Regional Considerations

### India-Specific Deployment Notes
- **Network Reliability:** Implement aggressive caching for intermittent connectivity
- **Device Performance:** Optimize for 2GB RAM Android devices
- **Data Costs:** Minimize bandwidth usage in rural areas
- **Language Support:** Deploy regional language models progressively
- **Payment Integration:** Ensure UPI gateway redundancy
- **Cultural Compliance:** Regional content moderation deployment
- **Government Regulations:** IT Act 2000, GDPR-equivalent compliance

### Support Infrastructure
- **Customer Service:** Hindi/English support team deployment
- **Documentation:** Multilingual user guides
- **Community:** Regional user forums and support channels
- **Feedback Systems:** Cultural adaptation feedback loops

---

**Next Steps:**
1. Execute mobile app store submissions
2. Configure production monitoring systems
3. Set up regional CDN optimization
4. Deploy customer support infrastructure
5. Implement automated rollback systems

**Related Documentation:**
- [Testing Strategy](./testing-strategy.md)
- [Monitoring Guide](./monitoring.md)
- [Privacy Architecture](../01-CORE/privacy-first-architecture.md)
- [Implementation Guides](../03-IMPLEMENTATION/)
