# AssistantPro React Native Development Guide

## 🚀 **React Native Setup for AssistantPro MVP**

This comprehensive guide covers React Native development for AssistantPro, specifically optimized for India's emerging markets with offline-first capabilities, cultural adaptations, and performance optimization for entry-level devices.

---

## 📱 **Project Architecture Overview**

### **Technology Stack**
```javascript
{
  // Core Framework
  "expo": "^50.0.0",
  "react-native": "0.73.6",
  "expo-router": "^3.0.0",
  
  // UI & Styling
  "react-native-paper": "^5.12.0",
  "nativewind": "^2.0.11",
  "react-native-vector-icons": "^10.0.0",
  "react-native-svg": "^14.1.0",
  
  // State Management
  "@reduxjs/toolkit": "^2.0.0",
  "react-query": "^3.39.3",
  "zustand": "^4.4.7",
  
  // Authentication & Security
  "@clerk/clerk-expo": "^1.0.0",
  "react-native-keychain": "^8.1.0",
  "react-native-biometrics": "^3.0.0",
  
  // Local Storage & Database
  "expo-sqlite": "^13.0.0",
  "react-native-mmkv": "^2.11.0",
  "@react-native-async-storage/async-storage": "^1.21.0",
  
  // Device Permissions & APIs
  "react-native-permissions": "^4.1.0",
  "react-native-contacts": "^7.0.8",
  "react-native-sms": "^1.0.0",
  "expo-sms": "^12.0.0",
  "@react-native-voice/voice": "^3.2.4",
  
  // AI & ML Integration
  "react-native-pytorch-core": "^0.2.4",
  "@react-native-ml-kit/translate": "^0.5.0",
  "react-native-tts": "^4.1.0",
  
  // Performance & Analytics
  "react-native-flipper": "^0.212.0",
  "@react-native-firebase/analytics": "^19.0.0",
  "react-native-performance": "^5.1.0"
}
```

---

## 🛠️ **Initial Project Setup**

### **1. Create Expo Project with Router**
```bash
# Create new project with TypeScript and Expo Router
npx create-expo-app@latest AssistantPro --template tabs@50
cd AssistantPro

# Install additional dependencies
npm install @expo/vector-icons expo-router expo-constants expo-linking expo-status-bar
npm install react-native-paper nativewind @clerk/clerk-expo react-native-svg
npm install expo-sqlite react-native-mmkv @reduxjs/toolkit react-query
npm install react-native-permissions expo-sms @react-native-voice/voice
```

### **2. Configure Expo Router (app/_layout.tsx)**
```tsx
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthenticationGuard } from '@/lib/auth/AuthenticationGuard';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { tokenCache } from '@/lib/auth/token-cache';

const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider 
      publishableKey={publishableKey} 
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <ThemeProvider>
              <PaperProvider>
                <AuthenticationGuard>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                  </Stack>
                </AuthenticationGuard>
              </PaperProvider>
            </ThemeProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
```

