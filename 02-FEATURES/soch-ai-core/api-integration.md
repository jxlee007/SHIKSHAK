# Soch AI Core - API Integration
## Complete Sarvam AI Platform Integration

**Last Updated**: June 4, 2025  
**Status**: ✅ Production Ready  
**Integration Level**: Complete API Suite with 7 Cookbooks

---

## 🚀 **Sarvam AI Integration Overview**

Soch leverages the complete Sarvam AI platform to provide culturally-aware AI capabilities across all AssistantPro modules. This integration includes all major Sarvam AI models optimized for Indian languages and cultural contexts.

### **Integrated Models & APIs**

| Model | Purpose | Status | Integration |
|-------|---------|--------|-------------|
| **Saarika** | Speech-to-Text (Hinglish) | ✅ Ready | Real-time & Batch |
| **Saaras** | Speech-to-Text with Translation | ✅ Ready | Cross-language support |
| **Bulbul** | Text-to-Speech (Multiple voices) | ✅ Ready | Natural voice generation |
| **Mayura** | Translation (22+ languages) | ✅ Ready | Multi-language support |
| **Sarvam-1** | Chat Completions (GPT-style) | ✅ Ready | Conversational AI |
| **Language Detection** | Automatic language identification | ✅ Ready | Multi-language routing |
| **Transliteration** | Script conversion support | ✅ Ready | Hindi-English scripts |

---

## 🔧 **API Integration Implementation**

### **1. Authentication & Configuration**

```typescript
// Sarvam AI Client Configuration
import { SarvamAIClient } from '@assistantpro/sarvam-client';

export class SarvamIntegration {
  private client: SarvamAIClient;
  
  constructor() {
    this.client = new SarvamAIClient({
      apiKey: process.env.SARVAM_AI_API_KEY,
      baseURL: 'https://api.sarvam.ai',
      timeout: 30000,
      retries: 3,
      rateLimiting: {
        requestsPerMinute: 100,
        strategy: 'sliding-window'
      }
    });
  }
  
  // Health check and connection validation
  async validateConnection(): Promise<boolean> {
    try {
      const response = await this.client.get('/models');
      return response.status === 200;
    } catch (error) {
      console.error('Sarvam AI connection failed:', error);
      return false;
    }
  }
}
```

### **2. Speech-to-Text Integration (Saarika/Saaras)**

```typescript
// Speech-to-Text with cultural context awareness
export class SpeechToTextService {
  private sarvam: SarvamAIClient;
  
  async transcribeAudio(
    audioBuffer: Buffer, 
    options: STTOptions = {}
  ): Promise<TranscriptionResult> {
    const {
      language = 'hi',
      model = 'saarika',
      enableTranslation = false,
      culturalContext = null
    } = options;
    
    try {
      // Choose appropriate model based on requirements
      const selectedModel = enableTranslation ? 'saaras' : 'saarika';
      
      const response = await this.sarvam.post('/speech-to-text', {
        audio: audioBuffer.toString('base64'),
        language,
        model: selectedModel,
        enable_timestamps: true,
        enable_word_confidence: true,
        cultural_context: culturalContext
      });
      
      return {
        text: response.transcript,
        language: response.detected_language,
        confidence: response.confidence,
        words: response.words,
        translation: enableTranslation ? response.translation : null,
        culturalMarkers: this.extractCulturalMarkers(response.transcript)
      };
    } catch (error) {
      throw new SarvamAPIError('Speech-to-text failed', error);
    }
  }
  
  // Real-time streaming transcription
  async startRealtimeTranscription(
    stream: AudioStream,
    callback: (result: PartialTranscription) => void
  ): Promise<void> {
    const websocket = await this.sarvam.createWebSocket('/speech-to-text/stream');
    
    websocket.on('message', (data) => {
      const result = JSON.parse(data);
      if (result.type === 'partial') {
        callback({
          text: result.transcript,
          confidence: result.confidence,
          isFinal: result.is_final
        });
      }
    });
    
    stream.on('data', (chunk) => {
      websocket.send(chunk);
    });
  }
}
```

