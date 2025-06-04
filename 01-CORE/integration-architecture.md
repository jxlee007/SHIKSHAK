# Integration Architecture
## Cross-Module Intelligence & API Design

**Last Updated**: June 4, 2025  
**Architecture Pattern**: Event-Driven + Shared Context  
**Integration Strategy**: Unified AI with Module Specialization

---

## 🏗️ **Integration Overview**

AssistantPro's power comes from its integrated architecture where three specialized modules (Soch, Mudra, Sikshak) share a unified AI foundation while maintaining clear separation of concerns. This document outlines how modules communicate, share context, and provide seamless user experiences.

---

## 🧠 **Core Integration Principles**

### **1. Shared AI Foundation (Soch as Platform)**
```
┌─────────────────────────────────────────────────────────────┐
│                    Soch AI Platform                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Sarvam AI   │  │ Cultural    │  │ Context Manager     │  │
│  │ Integration │  │ Intelligence│  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │ (Shared AI Context)
    ┌─────────────────┼─────────────────┐
    │                 │                 │
┌───▼────┐    ┌──────▼──────┐    ┌─────▼──────┐
│ Mudra  │    │    User     │    │  Sikshak   │
│(Finance)│   │ Interface   │    │(Education) │
└────────┘    └─────────────┘    └────────────┘
```

### **2. Context Sharing Architecture**
```typescript
interface UnifiedAIContext {
  // Core Identity
  tenantId: string;
  userId: string;
  sessionId: string;
  
  // Conversation State
  conversationHistory: Message[];
  currentIntent: Intent;
  lastInteractionTime: Date;
  
  // Cultural Profile
  culturalProfile: {
    primaryLanguage: 'hi' | 'en' | string;
    culturalMarkers: CulturalMarker[];
    formalityLevel: 'formal' | 'casual' | 'intimate';
    regionalContext: RegionalContext;
  };
  
  // Module-Specific Context
  mudraContext?: FinancialContext;
  sikshakContext?: EducationalContext;
  
  // Cross-Module Intelligence
  crossModuleInsights: ModuleInsight[];
  personalityProfile: PersonalityProfile;
}
```

---

## 🔄 **Module Integration Patterns**

### **Pattern 1: AI-Mediated Cross-Module Communication**

```typescript
class CrossModuleOrchestrator {
  async processUserInput(input: UserInput): Promise<AIResponse> {
    // 1. Soch processes the input with full context
    const aiAnalysis = await this.sochAI.analyze(input, this.getFullContext());
    
    // 2. Determine which module(s) should handle the request
    const targetModules = this.determineTargetModules(aiAnalysis);
    
    // 3. Execute module-specific actions
    const moduleResponses = await Promise.all(
      targetModules.map(module => this.executeModuleAction(module, aiAnalysis))
    );
    
    // 4. Soch synthesizes the final response
    return this.sochAI.synthesizeResponse(moduleResponses, this.getFullContext());
  }
  
  private determineTargetModules(analysis: AIAnalysis): Module[] {
    const modules: Module[] = [];
    
    // Financial intent detection
    if (analysis.intent.category === 'financial') {
      modules.push(Module.MUDRA);
    }
    
    // Educational intent detection
    if (analysis.intent.category === 'educational') {
      modules.push(Module.SIKSHAK);
    }
    
    // Cross-module scenarios
    if (analysis.intent.type === 'financial_education') {
      modules.push(Module.MUDRA, Module.SIKSHAK);
    }
    
    return modules;
  }
}
```

### **Pattern 2: Event-Driven Module Communication**

```typescript
// Event system for module coordination
class ModuleEventBus {
  private eventHandlers = new Map<string, EventHandler[]>();
  
  // Mudra publishes financial events
  publishFinancialEvent(event: FinancialEvent): void {
    this.emit('financial.transaction.detected', {
      userId: event.userId,
      transaction: event.transaction,
      culturalContext: event.culturalContext
    });
  }
  
  // Sikshak subscribes to financial events for educational opportunities
  onFinancialEvent(handler: (event: FinancialEvent) => void): void {
    this.on('financial.transaction.detected', async (event) => {
      // Educational opportunity detection
      const educationalTrigger = await this.detectEducationalOpportunity(event);
      if (educationalTrigger) {
        await handler(educationalTrigger);
      }
    });
  }
  
  private async detectEducationalOpportunity(event: FinancialEvent): Promise<EducationalTrigger | null> {
    // Example: High spending detected -> budget education opportunity
    if (event.transaction.amount > event.user.monthlyBudget * 0.1) {
      return {
        type: 'budget_education',
        urgency: 'high',
        context: event,
        suggestedContent: ['budgeting_basics', 'expense_tracking']
      };
    }
    return null;
  }
}
```

