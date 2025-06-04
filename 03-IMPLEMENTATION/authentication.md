# AssistantPro Authentication Implementation Guide

## 🔐 **Authentication Architecture Overview**

AssistantPro implements a privacy-first authentication system optimized for India's emerging markets, combining secure user onboarding with comprehensive device permissions management for AI-powered financial and educational assistance.

---

## 🛠️ **Tech Stack & Implementation**

### **Primary Authentication Provider: Clerk**
- **Reason**: Comprehensive React Native support with India-specific features
- **Features**: Email/password, SMS OTP, biometric auth, session management
- **Integration**: Seamless JWT token handling for cross-module security

### **Device-Level Security Stack**
```javascript
// Core security dependencies
{
  "@clerk/clerk-expo": "^1.0.0",              // Primary authentication
  "react-native-keychain": "^8.1.0",          // Secure credential storage
  "react-native-biometrics": "^3.0.0",        // Fingerprint/Face ID
  "react-native-encrypted-storage": "^4.0.0", // Local data encryption
  "react-native-device-info": "^10.0.0",      // Device binding
  "react-native-crypto-js": "^2.1.0"          // AES-256 encryption
}
```

---

## 📱 **Step-by-Step Authentication Setup**

### **1. Clerk Configuration**

#### **Environment Variables (.env)**
```bash
# Clerk Configuration
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# India-Specific Settings
CLERK_JWT_TEMPLATE_NAME=assistantpro-india
CLERK_SIGN_IN_URL=/(auth)/sign-in
CLERK_SIGN_UP_URL=/(auth)/sign-up
CLERK_AFTER_SIGN_IN_URL=/dashboard
CLERK_AFTER_SIGN_UP_URL=/onboarding
```

#### **Clerk Provider Setup (app/_layout.tsx)**
```tsx
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@/lib/auth/token-cache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <AuthenticationGuard>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthenticationGuard>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
```

### **2. Authentication Screens Implementation**

#### **Sign Up Screen (app/(auth)/sign-up.tsx)**
```tsx
import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Create account with email verification
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].message);
    }
  };

  // Verify email with 6-digit code
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/onboarding');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].message);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      {!pendingVerification ? (
        <>
          <Text className="text-2xl font-bold mb-8 text-center">Create Account</Text>
          
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-4"
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-6"
            placeholder="Password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            className="bg-blue-600 rounded-lg p-4"
            onPress={onSignUpPress}
          >
            <Text className="text-white text-center font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-2xl font-bold mb-4 text-center">Verify Email</Text>
          <Text className="text-gray-600 mb-8 text-center">
            Enter the 6-digit code sent to {emailAddress}
          </Text>
          
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-6 text-center text-xl"
            placeholder="123456"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          
          <TouchableOpacity
            className="bg-green-600 rounded-lg p-4"
            onPress={onPressVerify}
          >
            <Text className="text-white text-center font-semibold">Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
```

#### **Sign In Screen (app/(auth)/sign-in.tsx)**
```tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/dashboard');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].message);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-8 text-center">Welcome Back</Text>
      
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        className="border border-gray-300 rounded-lg p-4 mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        className="bg-blue-600 rounded-lg p-4"
        onPress={onSignInPress}
      >
        <Text className="text-white text-center font-semibold">Sign In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push('/(auth)/sign-up')}
      >
        <Text className="text-blue-600 text-center">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### **3. Authentication Guard & Route Protection**

#### **Authentication Guard Component**
```tsx
// lib/auth/AuthenticationGuard.tsx
import { useAuth } from '@clerk/clerk-expo';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function AuthenticationGuard({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      // Redirect authenticated users away from auth screens
      router.replace('/dashboard');
    } else if (!isSignedIn && !inAuthGroup) {
      // Redirect unauthenticated users to sign-in
      router.replace('/(auth)/sign-in');
    }
  }, [isSignedIn, segments, isLoaded]);

  return <>{children}</>;
}
```

### **4. Secure Token Management**

#### **Token Cache Implementation**
```tsx
// lib/auth/token-cache.ts
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use secure storage for tokens
const createTokenCache = () => {
  return {
    async getToken(key: string) {
      try {
        if (Platform.OS === 'web') {
          return localStorage.getItem(key);
        }
        return SecureStore.getItemAsync(key);
      } catch (err) {
        console.error('Error getting token:', err);
        return null;
      }
    },
    async saveToken(key: string, token: string) {
      try {
        if (Platform.OS === 'web') {
          localStorage.setItem(key, token);
        } else {
          await SecureStore.setItemAsync(key, token);
        }
      } catch (err) {
        console.error('Error saving token:', err);
      }
    },
  };
};