### **3. Text-to-Speech Integration (Bulbul)**

```typescript
// Text-to-Speech with emotional intelligence
export class TextToSpeechService {
  private sarvam: SarvamAIClient;
  
  async synthesizeSpeech(
    text: string,
    options: TTSOptions = {}
  ): Promise<AudioResult> {
    const {
      language = 'hi',
      voice = 'female',
      emotion = 'neutral',
      speed = 1.0,
      culturalContext = null
    } = options;
    
    // Enhance text with cultural markers if needed
    const enhancedText = await this.enhanceTextForCulture(text, culturalContext);
    
    try {
      const response = await this.sarvam.post('/text-to-speech', {
        text: enhancedText,
        language,
        model: 'bulbul',
        voice_config: {
          gender: voice,
          emotion,
          speed,
          pitch: this.calculateOptimalPitch(emotion, culturalContext)
        },
        output_format: 'wav',
        sample_rate: 22050
      });
      
      return {
        audioBuffer: Buffer.from(response.audio_base64, 'base64'),
        duration: response.duration,
        sampleRate: response.sample_rate,
        emotion: emotion,
        confidence: response.synthesis_confidence
      };
    } catch (error) {
      throw new SarvamAPIError('Text-to-speech failed', error);
    }
  }
  
  // Cultural text enhancement for natural speech
  private async enhanceTextForCulture(
    text: string, 
    culturalContext: CulturalContext | null
  ): Promise<string> {
    if (!culturalContext) return text;
    
    // Add appropriate honorifics and cultural expressions
    const enhanced = await this.sarvam.post('/text-enhancement', {
      text,
      cultural_context: culturalContext,
      enhancement_type: 'speech_natural'
    });
    
    return enhanced.enhanced_text;
  }
}
```

### **4. Translation Integration (Mayura)**

```typescript
// Multi-language translation with cultural awareness
export class TranslationService {
  private sarvam: SarvamAIClient;
  
  async translateText(
    text: string,
    targetLanguage: string,
    options: TranslationOptions = {}
  ): Promise<TranslationResult> {
    const {
      sourceLanguage = 'auto',
      culturalContext = null,
      domain = 'general',
      formalityLevel = 'neutral'
    } = options;
    
    try {
      const response = await this.sarvam.post('/translate', {
        text,
        source_language: sourceLanguage,
        target_language: targetLanguage,
        model: 'mayura',
        cultural_adaptation: {
          context: culturalContext,
          domain: domain,
          formality: formalityLevel
        },
        preserve_formatting: true,
        include_alternatives: true
      });
      
      return {
        translatedText: response.translated_text,
        sourceLanguage: response.detected_source_language,
        confidence: response.confidence,
        alternatives: response.alternatives,
        culturalAdaptations: response.cultural_notes
      };
    } catch (error) {
      throw new SarvamAPIError('Translation failed', error);
    }
  }
  
  // Batch translation for efficiency
  async translateBatch(
    texts: string[],
    targetLanguage: string,
    options: TranslationOptions = {}
  ): Promise<TranslationResult[]> {
    const batchSize = 50; // API limit
    const results: TranslationResult[] = [];
    
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(text => this.translateText(text, targetLanguage, options))
      );
      results.push(...batchResults);
    }
    
    return results;
  }
}
```

### **5. Chat Completions Integration (Sarvam-1)**