---

## 💰 **Mudra-Soch Integration**

### **Financial Intelligence Pipeline**

```typescript
class MudraIntegration {
  constructor(private sochAI: SochAIService) {}
  
  // SMS Transaction Processing with AI
  async processSMSTransaction(sms: SMSMessage): Promise<Transaction | null> {
    // 1. Soch analyzes SMS with cultural context
    const analysis = await this.sochAI.analyzeSMS(sms, {
      language: 'hi',
      context: 'financial',
      bankFormats: this.getBankSMSFormats()
    });
    
    if (!analysis.isFinancial) return null;
    
    // 2. Extract transaction details using AI
    const transaction = await this.extractTransactionDetails(analysis);
    
    // 3. AI-powered categorization with cultural awareness
    const category = await this.sochAI.categorizeTransaction(transaction, {
      culturalContext: await this.getUserCulturalContext(transaction.userId),
      historicalPatterns: await this.getTransactionHistory(transaction.userId)
    });
    
    // 4. Store with enriched context
    return this.storeTransaction({
      ...transaction,
      category,
      culturalMarkers: analysis.culturalMarkers,
      confidence: analysis.confidence
    });
  }
  
  // Voice Financial Commands
  async processVoiceFinancialCommand(audio: AudioBuffer, userId: string): Promise<FinancialResponse> {
    // 1. Soch converts speech to text with financial context
    const transcription = await this.sochAI.speechToText(audio, {
      domain: 'financial',
      language: 'hi',
      vocabulary: this.getFinancialVocabulary()
    });
    
    // 2. Intent detection with cultural understanding
    const intent = await this.sochAI.detectIntent(transcription.text, {
      domain: 'financial',
      culturalContext: await this.getUserCulturalContext(userId)
    });
    
    // 3. Execute financial action
    const result = await this.executeFinancialAction(intent, userId);
    
    // 4. Generate culturally-appropriate response
    const responseText = await this.sochAI.generateResponse(result, {
      responseType: 'financial_confirmation',
      culturalContext: await this.getUserCulturalContext(userId),
      formality: intent.formality
    });
    
    // 5. Convert to speech
    const audioResponse = await this.sochAI.textToSpeech(responseText, {
      language: intent.language,
      emotion: 'helpful',
      speed: 'normal'
    });
    
    return {
      textResponse: responseText,
      audioResponse,
      actionResult: result,
      confidence: intent.confidence
    };
  }
}
```

### **Financial Context Sharing**

```typescript
interface FinancialContext {
  // Current Financial State
  monthlyIncome: number;
  monthlyExpenses: number;
  currentBalance: number;
  
  // Spending Patterns
  topCategories: CategorySpending[];
  spendingTrends: SpendingTrend[];
  budgetStatus: BudgetStatus;
  
  // Cultural Financial Behavior
  festivalSpending: FestivalSpending[];
  familyFinancialGoals: FinancialGoal[];
  investmentPreferences: InvestmentPreference[];
  
  // AI Learning Data
  categoryConfidence: Record<string, number>;
  merchantMappings: MerchantMapping[];
  languagePreferences: LanguagePreference[];
}
```

---

## 📚 **Sikshak-Soch Integration**

### **Educational Intelligence Pipeline**