export const tokenCache = createTokenCache();
```

---

## 🇮🇳 **India-Specific Authentication Features**

### **1. SMS OTP Integration**
```tsx
// lib/auth/sms-otp.ts
import { useSignIn } from '@clerk/clerk-expo';

export const useSMSOTP = () => {
  const { signIn } = useSignIn();

  const sendOTP = async (phoneNumber: string) => {
    try {
      // Format Indian phone numbers (+91)
      const formattedNumber = phoneNumber.startsWith('+91') 
        ? phoneNumber 
        : `+91${phoneNumber}`;

      await signIn?.create({
        identifier: formattedNumber,
      });

      await signIn?.prepareFirstFactor({
        strategy: 'phone_code',
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.errors[0].message };
    }
  };

  const verifyOTP = async (code: string) => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      });

      return { success: true, result };
    } catch (error: any) {
      return { success: false, error: error.errors[0].message };
    }
  };

  return { sendOTP, verifyOTP };
};
```

### **2. Biometric Authentication**
```tsx
// lib/auth/biometric-auth.ts
import ReactNativeBiometrics from 'react-native-biometrics';
import { Platform } from 'react-native';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export const BiometricAuth = {
  async isAvailable(): Promise<boolean> {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      return available && (biometryType === 'FaceID' || biometryType === 'Biometrics');
    } catch (error) {
      return false;
    }
  },

  async authenticate(reason: string = 'Authenticate to access AssistantPro'): Promise<boolean> {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: reason,
        cancelButtonText: 'Cancel',
      });
      return success;
    } catch (error) {
      return false;
    }
  },

  async createKeys(): Promise<boolean> {
    try {
      const { publicKey } = await rnBiometrics.createKeys();
      return !!publicKey;
    } catch (error) {
      return false;
    }
  },
};
```

### **3. Device Permissions Integration**
```tsx
// lib/auth/permissions-manager.ts
import { PermissionsAndroid, Alert, Platform } from 'react-native';

export const PermissionsManager = {
  // SMS permissions for financial transaction parsing
  async requestSMSPermissions(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Access Permission',
          message: 'AssistantPro needs SMS access to automatically track your UPI transactions and provide financial insights.',
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
  },

  // Contacts permissions for personal assistant features
  async requestContactsPermissions(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Access Permission',
          message: 'Enable smart contact management and relationship intelligence.',
          buttonPositive: 'Allow',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  },

  // Comprehensive permission request during onboarding
  async requestAllPermissions(): Promise<{ [key: string]: boolean }> {
    const results = {
      sms: await this.requestSMSPermissions(),
      contacts: await this.requestContactsPermissions(),
    };

    return results;
  },
};
```

---

## 🔒 **Advanced Security Implementation**

### **1. Local Data Encryption**
```tsx
// lib/security/encryption.ts
import CryptoJS from 'react-native-crypto-js';
import DeviceInfo from 'react-native-device-info';

export class LocalEncryption {
  private static instance: LocalEncryption;
  private encryptionKey: string;

  constructor() {
    this.encryptionKey = this.generateDeviceKey();
  }

  static getInstance(): LocalEncryption {
    if (!LocalEncryption.instance) {
      LocalEncryption.instance = new LocalEncryption();
    }
    return LocalEncryption.instance;
  }

  private async generateDeviceKey(): Promise<string> {
    const deviceId = await DeviceInfo.getUniqueId();
    const bundleId = DeviceInfo.getBundleId();
    return CryptoJS.SHA256(`${deviceId}-${bundleId}-assistantpro`).toString();
  }

  encryptData(data: any): string {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, this.encryptionKey).toString();
  }

  decryptData<T>(encryptedData: string): T | null {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }
}
```

### **2. Session Management**
```tsx
// lib/auth/session-manager.ts
import { useAuth, useUser } from '@clerk/clerk-expo';
import { LocalEncryption } from '@/lib/security/encryption';