```typescript
// Conversational AI with cultural intelligence
export class ChatCompletionService {
  private sarvam: SarvamAIClient;
  
  async generateChatCompletion(
    messages: ChatMessage[],
    options: ChatOptions = {}
  ): Promise<ChatCompletionResult> {
    const {
      model = 'sarvam-1',
      temperature = 0.7,
      maxTokens = 1000,
      culturalContext = null,
      domain = 'general',
      responseStyle = 'helpful'
    } = options;
    
    // Prepare messages with cultural context
    const enhancedMessages = await this.enhanceMessagesWithCulture(
      messages, 
      culturalContext
    );
    
    try {
      const response = await this.sarvam.post('/chat/completions', {
        model,
        messages: enhancedMessages,
        temperature,
        max_tokens: maxTokens,
        cultural_parameters: {
          context: culturalContext,
          domain: domain,
          response_style: responseStyle,
          language_preference: culturalContext?.primaryLanguage || 'hi'
        },
        stream: false
      });
      
      return {
        message: response.choices[0].message.content,
        finishReason: response.choices[0].finish_reason,
        usage: response.usage,
        culturalAdherence: response.cultural_score,
        confidence: response.confidence
      };
    } catch (error) {
      throw new SarvamAPIError('Chat completion failed', error);
    }
  }
  
  // Streaming chat for real-time responses
  async streamChatCompletion(
    messages: ChatMessage[],
    options: ChatOptions,
    onChunk: (chunk: ChatChunk) => void
  ): Promise<void> {
    const response = await this.sarvam.post('/chat/completions', {
      ...options,
      stream: true
    });
    
    const stream = response.body;
    stream.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          onChunk({
            content: data.choices[0]?.delta?.content || '',
            done: data.choices[0]?.finish_reason !== null
          });
        }
      });
    });
  }
}
```

---

## 🔄 **Integration Orchestration**

### **Unified Sarvam AI Service**

```typescript
// Main service orchestrating all Sarvam AI capabilities
export class SochAIService {
  private stt: SpeechToTextService;
  private tts: TextToSpeechService;
  private translation: TranslationService;
  private chat: ChatCompletionService;
  private languageDetection: LanguageDetectionService;
  
  constructor() {
    this.stt = new SpeechToTextService();
    this.tts = new TextToSpeechService();
    this.translation = new TranslationService();
    this.chat = new ChatCompletionService();
    this.languageDetection = new LanguageDetectionService();
  }
  
  // Complete voice interaction pipeline
  async processVoiceInteraction(
    audioInput: Buffer,
    userContext: UserContext
  ): Promise<VoiceInteractionResult> {
    try {
      // 1. Speech to text
      const transcription = await this.stt.transcribeAudio(audioInput, {
        language: userContext.preferredLanguage,
        culturalContext: userContext.culturalProfile
      });
      
      // 2. Language detection and adaptation
      const detectedLanguage = await this.languageDetection.detectLanguage(
        transcription.text
      );
      
      // 3. Generate AI response
      const chatResponse = await this.chat.generateChatCompletion(
        [{ role: 'user', content: transcription.text }],
        {
          culturalContext: userContext.culturalProfile,
          domain: this.inferDomain(transcription.text),
          responseStyle: this.determineResponseStyle(userContext)
        }
      );
      
      // 4. Convert response to speech
      const audioResponse = await this.tts.synthesizeSpeech(
        chatResponse.message,
        {
          language: detectedLanguage.primaryLanguage,
          emotion: this.determineEmotion(chatResponse.message),
          culturalContext: userContext.culturalProfile
        }
      );
      
      return {
        transcription: transcription.text,
        response: chatResponse.message,
        audioResponse: audioResponse.audioBuffer,
        detectedLanguage: detectedLanguage.primaryLanguage,
        confidence: Math.min(transcription.confidence, chatResponse.confidence),
        culturalAdherence: chatResponse.culturalAdherence
      };
    } catch (error) {
      throw new SochProcessingError('Voice interaction failed', error);
    }
  }
  
  // Cross-module intelligence coordination
  async coordinateModuleResponse(
    query: string,
    targetModules: string[],
    userContext: UserContext
  ): Promise<CoordinatedResponse> {
    // Analyze query intent across modules
    const intentAnalysis = await this.analyzeMultiModuleIntent(query, targetModules);
    
    // Generate coordinated response
    const response = await this.chat.generateChatCompletion(
      [{ role: 'user', content: query }],
      {
        culturalContext: userContext.culturalProfile,
        domain: 'multi_module',
        modules: targetModules,
        coordination_strategy: intentAnalysis.coordinationStrategy
      }
    );
    
    return {
      unifiedResponse: response.message,
      moduleActions: intentAnalysis.requiredActions,
      coordinationStrategy: intentAnalysis.coordinationStrategy,
      confidence: response.confidence
    };
  }
}
```