### **3. Configure NativeWind (tailwind.config.js)**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // India-inspired color palette
        saffron: {
          50: '#fff7ed',
          500: '#f97316',
          600: '#ea580c',
        },
        emerald: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        navy: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        // Support for Devanagari and Latin scripts
        'hindi': ['Noto Sans Devanagari', 'system-ui'],
        'english': ['Inter', 'system-ui'],
      }
    },
  },
  plugins: [],
}
```

---

## 🏗️ **App Architecture & Structure**

### **Project Folder Structure**
```
AssistantPro/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication screens
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                   # Main app tabs
│   │   ├── dashboard.tsx
│   │   ├── mudra.tsx
│   │   ├── sikshak.tsx
│   │   ├── settings.tsx
│   │   └── _layout.tsx
│   ├── onboarding/               # User onboarding flow
│   ├── _layout.tsx
│   └── +not-found.tsx
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   ├── mudra/                   # Finance module components
│   ├── sikshak/                 # Education module components
│   └── shared/                  # Cross-module components
├── lib/                         # Core utilities
│   ├── auth/                    # Authentication logic
│   ├── database/                # Local database setup
│   ├── permissions/             # Device permissions
│   ├── encryption/              # Data encryption
│   └── api/                     # API integration
├── modules/                     # Feature modules
│   ├── mudra/                   # Financial module
│   ├── sikshak/                 # Educational module
│   └── soch/                    # AI core module
├── providers/                   # Context providers
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript definitions
├── assets/                      # Images, fonts, etc.
└── constants/                   # App constants
```

### **Core App Layout with Tabs (app/(tabs)/_layout.tsx)**
```tsx
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#f97316' : '#ea580c',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mudra"
        options={{
          title: 'Mudra',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-balance-wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sikshak"
        options={{
          title: 'Sikshak',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## 🇮🇳 **India-Specific Optimizations**

### **1. Language Support & Localization**

#### **Language Provider (providers/LanguageProvider.tsx)**
```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextType {
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcome: 'Welcome to AssistantPro',
    dashboard: 'Dashboard',
    mudra: 'Mudra Finance',
    sikshak: 'Sikshak Education',
    settings: 'Settings',
    // Add more translations
  },
  hi: {
    welcome: 'असिस्टेंट प्रो में आपका स्वागत है',
    dashboard: 'डैशबोर्ड',
    mudra: 'मुद्रा वित्त',
    sikshak: 'शिक्षक शिक्षा',
    settings: 'सेटिंग्स',
    // Add more translations
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'hi' | 'en'>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage && (savedLanguage === 'hi' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: 'hi' | 'en') => {
    try {
      await AsyncStorage.setItem('app_language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

### **2. Cultural Theme & Design System**

#### **Theme Provider (providers/ThemeProvider.tsx)**
```tsx
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const IndianColors = {
  light: {
    primary: '#ea580c',        // Saffron
    secondary: '#059669',      // Green
    accent: '#3b82f6',         // Blue
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    error: '#dc2626',
    success: '#10b981',
    warning: '#f59e0b',
  },
  dark: {
    primary: '#f97316',
    secondary: '#10b981',
    accent: '#60a5fa',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#fbbf24',
  },
};

interface ThemeContextType {
  colors: typeof IndianColors.light;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const colors = isDark ? IndianColors.dark : IndianColors.light;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### **3. Performance Optimization for Entry-Level Devices**

#### **Performance Monitor Hook (hooks/usePerformance.ts)**
```tsx
import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

interface DeviceInfo {
  isLowEndDevice: boolean;
  screenSize: 'small' | 'medium' | 'large';
  memoryOptimized: boolean;
}

export const usePerformanceOptimization = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isLowEndDevice: false,
    screenSize: 'medium',
    memoryOptimized: false,
  });

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    const screenSize = width < 360 ? 'small' : width > 400 ? 'large' : 'medium';
    
    // Detect low-end devices (common in Indian market)
    const isLowEndDevice = Platform.OS === 'android' && (
      width < 360 || // Small screen
      Platform.Version < 28 // Older Android versions
    );

    setDeviceInfo({
      isLowEndDevice,
      screenSize,
      memoryOptimized: isLowEndDevice,
    });
  }, []);

  return deviceInfo;
};
```

#### **Optimized Component Rendering**
```tsx
// components/ui/OptimizedFlatList.tsx
import React, { memo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { usePerformanceOptimization } from '@/hooks/usePerformance';

interface OptimizedFlatListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
}

function OptimizedFlatListComponent<T>({ 
  data, 
  renderItem, 
  keyExtractor 
}: OptimizedFlatListProps<T>) {
  const { isLowEndDevice } = usePerformanceOptimization();

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // Optimize for low-end devices
      removeClippedSubviews={isLowEndDevice}
      maxToRenderPerBatch={isLowEndDevice ? 5 : 10}
      updateCellsBatchingPeriod={isLowEndDevice ? 100 : 50}
      initialNumToRender={isLowEndDevice ? 5 : 10}
      windowSize={isLowEndDevice ? 5 : 10}
      getItemLayout={undefined} // Let FlatList calculate dynamically
    />
  );
}

export const OptimizedFlatList = memo(OptimizedFlatListComponent) as typeof OptimizedFlatListComponent;
```

---

## 📱 **Device Permissions & SMS Integration**

### **1. Comprehensive Permissions Manager**

#### **Permissions Manager (lib/permissions/PermissionsManager.ts)**
```tsx
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export class PermissionsManager {
  static async requestSMSPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      // iOS doesn't allow SMS reading
      return false;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Access Permission',
          message: 'AssistantPro needs to read your SMS to automatically detect UPI transactions and provide financial insights.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Allow',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('SMS permission error:', err);
      return false;
    }
  }

  static async requestContactsPermissions(): Promise<boolean> {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.CONTACTS 
      : PERMISSIONS.ANDROID.READ_CONTACTS;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  }

  static async requestMicrophonePermissions(): Promise<boolean> {
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.MICROPHONE
      : PERMISSIONS.ANDROID.RECORD_AUDIO;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  }

  static async requestAllPermissions(): Promise<{[key: string]: boolean}> {
    const results = {
      sms: await this.requestSMSPermissions(),
      contacts: await this.requestContactsPermissions(),
      microphone: await this.requestMicrophonePermissions(),
    };

    // Show summary dialog
    this.showPermissionsSummary(results);
    return results;
  }

  private static showPermissionsSummary(results: {[key: string]: boolean}) {
    const granted = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    Alert.alert(
      'Permissions Setup',
      `${granted}/${total} permissions granted. You can change these in Settings later.`,
      [
        { text: 'Continue', style: 'default' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
  }
}
```

### **2. SMS Transaction Parser**

#### **SMS Parser (modules/mudra/sms-parser/SMSParser.ts)**
```tsx
import { NativeModules, DeviceEventEmitter } from 'react-native';

interface Transaction {
  id: string;
  amount: number;
  type: 'debit' | 'credit';
  merchant: string;
  timestamp: Date;
  upiId?: string;
  accountNumber?: string;
}

export class SMSParser {
  private static instance: SMSParser;
  private listeners: Array<(transaction: Transaction) => void> = [];

  static getInstance(): SMSParser {
    if (!SMSParser.instance) {
      SMSParser.instance = new SMSParser();
    }
    return SMSParser.instance;
  }

  startListening() {
    DeviceEventEmitter.addListener('onSMSReceived', (message) => {
      const transaction = this.parseTransactionSMS(message);
      if (transaction) {
        this.notifyListeners(transaction);
      }
    });
  }

  private parseTransactionSMS(smsBody: string): Transaction | null {
    // UPI transaction patterns common in India
    const patterns = [
      // UPI patterns
      /UPI.*?Rs\.?\s*(\d+(?:\.\d{2})?)/i,
      /paid.*?Rs\.?\s*(\d+(?:\.\d{2})?)/i,
      /received.*?Rs\.?\s*(\d+(?:\.\d{2})?)/i,
      // Bank patterns
      /credited.*?Rs\.?\s*(\d+(?:\.\d{2})?)/i,
      /debited.*?Rs\.?\s*(\d+(?:\.\d{2})?)/i,
      // Common format: INR 1,234.56
      /INR\s*(\d+(?:,\d+)*(?:\.\d{2})?)/i,
    ];

    for (const pattern of patterns) {
      const match = smsBody.match(pattern);
      if (match) {
        const amount = parseFloat(match[1].replace(/,/g, ''));
        const isCredit = /received|credited|refund/i.test(smsBody);
        
        return {
          id: Date.now().toString(),
          amount,
          type: isCredit ? 'credit' : 'debit',
          merchant: this.extractMerchant(smsBody),
          timestamp: new Date(),
          upiId: this.extractUPIId(smsBody),
        };
      }
    }

    return null;
  }

  private extractMerchant(smsBody: string): string {
    // Extract merchant name from SMS
    const merchantPatterns = [
      /to\s+([A-Za-z\s]+)/i,
      /at\s+([A-Za-z\s]+)/i,
      /from\s+([A-Za-z\s]+)/i,
    ];

    for (const pattern of merchantPatterns) {
      const match = smsBody.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return 'Unknown';
  }

  private extractUPIId(smsBody: string): string | undefined {
    const upiPattern = /[\w.-]+@[\w.-]+/;
    const match = smsBody.match(upiPattern);
    return match?.[0];
  }

  addTransactionListener(callback: (transaction: Transaction) => void) {
    this.listeners.push(callback);
  }

  private notifyListeners(transaction: Transaction) {
    this.listeners.forEach(callback => callback(transaction));
  }
}
```

---

## 🗃️ **Local Database & Storage**

### **1. SQLite Database Setup**

#### **Database Manager (lib/database/DatabaseManager.ts)**
```tsx
import * as SQLite from 'expo-sqlite';
import { LocalEncryption } from '@/lib/security/encryption';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private db: SQLite.SQLiteDatabase;
  private encryption: LocalEncryption;

  private constructor() {
    this.db = SQLite.openDatabase('assistantpro.db');
    this.encryption = LocalEncryption.getInstance();
    this.initializeTables();
  }

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private initializeTables() {
    this.db.transaction(tx => {
      // Transactions table for Mudra module
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS transactions (
          id TEXT PRIMARY KEY,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          merchant TEXT,
          timestamp INTEGER NOT NULL,
          upi_id TEXT,
          account_number TEXT,
          encrypted_data TEXT
        );
      `);

      // Learning progress for Sikshak module
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS learning_progress (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          course_id TEXT NOT NULL,
          progress REAL DEFAULT 0,
          completed_lessons TEXT,
          last_accessed INTEGER,
          encrypted_notes TEXT
        );
      `);

      // User preferences
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS user_preferences (
          key TEXT PRIMARY KEY,
          value TEXT,
          encrypted BOOLEAN DEFAULT 0
        );
      `);
    });
  }

  // Transaction operations
  async saveTransaction(transaction: any): Promise<void> {
    const encryptedData = this.encryption.encryptData(transaction);
    
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO transactions 
           (id, amount, type, merchant, timestamp, upi_id, account_number, encrypted_data) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            transaction.id,
            transaction.amount,
            transaction.type,
            transaction.merchant,
            transaction.timestamp.getTime(),
            transaction.upiId || null,
            transaction.accountNumber || null,
            encryptedData
          ],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }

  async getTransactions(limit: number = 50): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM transactions ORDER BY timestamp DESC LIMIT ?',
          [limit],
          (_, { rows }) => {
            const transactions = rows._array.map(row => ({
              ...row,
              timestamp: new Date(row.timestamp),
              decryptedData: this.encryption.decryptData(row.encrypted_data)
            }));
            resolve(transactions);
          },
          (_, error) => reject(error)
        );
      });
    });
  }

  // Learning progress operations
  async saveLearningProgress(progress: any): Promise<void> {
    const encryptedNotes = progress.notes 
      ? this.encryption.encryptData(progress.notes) 
      : null;

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT OR REPLACE INTO learning_progress 
           (id, user_id, course_id, progress, completed_lessons, last_accessed, encrypted_notes) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            progress.id,
            progress.userId,
            progress.courseId,
            progress.progress,
            JSON.stringify(progress.completedLessons),
            Date.now(),
            encryptedNotes
          ],
          () => resolve(),
          (_, error) => reject(error)
        );
      });
    });
  }
}
```

### **2. MMKV for Fast Key-Value Storage**

#### **Fast Storage Manager (lib/storage/FastStorage.ts)**
```tsx
import { MMKV } from 'react-native-mmkv';