export const useSessionManager = () => {
  const { isLoaded, isSignedIn, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const encryption = LocalEncryption.getInstance();

  const getSecureToken = async (): Promise<string | null> => {
    try {
      return await getToken();
    } catch (error) {
      console.error('Token retrieval failed:', error);
      return null;
    }
  };

  const getUserMetadata = () => {
    if (!user) return null;

    return {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      phone: user.primaryPhoneNumber?.phoneNumber,
      createdAt: user.createdAt,
      lastSignInAt: user.lastSignInAt,
    };
  };

  const encryptAndStoreUserData = async (data: any, key: string) => {
    const encryptedData = encryption.encryptData(data);
    // Store in secure storage using your preferred method
  };

  return {
    isLoaded,
    isSignedIn,
    sessionId,
    user: getUserMetadata(),
    getSecureToken,
    encryptAndStoreUserData,
  };
};
```

---

## 🚀 **Integration with AssistantPro Modules**

### **1. Mudra Finance Module Authentication**
```tsx
// modules/mudra/auth-integration.ts
import { useSessionManager } from '@/lib/auth/session-manager';

export const useMudraAuth = () => {
  const { isSignedIn, getSecureToken } = useSessionManager();

  const authenticateFinancialData = async () => {
    if (!isSignedIn) {
      throw new Error('User must be authenticated for financial data access');
    }

    const token = await getSecureToken();
    return {
      authorized: true,
      token,
      permissions: ['read_sms', 'financial_data'],
    };
  };

  return { authenticateFinancialData };
};
```

### **2. Sikshak Education Module Authentication**
```tsx
// modules/sikshak/auth-integration.ts
export const useSikshakAuth = () => {
  const { user, isSignedIn } = useSessionManager();

  const getEducationalProfile = () => {
    if (!isSignedIn || !user) return null;

    return {
      userId: user.id,
      learningPreferences: {}, // Retrieved from encrypted storage
      culturalContext: 'india', // Default for Indian users
      languagePreference: 'hindi-english',
    };
  };

  return { getEducationalProfile };
};
```

---

## 📋 **Implementation Checklist**

### **Phase 1: Basic Authentication**
- [ ] Install and configure Clerk
- [ ] Implement sign-up/sign-in screens
- [ ] Add email verification
- [ ] Set up authentication guards
- [ ] Test authentication flow

### **Phase 2: India-Specific Features**
- [ ] Implement SMS OTP option
- [ ] Add Hindi language support
- [ ] Configure Indian phone number formats
- [ ] Test with Indian carriers

### **Phase 3: Enhanced Security**
- [ ] Implement biometric authentication
- [ ] Add local data encryption
- [ ] Set up secure token management
- [ ] Configure device permissions

### **Phase 4: Module Integration**
- [ ] Integrate with Mudra finance module
- [ ] Connect with Sikshak education module
- [ ] Implement cross-module authentication
- [ ] Test complete user journey

---

## 🔧 **Troubleshooting & Best Practices**

### **Common Issues**
1. **Token Expiration**: Implement automatic token refresh
2. **Network Connectivity**: Add offline authentication support
3. **Device Compatibility**: Test across various Android versions
4. **Permission Denials**: Graceful handling of rejected permissions

### **Security Best Practices**
1. **Never store sensitive data in plain text**
2. **Use device-specific encryption keys**
3. **Implement proper session timeout**
4. **Regular security audits and updates**
5. **Follow GDPR and Indian data protection laws**

### **Performance Optimization**
1. **Lazy load authentication components**
2. **Cache user sessions securely**
3. **Minimize authentication API calls**
4. **Optimize biometric authentication UX**

---

## 📚 **Additional Resources**

- [Clerk React Native Documentation](https://clerk.dev/docs/quickstarts/expo)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [Indian Mobile App Security Guidelines](https://www.meity.gov.in/)
- [Biometric Authentication Implementation](https://github.com/SelfLender/react-native-biometrics)
- [SMS Permission Handling](https://developer.android.com/guide/topics/permissions/overview)

---

*This authentication system provides a solid foundation for AssistantPro's privacy-first approach while ensuring compliance with Indian regulations and user expectations.*