---

## 📊 **Performance Optimization**

### **Caching Strategy**

```typescript
// Intelligent caching for Sarvam AI responses
export class SarvamCacheManager {
  private cache: Redis;
  
  async getCachedTranslation(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<TranslationResult | null> {
    const key = `translation:${this.hashText(text)}:${sourceLang}:${targetLang}`;
    const cached = await this.cache.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async cacheTranslation(
    text: string,
    sourceLang: string,
    targetLang: string,
    result: TranslationResult
  ): Promise<void> {
    const key = `translation:${this.hashText(text)}:${sourceLang}:${targetLang}`;
    // Cache translations for 7 days
    await this.cache.setex(key, 604800, JSON.stringify(result));
  }
  
  // Smart caching based on content type
  private getCacheTTL(contentType: string): number {
    const ttlMap = {
      'translation': 604800,    // 7 days
      'tts': 86400,            // 1 day
      'chat_general': 3600,    // 1 hour
      'chat_personal': 300     // 5 minutes
    };
    return ttlMap[contentType] || 3600;
  }
}
```

### **Rate Limiting & Error Handling**

```typescript
// Robust rate limiting and error handling
export class SarvamRateLimiter {
  private limits = {
    'speech-to-text': { requests: 100, window: 60000 },
    'text-to-speech': { requests: 50, window: 60000 },
    'translation': { requests: 200, window: 60000 },
    'chat': { requests: 30, window: 60000 }
  };
  
  async checkRateLimit(endpoint: string, tenantId: string): Promise<boolean> {
    const key = `rate_limit:${endpoint}:${tenantId}`;
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, this.limits[endpoint].window / 1000);
    }
    
    return current <= this.limits[endpoint].requests;
  }
  
  // Exponential backoff for retries
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt < maxRetries - 1) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
}
```

---

## 🔍 **Monitoring & Analytics**

### **API Usage Monitoring**

```typescript
// Comprehensive monitoring for Sarvam AI usage
export class SarvamMonitoring {
  private metrics = {
    apiCalls: new prometheus.Counter({
      name: 'sarvam_api_calls_total',
      labelNames: ['endpoint', 'tenant_id', 'status']
    }),
    
    responseTime: new prometheus.Histogram({
      name: 'sarvam_api_response_time_seconds',
      labelNames: ['endpoint', 'model']
    }),
    
    culturalAccuracy: new prometheus.Gauge({
      name: 'sarvam_cultural_accuracy_score',
      labelNames: ['language', 'domain']
    })
  };
  
  async trackAPICall(
    endpoint: string,
    tenantId: string,
    duration: number,
    status: number
  ): Promise<void> {
    this.metrics.apiCalls.labels(endpoint, tenantId, status.toString()).inc();
    this.metrics.responseTime.labels(endpoint, 'sarvam').observe(duration);
  }
  
  async generateUsageReport(tenantId: string, period: string): Promise<UsageReport> {
    const usage = await this.getUsageMetrics(tenantId, period);
    
    return {
      totalRequests: usage.totalCalls,
      byEndpoint: usage.endpointBreakdown,
      costs: await this.calculateCosts(usage),
      culturalPerformance: usage.culturalMetrics,
      recommendations: await this.generateOptimizationRecommendations(usage)
    };
  }
}
```

---

## 🎯 **Next Steps for Implementation**

### **Phase 1: Core Integration (Complete)**
- ✅ All 7 Sarvam AI models integrated
- ✅ Authentication and error handling
- ✅ Basic caching and rate limiting
- ✅ Cultural context awareness

### **Phase 2: Optimization & Monitoring**
- 📋 Advanced caching strategies
- 📋 Comprehensive monitoring dashboard
- 📋 Performance optimization
- 📋 Cost optimization features

### **Phase 3: Advanced Features**
- 📋 Custom model fine-tuning
- 📋 Advanced cultural adaptation
- 📋 Multi-modal AI interactions
- 📋 Edge computing deployment

---

**Implementation Guide**: See [Cross-Module Intelligence](./cross-module-intelligence.md) for integration with Mudra and Sikshak modules.