export class FastStorage {
  private static instance: FastStorage;
  private storage: MMKV;

  private constructor() {
    this.storage = new MMKV({
      id: 'assistantpro-cache',
      encryptionKey: 'your-encryption-key-here'
    });
  }

  static getInstance(): FastStorage {
    if (!FastStorage.instance) {
      FastStorage.instance = new FastStorage();
    }
    return FastStorage.instance;
  }

  set(key: string, value: any): void {
    if (typeof value === 'object') {
      this.storage.set(key, JSON.stringify(value));
    } else {
      this.storage.set(key, value);
    }
  }

  get<T>(key: string): T | undefined {
    const value = this.storage.getString(key);
    if (!value) return undefined;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clearAll();
  }

  // Specific methods for common use cases
  setUserPreference(key: string, value: any): void {
    this.set(`pref_${key}`, value);
  }

  getUserPreference<T>(key: string): T | undefined {
    return this.get<T>(`pref_${key}`);
  }

  cacheAPIResponse(endpoint: string, data: any, ttl: number = 300000): void {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl
    };
    this.set(`cache_${endpoint}`, cacheItem);
  }

  getCachedAPIResponse<T>(endpoint: string): T | null {
    const cacheItem = this.get<any>(`cache_${endpoint}`);
    if (!cacheItem) return null;

    const { data, timestamp, ttl } = cacheItem;
    if (Date.now() - timestamp > ttl) {
      this.delete(`cache_${endpoint}`);
      return null;
    }

    return data as T;
  }
}
```

---

## 🎯 **Voice Integration & AI Features**

### **1. Voice Command Handler**

#### **Voice Manager (lib/voice/VoiceManager.ts)**
```tsx
import Voice from '@react-native-voice/voice';
import { Alert } from 'react-native';