```typescript
class SikshakIntegration {
  constructor(private sochAI: SochAIService, private mudraService: MudraService) {}
  
  // Adaptive Learning with Cultural Context
  async createPersonalizedLesson(topic: string, userId: string): Promise<LessonPlan> {
    // 1. Get user's cultural and educational context
    const context = await this.getUserContext(userId);
    
    // 2. AI generates culturally-appropriate content
    const lessonContent = await this.sochAI.generateEducationalContent(topic, {
      ageGroup: context.ageGroup,
      culturalBackground: context.culturalProfile,
      learningStyle: context.learningPreferences,
      language: context.primaryLanguage
    });
    
    // 3. Integrate real financial data for practical examples
    const financialExamples = await this.getRelevantFinancialExamples(userId, topic);
    
    // 4. Create interactive lesson with voice support
    return {
      content: lessonContent,
      practicalExamples: financialExamples,
      voiceInstructions: await this.generateVoiceInstructions(lessonContent, context),
      culturallyRelevantMetaphors: await this.generateCulturalMetaphors(topic, context),
      assessmentQuestions: await this.generateAssessment(topic, context)
    };
  }
  
  // Financial Literacy with Real Data
  async createFinancialLiteracyLesson(userId: string): Promise<FinancialLiteracyLesson> {
    // 1. Get user's actual financial data (anonymized)
    const financialData = await this.mudraService.getAnonymizedFinancialSummary(userId);
    
    // 2. AI analyzes spending patterns for educational opportunities
    const learningOpportunities = await this.sochAI.identifyLearningOpportunities(financialData, {
      culturalContext: await this.getUserCulturalContext(userId),
      ageGroup: await this.getUserAgeGroup(userId)
    });
    
    // 3. Generate practical lessons using real data
    const lessons = await Promise.all(
      learningOpportunities.map(opportunity => 
        this.generatePracticalLesson(opportunity, financialData)
      )
    );
    
    return {
      personalizedLessons: lessons,
      realDataInsights: financialData.insights,
      actionableAdvice: await this.generateActionableAdvice(financialData),
      culturallyRelevantTips: await this.generateCulturalFinancialTips(userId)
    };
  }
}
```

---

## 🔄 **Cross-Module Scenarios**

### **Scenario 1: Voice Financial Query with Educational Response**

```typescript
// User: "इस महीने मैंने कितना खर्च किया?" (How much did I spend this month?)
async handleFinancialEducationQuery(query: VoiceQuery): Promise<IntegratedResponse> {
  // 1. Soch processes the voice input
  const analysis = await this.sochAI.analyzeVoiceQuery(query, {
    expectedDomains: ['financial', 'educational'],
    culturalContext: query.userContext.culturalProfile
  });
  
  // 2. Mudra provides financial data
  const financialData = await this.mudraService.getMonthlySpending(query.userId);
  
  // 3. Sikshak identifies educational opportunity
  const educationalInsight = await this.sikshakService.analyzeSpendingForEducation(
    financialData, 
    query.userContext
  );
  
  // 4. Soch synthesizes integrated response
  const response = await this.sochAI.generateIntegratedResponse({
    financial: financialData,
    educational: educationalInsight,
    culturalContext: query.userContext.culturalProfile,
    responseStyle: 'helpful_teacher'
  });
  
  return {
    textResponse: response.text,
    audioResponse: await this.sochAI.textToSpeech(response.text, query.userContext),
    visualData: financialData.charts,
    educationalTips: educationalInsight.tips,
    followUpQuestions: response.followUp
  };
}
```

### **Scenario 2: Educational Session with Financial Planning**

```typescript
// During a financial literacy lesson, use real expense data
async integrateFinancialDataInEducation(lessonId: string, userId: string): Promise<EnhancedLesson> {
  // 1. Get base educational content
  const baseLesson = await this.sikshakService.getLesson(lessonId);
  
  // 2. Get relevant financial data from Mudra
  const financialContext = await this.mudraService.getEducationalFinancialContext(userId);
  
  // 3. Soch creates personalized examples
  const personalizedExamples = await this.sochAI.createPersonalizedExamples(
    baseLesson.topic,
    financialContext,
    {
      culturalContext: await this.getUserCulturalContext(userId),
      simplificationLevel: baseLesson.difficulty
    }
  );
  
  // 4. Generate interactive scenarios
  const interactiveScenarios = await this.generateInteractiveScenarios(
    baseLesson,
    financialContext,
    personalizedExamples
  );
  
  return {
    ...baseLesson,
    personalizedExamples,
    interactiveScenarios,
    realDataInsights: financialContext.insights,
    practicalExercises: await this.generatePracticalExercises(financialContext)
  };
}
```

---

## 🔌 **API Integration Architecture**

### **Internal API Design**

