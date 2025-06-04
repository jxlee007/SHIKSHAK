# Sarvam AI API Reference - AssistantPro Integration

## Overview
Complete API reference for integrating Sarvam AI's Indian language AI platform with AssistantPro. This guide covers all endpoints, authentication, error handling, and best practices for building India's privacy-first AI assistant.

## Authentication

### API Subscription Key
All Sarvam AI endpoints require authentication using an API subscription key obtained from the [Sarvam Dashboard](https://dashboard.sarvam.ai).

```bash
# Header format for all requests
api-subscription-key: YOUR_API_SUBSCRIPTION_KEY
```

### Best Practices
- **Store securely**: Use environment variables, never hardcode in client-side code
- **Monitor usage**: Check credit utilization in dashboard regularly
- **Environment separation**: Use different keys for development/production

### Setup Examples

<details>
<summary>Python SDK</summary>

```python
from sarvamai import SarvamAI

# Initialize client
client = SarvamAI(
    api_subscription_key="YOUR_API_SUBSCRIPTION_KEY"
)

# Example usage
response = client.text.translate(
    input="Hello, how are you?",
    source_language_code="auto",
    target_language_code="hi-IN",
    speaker_gender="Male"
)
```
</details>

<details>
<summary>JavaScript SDK</summary>

```javascript
import { SarvamAIClient } from "sarvamai";

// Initialize client
const client = new SarvamAIClient({ 
    apiSubscriptionKey: "YOUR_API_SUBSCRIPTION_KEY" 
});

// Example usage
await client.text.translate({
    input: "Hello, how are you?",
    source_language_code: "auto",
    target_language_code: "hi-IN"
});
```
</details>

<details>
<summary>cURL</summary>

```bash
curl -X POST "https://api.sarvam.ai/translate" \
  -H "api-subscription-key: YOUR_API_SUBSCRIPTION_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "input": "Hello, how are you?",
    "source_language_code": "auto",
    "target_language_code": "hi-IN"
  }'
```
</details>

## Core API Endpoints

### 1. Chat Completions API (Sarvam-M Model)

**Endpoint:** `https://api.sarvam.ai/v1/chat/completions`

#### Features
- **Model**: Sarvam-M (24B parameter model)
- **Languages**: Hindi, English + 6 regional Indian languages
- **Cultural Context**: Built for Indian cultural understanding
- **Use Case**: Conversational AI for Soch AI Hub

#### Request Format
```javascript
{
  "model": "sarvam-m",
  "messages": [
    {"role": "system", "content": "You are a helpful AI assistant for India."},
    {"role": "user", "content": "मुझे दिल्ली की जानकारी चाहिए"}
  ],
  "temperature": 0.7,
  "max_tokens": 500,
  "top_p": 1.0
}
```

#### Implementation Examples

<details>
<summary>Python Implementation</summary>

```python
import requests
import os

# API Configuration
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")
SARVAM_API_URL = "https://api.sarvam.ai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {SARVAM_API_KEY}",
    "Content-Type": "application/json",
}

def chat_with_sarvam(user_message, system_prompt="You are a helpful AI assistant."):
    payload = {
        "model": "sarvam-m",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 500,
        "top_p": 1.0
    }
    
    response = requests.post(SARVAM_API_URL, headers=headers, json=payload)
    return response.json()

# Usage for AssistantPro
system_prompt = """You are AssistantPro, a privacy-first AI assistant built for India. 
You understand Hindi, English, and regional languages. Respond with cultural sensitivity 
and awareness of Indian contexts."""

result = chat_with_sarvam("मैं अपने पैसों का बेहतर प्रबंधन कैसे करूं?", system_prompt)
```
</details>

<details>
<summary>React Native Implementation</summary>

```javascript
// AssistantPro Chat Service
class SochAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.sarvam.ai/v1/chat/completions';
  }

  async sendMessage(userMessage, language = 'hi-IN') {
    const systemPrompt = this.getSystemPrompt(language);
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'sarvam-m',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Soch AI Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  getSystemPrompt(language) {
    const prompts = {
      'hi-IN': 'आप AssistantPro हैं, भारत के लिए बनाया गया एक निजता-प्राथमिक AI सहायक।',
      'en-IN': 'You are AssistantPro, a privacy-first AI assistant built for India.',
      'ta-IN': 'நீங்கள் AssistantPro, இந்தியாவிற்காக உருவாக்கப்பட்ட தனியுரிமை-முதல் AI உதவியாளர்.'
    };
    return prompts[language] || prompts['en-IN'];
  }
}

export default SochAIService;
```
</details>

### 2. Speech-to-Text API (Saarika Model)

**Endpoint:** `https://api.sarvam.ai/speech-to-text`

#### Features
- **Model**: Saarika v2 (High accuracy for Indian languages)
- **Languages**: Hindi, English, Tamil, Telugu, Bengali, Gujarati, Marathi, Kannada
- **Audio Formats**: WAV, MP3 (up to 30MB)
- **Features**: Language auto-detection, timestamps, high accuracy

#### Request Format
```javascript
// Form data for file upload
{
  "model": "saarika:v2",
  "language_code": "hi-IN", // or "unknown" for auto-detection
  "file": audio_file, // WAV/MP3 file
  "with_timestamps": false
}
```

#### Implementation Examples

<details>
<summary>Python Implementation</summary>

```python
import requests
import os

def transcribe_audio(audio_file_path, language_code="hi-IN"):
    """
    Transcribe audio using Saarika model for AssistantPro voice commands
    """
    api_url = "https://api.sarvam.ai/speech-to-text"
    
    headers = {
        "api-subscription-key": os.getenv("SARVAM_API_KEY")
    }
    
    data = {
        "language_code": language_code,
        "model": "saarika:v2",
        "with_timestamps": False
    }
    
    with open(audio_file_path, "rb") as audio_file:
        files = {"file": audio_file}
        response = requests.post(api_url, headers=headers, data=data, files=files)
    
    if response.status_code == 200:
        result = response.json()
        return result["transcript"]
    else:
        raise Exception(f"Transcription failed: {response.text}")

# Usage in AssistantPro voice interface
transcript = transcribe_audio("user_voice_command.wav", "hi-IN")
print(f"User said: {transcript}")
```
</details>

<details>
<summary>React Native Implementation</summary>

```javascript
// Voice recognition service for AssistantPro
import { SarvamAIClient } from "sarvamai";
import RNFS from 'react-native-fs';

class VoiceRecognitionService {
  constructor(apiKey) {
    this.client = new SarvamAIClient({ apiSubscriptionKey: apiKey });
  }

  async transcribeAudio(audioFilePath, languageCode = "hi-IN") {
    try {
      // Read audio file
      const audioBuffer = await RNFS.readFile(audioFilePath, 'base64');
      const buffer = Buffer.from(audioBuffer, 'base64');
      
      // Create file object
      const fileName = audioFilePath.split('/').pop();
      const mimeType = fileName.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav';
      const file = new File([buffer], fileName, { type: mimeType });

      // Transcribe using Saarika
      const response = await this.client.speechToText.transcribe(file, {
        model: "saarika:v2",
        language_code: languageCode === "auto" ? "unknown" : languageCode,
        with_timestamps: false
      });

      return {
        transcript: response.transcript,
        language: response.language_code,
        confidence: response.confidence || 1.0
      };
    } catch (error) {
      console.error('Voice transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  // Auto-detect language for multilingual users
  async transcribeWithAutoDetection(audioFilePath) {
    return this.transcribeAudio(audioFilePath, "auto");
  }
}

export default VoiceRecognitionService;
```
</details>

### 3. Text-to-Speech API (Bulbul Model)

**Endpoint:** `https://api.sarvam.ai/text-to-speech`

#### Features
- **Model**: Bulbul (Natural Indian language speech synthesis)
- **Languages**: Hindi, English, Tamil, Telugu, Bengali, Gujarati, Marathi, Kannada
- **Output**: High-quality audio files
- **Voices**: Multiple voice options per language

#### Request Format
```javascript
{
  "input": "नमस्ते, मैं AssistantPro हूं",
  "target_language_code": "hi-IN",
  "speaker": "meera", // Voice selection
  "pitch": 0,
  "pace": 1.0,
  "loudness": 1.0,
  "speech_sample_rate": 8000,
  "enable_preprocessing": true,
  "model": "bulbul:v1"
}
```

#### Implementation Examples

<details>
<summary>Python Implementation</summary>

```python
import requests
import os
from io import BytesIO

def text_to_speech(text, language_code="hi-IN", speaker="meera"):
    """
    Convert text to speech using Bulbul model for AssistantPro responses
    """
    api_url = "https://api.sarvam.ai/text-to-speech"
    
    headers = {
        "api-subscription-key": os.getenv("SARVAM_API_KEY"),
        "Content-Type": "application/json"
    }
    
    payload = {
        "input": text,
        "target_language_code": language_code,
        "speaker": speaker,
        "pitch": 0,
        "pace": 1.0,
        "loudness": 1.0,
        "speech_sample_rate": 8000,
        "enable_preprocessing": True,
        "model": "bulbul:v1"
    }
    
    response = requests.post(api_url, headers=headers, json=payload)
    
    if response.status_code == 200:
        # Save audio file
        audio_content = response.content
        with open("assistant_response.wav", "wb") as audio_file:
            audio_file.write(audio_content)
        return "assistant_response.wav"
    else:
        raise Exception(f"TTS failed: {response.text}")

# Usage in AssistantPro
audio_file = text_to_speech("आपका स्वागत है AssistantPro में", "hi-IN")
```
</details>

### 4. Translation API (Mayura Model)

**Endpoint:** `https://api.sarvam.ai/translate`

#### Features
- **Model**: Mayura (Indian language translation specialist)
- **Auto-detection**: Automatic source language detection
- **Cultural Context**: Preserves Indian cultural nuances
- **Gender Awareness**: Gender-specific translations

#### Request Format
```javascript
{
  "input": "Hello, how can I help you today?",
  "source_language_code": "auto", // or specific code like "en-IN"
  "target_language_code": "hi-IN",
  "speaker_gender": "Male", // Optional: for gender-aware translation
  "mode": "formal", // Optional: formal/informal tone
  "model": "mayura:v1"
}
```

#### Implementation Examples

<details>
<summary>Python Implementation</summary>

```python
import requests
import os

def translate_text(text, target_language, source_language="auto", gender="Male"):
    """
    Translate text using Mayura model for AssistantPro multilingual support
    """
    api_url = "https://api.sarvam.ai/translate"
    
    headers = {
        "api-subscription-key": os.getenv("SARVAM_API_KEY"),
        "Content-Type": "application/json"
    }
    
    payload = {
        "input": text,
        "source_language_code": source_language,
        "target_language_code": target_language,
        "speaker_gender": gender,
        "model": "mayura:v1"
    }
    
    response = requests.post(api_url, headers=headers, json=payload)
    
    if response.status_code == 200:
        result = response.json()
        return {
            "translated_text": result["translated_text"],
            "detected_language": result.get("detected_language"),
            "confidence": result.get("confidence", 1.0)
        }
    else:
        raise Exception(f"Translation failed: {response.text}")

# Usage for multilingual AssistantPro
english_text = "Welcome to your personal finance assistant"
hindi_translation = translate_text(english_text, "hi-IN")
print(hindi_translation["translated_text"])
# Output: "आपके व्यक्तिगत वित्त सहायक में आपका स्वागत है"
```
</details>

### 5. Speech-to-Text Translation API (Saaras Model)

**Endpoint:** `https://api.sarvam.ai/speech-to-text-translate`

#### Features
- **Model**: Saaras v2 (Speech recognition + translation in one step)
- **Direct Translation**: Convert speech to text in different language
- **Efficiency**: Single API call for speech translation
- **Domain Optimization**: Context-aware processing

#### Request Format
```javascript
// Form data for file upload
{
  "model": "saaras:v2",
  "file": audio_file, // WAV/MP3 file
  "prompt": "Medical consultation", // Optional: domain context
  "with_timestamps": false
}
```

## Language Support Matrix

| Language | Code | STT (Saarika) | TTS (Bulbul) | Translation (Mayura) | Cultural Context |
|----------|------|---------------|--------------|---------------------|------------------|
| Hindi | hi-IN | ✅ 95% accuracy | ✅ Natural voices | ✅ Gender-aware | ✅ Full support |
| English (India) | en-IN | ✅ 98% accuracy | ✅ Indian accent | ✅ Cultural adaptation | ✅ Full support |
| Tamil | ta-IN | ✅ 92% accuracy | ✅ Regional voices | ✅ Script support | ✅ Cultural nuances |
| Telugu | te-IN | ✅ 90% accuracy | ✅ Regional voices | ✅ Script support | ✅ Cultural nuances |
| Bengali | bn-IN | ✅ 88% accuracy | ✅ Regional voices | ✅ Script support | ✅ Cultural nuances |
| Gujarati | gu-IN | ✅ 87% accuracy | ✅ Regional voices | ✅ Script support | ✅ Cultural nuances |
| Marathi | mr-IN | ✅ 89% accuracy | ✅ Regional voices | ✅ Script support | ✅ Cultural nuances |
| Kannada | kn-IN | ✅ 86% accuracy | ✅ Regional voices | ✅ Script support | ✅ Cultural nuances |

## Error Handling

### Common Error Codes

#### Authentication Errors
```javascript
// 403 Forbidden - Invalid API Key
{
  "error": {
    "type": "invalid_api_key_error",
    "message": "Invalid API key provided"
  }
}
```

#### Rate Limiting
```javascript
// 429 Too Many Requests
{
  "error": {
    "type": "insufficient_quota_error", 
    "message": "API quota exceeded"
  }
}
```

#### Server Errors
```javascript
// 500 Internal Server Error
{
  "error": {
    "type": "internal_server_error",
    "message": "Internal server error"
  }
}
```

#### Request Errors
```javascript
// 400 Bad Request
{
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid request format"
  }
}
```

### Error Handling Implementation

<details>
<summary>Robust Error Handling</summary>

```python
import requests
import time
from typing import Optional, Dict, Any

class SarvamAIClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.sarvam.ai"
        self.max_retries = 3
        self.retry_delay = 1.0

    def _make_request(self, endpoint: str, method: str = "POST", **kwargs) -> Dict[Any, Any]:
        """Make API request with error handling and retries"""
        url = f"{self.base_url}/{endpoint}"
        headers = kwargs.pop("headers", {})
        headers.update({
            "api-subscription-key": self.api_key,
            "Accept": "application/json"
        })

        for attempt in range(self.max_retries):
            try:
                response = requests.request(method, url, headers=headers, **kwargs)
                
                if response.status_code == 200:
                    return response.json()
                elif response.status_code == 429:
                    # Rate limiting - exponential backoff
                    wait_time = self.retry_delay * (2 ** attempt)
                    print(f"Rate limited. Waiting {wait_time} seconds...")
                    time.sleep(wait_time)
                    continue
                elif response.status_code == 403:
                    raise Exception("Invalid API key. Check your credentials.")
                elif response.status_code == 400:
                    error_data = response.json()
                    raise Exception(f"Bad request: {error_data.get('error', {}).get('message', 'Unknown error')}")
                elif response.status_code >= 500:
                    if attempt == self.max_retries - 1:
                        raise Exception("Server error. Please try again later.")
                    time.sleep(self.retry_delay)
                    continue
                else:
                    raise Exception(f"Unexpected error: {response.status_code} - {response.text}")
                    
            except requests.exceptions.RequestException as e:
                if attempt == self.max_retries - 1:
                    raise Exception(f"Network error: {str(e)}")
                time.sleep(self.retry_delay)
                continue

        raise Exception("Max retries exceeded")

    def chat_completion(self, messages: list, model: str = "sarvam-m") -> str:
        """Chat completion with error handling"""
        try:
            payload = {
                "model": model,
                "messages": messages,
                "temperature": 0.7,
                "max_tokens": 500
            }
            
            response = self._make_request(
                "v1/chat/completions",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            return response["choices"][0]["message"]["content"]
            
        except Exception as e:
            print(f"Chat completion error: {e}")
            # Fallback response for AssistantPro
            return "मुझे खुशी होगी आपकी सहायता करने में। कृपया दोबारा कोशिश करें।"

# Usage
client = SarvamAIClient("your-api-key")
```
</details>

## Rate Limits & Optimization

### Current Limits
- **Requests per minute**: 60 (Free tier)
- **Requests per day**: 1000 (Free tier)
- **File size limit**: 30MB for audio files
- **Text length limit**: 10,000 characters per request

### Optimization Strategies

#### 1. Request Batching
```python
def batch_translations(texts: list, target_language: str, batch_size: int = 10):
    """Batch multiple translations to optimize API usage"""
    results = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        # Combine texts with separator
        combined_text = " [SEP] ".join(batch)
        
        translated = translate_text(combined_text, target_language)
        batch_results = translated["translated_text"].split(" [SEP] ")
        results.extend(batch_results)
    
    return results
```

#### 2. Caching
```python
import hashlib
import json
from functools import lru_cache

class CachedSarvamClient:
    def __init__(self, api_key: str):
        self.client = SarvamAIClient(api_key)
        self.cache = {}

    def _get_cache_key(self, endpoint: str, params: dict) -> str:
        """Generate cache key for request"""
        cache_data = f"{endpoint}:{json.dumps(params, sort_keys=True)}"
        return hashlib.md5(cache_data.encode()).hexdigest()

    def cached_translate(self, text: str, target_language: str, ttl: int = 3600):
        """Cached translation to reduce API calls"""
        cache_key = self._get_cache_key("translate", {
            "text": text, 
            "target": target_language
        })
        
        if cache_key in self.cache:
            cached_result, timestamp = self.cache[cache_key]
            if time.time() - timestamp < ttl:
                return cached_result
        
        # Make API call if not cached or expired
        result = self.client.translate_text(text, target_language)
        self.cache[cache_key] = (result, time.time())
        return result
```

#### 3. Asynchronous Processing
```python
import asyncio
import aiohttp

class AsyncSarvamClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.sarvam.ai"

    async def async_translate(self, session: aiohttp.ClientSession, text: str, target_language: str):
        """Async translation for concurrent requests"""
        headers = {
            "api-subscription-key": self.api_key,
            "Content-Type": "application/json"
        }
        
        payload = {
            "input": text,
            "source_language_code": "auto",
            "target_language_code": target_language
        }
        
        async with session.post(f"{self.base_url}/translate", headers=headers, json=payload) as response:
            return await response.json()

    async def batch_translate_async(self, texts: list, target_language: str):
        """Process multiple translations concurrently"""
        async with aiohttp.ClientSession() as session:
            tasks = [self.async_translate(session, text, target_language) for text in texts]
            results = await asyncio.gather(*tasks)
            return results
```

## Best Practices for AssistantPro Integration

### 1. Privacy-First Implementation
```python
import hashlib
from cryptography.fernet import Fernet

class PrivacySarvamClient:
    def __init__(self, api_key: str, encryption_key: bytes):
        self.client = SarvamAIClient(api_key)
        self.cipher = Fernet(encryption_key)

    def hash_user_input(self, user_input: str) -> str:
        """Hash user input before logging for privacy"""
        return hashlib.sha256(user_input.encode()).hexdigest()[:8]

    def secure_chat(self, user_message: str, user_id: str) -> str:
        """Privacy-aware chat completion"""
        # Log only hashed version for debugging
        message_hash = self.hash_user_input(user_message)
        print(f"Processing message {message_hash} for user {user_id}")
        
        # Process with Sarvam AI
        response = self.client.chat_completion([
            {"role": "user", "content": user_message}
        ])
        
        # Don't log the actual response content
        print(f"Response generated for message {message_hash}")
        return response
```

### 2. Cultural Context Integration
```python
class CulturalSarvamClient:
    def __init__(self, api_key: str):
        self.client = SarvamAIClient(api_key)
        self.cultural_prompts = {
            "financial": """You are a financial advisor familiar with Indian banking, 
                          UPI payments, and investment options like PPF, ELSS, and FDs.""",
            "educational": """You understand the Indian education system, 
                            including CBSE, ICSE, and state boards.""",
            "general": """You are culturally aware of Indian traditions, festivals, 
                        and social contexts."""
        }

    def get_cultural_response(self, user_message: str, context: str = "general") -> str:
        """Get culturally appropriate response"""
        system_prompt = self.cultural_prompts.get(context, self.cultural_prompts["general"])
        
        return self.client.chat_completion([
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ])
```

### 3. Performance Monitoring
```python
import time
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class APIMetrics:
    endpoint: str
    response_time: float
    status_code: int
    tokens_used: int
    timestamp: float

class MonitoredSarvamClient:
    def __init__(self, api_key: str):
        self.client = SarvamAIClient(api_key)
        self.metrics: List[APIMetrics] = []

    def timed_request(self, func, *args, **kwargs):
        """Monitor API request performance"""
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            response_time = time.time() - start_time
            
            # Log metrics
            metric = APIMetrics(
                endpoint=func.__name__,
                response_time=response_time,
                status_code=200,
                tokens_used=len(str(result)) // 4,  # Rough estimate
                timestamp=time.time()
            )
            self.metrics.append(metric)
            
            return result
        except Exception as e:
            response_time = time.time() - start_time
            metric = APIMetrics(
                endpoint=func.__name__,
                response_time=response_time,
                status_code=500,
                tokens_used=0,
                timestamp=time.time()
            )
            self.metrics.append(metric)
            raise e

    def get_performance_stats(self) -> Dict:
        """Get performance statistics"""
        if not self.metrics:
            return {}
        
        response_times = [m.response_time for m in self.metrics]
        return {
            "total_requests": len(self.metrics),
            "avg_response_time": sum(response_times) / len(response_times),
            "max_response_time": max(response_times),
            "success_rate": len([m for m in self.metrics if m.status_code == 200]) / len(self.metrics)
        }
```

## Testing & Validation

### Unit Test Examples
```python
import unittest
from unittest.mock import patch, MagicMock

class TestSarvamIntegration(unittest.TestCase):
    def setUp(self):
        self.client = SarvamAIClient("test-api-key")

    @patch('requests.post')
    def test_chat_completion_success(self, mock_post):
        # Mock successful response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "choices": [{"message": {"content": "Hello from Sarvam!"}}]
        }
        mock_post.return_value = mock_response

        result = self.client.chat_completion([
            {"role": "user", "content": "Hello"}
        ])

        self.assertEqual(result, "Hello from Sarvam!")

    @patch('requests.post')
    def test_rate_limiting_retry(self, mock_post):
        # Mock rate limiting then success
        mock_response_429 = MagicMock()
        mock_response_429.status_code = 429
        
        mock_response_200 = MagicMock()
        mock_response_200.status_code = 200
        mock_response_200.json.return_value = {
            "choices": [{"message": {"content": "Success after retry"}}]
        }
        
        mock_post.side_effect = [mock_response_429, mock_response_200]

        result = self.client.chat_completion([
            {"role": "user", "content": "Test"}
        ])

        self.assertEqual(result, "Success after retry")
        self.assertEqual(mock_post.call_count, 2)
```

## Integration Checklist

### Pre-Production Checklist
- [ ] **API Key Security**: Environment variables configured
- [ ] **Error Handling**: Comprehensive error handling implemented
- [ ] **Rate Limiting**: Request throttling and retry logic
- [ ] **Caching**: Response caching for improved performance
- [ ] **Monitoring**: API usage and performance tracking
- [ ] **Privacy**: No sensitive data logging
- [ ] **Testing**: Unit and integration tests written
- [ ] **Fallbacks**: Offline mode and error fallbacks
- [ ] **Cultural Context**: India-specific prompts and responses
- [ ] **Multi-language**: All supported languages tested

### Production Monitoring
- [ ] **Usage Metrics**: Track API calls and costs
- [ ] **Performance**: Monitor response times and success rates
- [ ] **Error Tracking**: Log and alert on API failures
- [ ] **User Experience**: Track user satisfaction with AI responses
- [ ] **Regional Performance**: Monitor language-specific accuracy
- [ ] **Compliance**: Ensure privacy regulation compliance

---

**Support Resources:**
- **Documentation**: [docs.sarvam.ai](https://docs.sarvam.ai/)
- **Dashboard**: [dashboard.sarvam.ai](https://dashboard.sarvam.ai/)
- **Community**: [Discord Community](https://discord.gg/hTuVuPNF)
- **Email Support**: developer@sarvam.ai

**Related AssistantPro Documentation:**
- [Soch AI Implementation](../../02-FEATURES/Soch%20(Conversational%20AI)/)
- [Privacy Architecture](../../01-CORE/privacy-first-architecture.md)
- [Voice Interface Design](../../04-DESIGN/screen-specifications.md)
- [Testing Strategy](../../06-DEPLOYMENT/testing-strategy.md)