export class VoiceManager {
  private static instance: VoiceManager;
  private isListening = false;
  private listeners: Array<(result: string) => void> = [];

  private constructor() {
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechError = this.onSpeechError;
  }

  static getInstance(): VoiceManager {
    if (!VoiceManager.instance) {
      VoiceManager.instance = new VoiceManager();
    }
    return VoiceManager.instance;
  }

  async startListening(language: 'hi-IN' | 'en-IN' = 'en-IN'): Promise<void> {
    try {
      if (this.isListening) {
        await this.stopListening();
      }

      await Voice.start(language);
      this.isListening = true;
    } catch (error) {
      console.error('Voice start error:', error);
      Alert.alert('Voice Error', 'Could not start voice recognition');
    }
  }

  async stopListening(): Promise<void> {
    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Voice stop error:', error);
    }
  }

  private onSpeechStart = () => {
    console.log('Voice recognition started');
  };

  private onSpeechEnd = () => {
    console.log('Voice recognition ended');
    this.isListening = false;
  };

  private onSpeechResults = (event: any) => {
    const result = event.value?.[0];
    if (result) {
      this.notifyListeners(result);
    }
  };

  private onSpeechError = (event: any) => {
    console.error('Voice recognition error:', event.error);
    this.isListening = false;
  };

  addVoiceResultListener(callback: (result: string) => void) {
    this.listeners.push(callback);
  }

  private notifyListeners(result: string) {
    this.listeners.forEach(callback => callback(result));
  }

  // Voice command parser for Indian context
  parseVoiceCommand(text: string): { action: string; params: any } | null {
    const lowerText = text.toLowerCase();

    // Financial commands (English/Hindi mixed)
    if (lowerText.includes('money') || lowerText.includes('paisa') || lowerText.includes('payment')) {
      if (lowerText.includes('send') || lowerText.includes('bhej')) {
        return { action: 'send_money', params: { text } };
      }
      if (lowerText.includes('check') || lowerText.includes('dekh')) {
        return { action: 'check_balance', params: {} };
      }
    }

    // Educational commands
    if (lowerText.includes('learn') || lowerText.includes('sikh') || lowerText.includes('padh')) {
      return { action: 'start_lesson', params: { text } };
    }

    // General queries
    if (lowerText.includes('help') || lowerText.includes('madad')) {
      return { action: 'get_help', params: { text } };
    }

    return null;
  }
}
```

### **2. AI Response Handler**

#### **AI Integration (lib/ai/AIManager.ts)**
```tsx
import { VoiceManager } from '@/lib/voice/VoiceManager';
import { useLanguage } from '@/providers/LanguageProvider';