```typescript
// Unified internal API for module communication
class InternalAPIGateway {
  private modules = {
    soch: new SochAIService(),
    mudra: new MudraService(),
    sikshak: new SikshakService()
  };
  
  // Cross-module request handling
  async handleCrossModuleRequest(request: CrossModuleRequest): Promise<any> {
    const { sourceModule, targetModule, action, context } = request;
    
    // Security check: ensure modules are authorized to communicate
    if (!this.isAuthorizedCommunication(sourceModule, targetModule, action)) {
      throw new Error('Unauthorized cross-module communication');
    }
    
    // Context enrichment with AI
    const enrichedContext = await this.enrichContext(context);
    
    // Execute target module action
    const result = await this.modules[targetModule].executeAction(action, enrichedContext);
    
    // Log for analytics and debugging
    await this.logCrossModuleInteraction(request, result);
    
    return result;
  }
  
  // AI-powered context enrichment
  private async enrichContext(context: any): Promise<EnrichedContext> {
    return {
      ...context,
      culturalContext: await this.soch.getCulturalContext(context.userId),
      conversationHistory: await this.soch.getRecentConversation(context.userId),
      crossModuleInsights: await this.getCrossModuleInsights(context.userId)
    };
  }
}
```

### **External API Endpoints**

```typescript
// RESTful API for external integrations
@Controller('/api/v1')
export class IntegratedAPIController {
  
  @Post('/ai/unified-query')
  async processUnifiedQuery(@Body() request: UnifiedQueryRequest): Promise<UnifiedResponse> {
    // Process query across all relevant modules
    const response = await this.orchestrator.processUnifiedQuery(request);
    return response;
  }
  
  @Get('/context/:userId')
  async getUserContext(@Param('userId') userId: string): Promise<UnifiedContext> {
    // Get complete user context across all modules
    return this.contextManager.getUnifiedContext(userId);
  }
  
  @Post('/webhooks/financial-education')
  async handleFinancialEducationWebhook(@Body() webhook: FinancialWebhook): Promise<void> {
    // Trigger educational content based on financial events
    await this.sikshakService.triggerEducationalOpportunity(webhook);
  }
}
```

---

## 📊 **Performance & Monitoring**

### **Cross-Module Performance Monitoring**

```typescript
class IntegrationMonitoring {
  private metrics = {
    crossModuleLatency: new prometheus.Histogram({
      name: 'cross_module_request_duration_seconds',
      labelNames: ['source_module', 'target_module', 'action']
    }),
    
    contextEnrichmentTime: new prometheus.Histogram({
      name: 'context_enrichment_duration_seconds',
      labelNames: ['user_id', 'context_type']
    }),
    
    aiSynthesisAccuracy: new prometheus.Gauge({
      name: 'ai_response_synthesis_accuracy',
      labelNames: ['response_type', 'cultural_context']
    })
  };
  
  async monitorCrossModuleRequest(request: CrossModuleRequest, handler: Function): Promise<any> {
    const startTime = Date.now();
    
    try {
      const result = await handler();
      
      // Record success metrics
      this.metrics.crossModuleLatency
        .labels(request.sourceModule, request.targetModule, request.action)
        .observe((Date.now() - startTime) / 1000);
      
      return result;
    } catch (error) {
      // Record error metrics
      this.recordError(request, error);
      throw error;
    }
  }
}
```

---

## 🎯 **Integration Benefits**

### **For Users**
1. **Seamless Experience**: Single AI that understands all their needs
2. **Contextual Intelligence**: AI remembers across all interactions
3. **Cultural Consistency**: Same cultural understanding everywhere
4. **Practical Learning**: Education using real personal data

### **For Developers**
1. **Shared Infrastructure**: Single AI platform for all features
2. **Consistent APIs**: Unified integration patterns
3. **Scalable Architecture**: Easy to add new modules
4. **Rich Context**: Deep user understanding across modules

### **For Business**
1. **Reduced Costs**: Shared AI infrastructure
2. **Better User Retention**: Integrated experience increases stickiness
3. **Data Insights**: Cross-module analytics and intelligence
4. **Faster Feature Development**: Leverage existing AI capabilities

---

**Next Steps**: See [Feature Implementation](../02-FEATURES/) for module-specific integration details.