export class AIManager {
  private static instance: AIManager;
  private voiceManager: VoiceManager;

  private constructor() {
    this.voiceManager = VoiceManager.getInstance();
  }

  static getInstance(): AIManager {
    if (!AIManager.instance) {
      AIManager.instance = new AIManager();
    }
    return AIManager.instance;
  }

  async processUserQuery(query: string, context: 'mudra' | 'sikshak' | 'general'): Promise<string> {
    // Process query based on context
    switch (context) {
      case 'mudra':
        return this.processFinancialQuery(query);
      case 'sikshak':
        return this.processEducationalQuery(query);
      default:
        return this.processGeneralQuery(query);
    }
  }

  private async processFinancialQuery(query: string): Promise<string> {
    // Integrate with Sarvam AI for financial assistance
    const prompt = `
    User is asking about financial matters in Indian context: "${query}"
    Provide helpful financial advice in simple language.
    Consider UPI payments, bank accounts, and Indian financial systems.
    `;

    // Call Sarvam AI API (implementation depends on actual API)
    return this.callSarvamAI(prompt);
  }

  private async processEducationalQuery(query: string): Promise<string> {
    const prompt = `
    User is asking about education: "${query}"
    Provide educational guidance suitable for Indian students.
    Consider Indian curriculum, local context, and cultural sensitivity.
    `;

    return this.callSarvamAI(prompt);
  }

  private async callSarvamAI(prompt: string): Promise<string> {
    try {
      // Replace with actual Sarvam AI integration
      const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SARVAM_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sarvam-2.0',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Sarvam AI error:', error);
      return 'Sorry, there was an error processing your request.';
    }
  }
}
```

---

## 🧪 **Testing & Development**

### **1. Development Testing Setup**

#### **Test Configuration (jest.config.js)**
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'modules/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

#### **Component Testing Example**
```tsx
// __tests__/components/ui/OptimizedFlatList.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { OptimizedFlatList } from '@/components/ui/OptimizedFlatList';

const mockData = [
  { id: '1', title: 'Test Item 1' },
  { id: '2', title: 'Test Item 2' },
];

const renderItem = ({ item }: { item: typeof mockData[0] }) => (
  <Text>{item.title}</Text>
);

describe('OptimizedFlatList', () => {
  it('renders correctly with data', () => {
    const { getByText } = render(
      <OptimizedFlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );

    expect(getByText('Test Item 1')).toBeTruthy();
    expect(getByText('Test Item 2')).toBeTruthy();
  });
});
```

### **2. Performance Testing**

#### **Performance Monitor Component**
```tsx
// components/dev/PerformanceMonitor.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    if (__DEV__) {
      const interval = setInterval(() => {
        // Monitor FPS and memory usage
        // Implementation depends on performance monitoring library
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  if (!__DEV__) return null;

  return (
    <View style={{ position: 'absolute', top: 50, right: 10, backgroundColor: 'rgba(0,0,0,0.7)', padding: 8 }}>
      <Text style={{ color: 'white', fontSize: 12 }}>FPS: {fps}</Text>
      <Text style={{ color: 'white', fontSize: 12 }}>Memory: {memoryUsage}MB</Text>
    </View>
  );
}
```

---

## 📦 **Build & Deployment**

### **1. Environment Configuration**

#### **Environment Variables (.env.example)**
```bash
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Sarvam AI
SARVAM_API_KEY=your_sarvam_api_key_here

# Database Encryption
DATABASE_ENCRYPTION_KEY=your_encryption_key_here

# App Configuration
APP_ENVIRONMENT=development
API_BASE_URL=https://api.assistantpro.in

# Indian Market Specific
SUPPORT_HINDI=true
DEFAULT_CURRENCY=INR
DEFAULT_TIMEZONE=Asia/Kolkata
```

### **2. Build Configuration**

#### **EAS Build Configuration (eas.json)**
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "APP_ENVIRONMENT": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "APP_ENVIRONMENT": "staging"
      }
    },
    "production": {
      "env": {
        "APP_ENVIRONMENT": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### **3. Performance Optimization Scripts**

#### **Package.json Scripts**
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios"
  }
}
```

---

## 📚 **Best Practices & Guidelines**

### **1. Code Organization**
- Use TypeScript for better type safety
- Implement consistent file naming conventions
- Create reusable components and hooks
- Maintain clear separation between modules

### **2. Performance Optimization**
- Implement lazy loading for heavy components
- Use FlatList optimization for large datasets
- Minimize re-renders with React.memo and useMemo
- Optimize images with appropriate formats and sizes

### **3. Security Considerations**
- Always encrypt sensitive data
- Use secure storage for credentials
- Implement proper permission handling
- Regular security audits and updates

### **4. India-Specific Considerations**
- Support for Hindi and regional languages
- Optimize for low-bandwidth connections
- Consider offline functionality
- Respect cultural sensitivities in UI/UX

---

This comprehensive React Native guide provides the foundation for building AssistantPro with all the necessary features, optimizations, and considerations for the Indian market. The implementation focuses on performance, security, and user experience while maintaining scalability for future enhancements.
