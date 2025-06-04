# Error Handling and Recovery Guide

> Comprehensive error handling strategies for AssistantPro's robust and reliable AI platform

## Overview

This guide provides comprehensive error handling strategies for AssistantPro's integration with Sarvam AI services, focusing on resilience, user experience, and graceful degradation for India's diverse connectivity conditions.

## Error Classification

### 1. HTTP Status Codes

| Status Code | Error Type | Description | Recovery Strategy |
|-------------|------------|-------------|-------------------|
| 400 | Bad Request | Invalid request parameters | Validate and retry with corrected data |
| 401 | Unauthorized | Invalid or missing API key | Check authentication, refresh key |
| 403 | Forbidden | Insufficient permissions | Verify API key permissions |
| 404 | Not Found | Endpoint or resource not found | Check API endpoint URLs |
| 429 | Rate Limited | Too many requests | Implement exponential backoff |
| 500 | Server Error | Internal server error | Retry with exponential backoff |
| 502 | Bad Gateway | Gateway timeout | Retry with longer timeout |
| 503 | Service Unavailable | Service temporarily unavailable | Implement circuit breaker |

### 2. Service-Specific Errors

#### Chat Completion Errors
```json
{
  "error": {
    "type": "invalid_request_error",
    "code": "model_not_found",
    "message": "The specified model does not exist",
    "param": "model"
  }
}
```

#### Text-to-Speech Errors
```json
{
  "error": {
    "type": "validation_error",
    "code": "unsupported_language",
    "message": "Language 'xyz' is not supported",
    "param": "language_code"
  }
}
```

#### Speech-to-Text Errors
```json
{
  "error": {
    "type": "processing_error",
    "code": "audio_format_unsupported",
    "message": "Audio format not supported",
    "param": "audio_file"
  }
}
```

## Error Handling Implementation

### 1. Base Error Classes

```python
class SarvamAPIError(Exception):
    """Base exception for Sarvam AI API errors"""
    
    def __init__(self, message: str, error_code: str = None, 
                 status_code: int = None, response_data: dict = None):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code
        self.response_data = response_data or {}
        super().__init__(self.message)

class AuthenticationError(SarvamAPIError):
    """Authentication-related errors"""
    pass

class RateLimitError(SarvamAPIError):
    """Rate limiting errors"""
    def __init__(self, message: str, retry_after: int = None, **kwargs):
        super().__init__(message, **kwargs)
        self.retry_after = retry_after

class ValidationError(SarvamAPIError):
    """Request validation errors"""
    def __init__(self, message: str, field: str = None, **kwargs):
        super().__init__(message, **kwargs)
        self.field = field

class ServiceUnavailableError(SarvamAPIError):
    """Service availability errors"""
    pass

class NetworkError(SarvamAPIError):
    """Network connectivity errors"""
    pass
```

### 2. Error Parser

```python
import json
from typing import Dict, Any

class ErrorParser:
    """Parse and classify API errors"""
    
    @staticmethod
    def parse_response_error(response) -> SarvamAPIError:
        """Parse error from HTTP response"""
        status_code = response.status_code
        
        try:
            error_data = response.json()
        except json.JSONDecodeError:
            error_data = {"message": response.text or "Unknown error"}
        
        error_info = error_data.get("error", {})
        message = error_info.get("message", "API request failed")
        error_code = error_info.get("code")
        error_type = error_info.get("type")
        
        # Classify error based on status code and type
        if status_code == 401:
            return AuthenticationError(
                message, error_code, status_code, error_data
            )
        elif status_code == 429:
            retry_after = response.headers.get("Retry-After")
            retry_after = int(retry_after) if retry_after else None
            return RateLimitError(
                message, retry_after, error_code, status_code, error_data
            )
        elif status_code == 400 and error_type == "validation_error":
            field = error_info.get("param")
            return ValidationError(
                message, field, error_code, status_code, error_data
            )
        elif status_code in [502, 503, 504]:
            return ServiceUnavailableError(
                message, error_code, status_code, error_data
            )
        else:
            return SarvamAPIError(
                message, error_code, status_code, error_data
            )
    
    @staticmethod
    def parse_network_error(exception: Exception) -> NetworkError:
        """Parse network-related errors"""
        return NetworkError(
            f"Network error: {str(exception)}",
            error_code="network_error"
        )
```

### 3. Retry Logic with Exponential Backoff

```python
import asyncio
import random
import time
from typing import Callable, Any, Optional

class RetryHandler:
    def __init__(self, max_retries: int = 3, base_delay: float = 1.0, 
                 max_delay: float = 60.0, exponential_base: float = 2.0):
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.max_delay = max_delay
        self.exponential_base = exponential_base
    
    async def retry_with_backoff(self, func: Callable, *args, **kwargs) -> Any:
        """Execute function with exponential backoff retry"""
        last_exception = None
        
        for attempt in range(self.max_retries + 1):
            try:
                return await func(*args, **kwargs)
            
            except RateLimitError as e:
                if attempt == self.max_retries:
                    raise e
                
                # Use server-provided retry-after if available
                delay = e.retry_after or self._calculate_delay(attempt)
                await asyncio.sleep(delay)
                last_exception = e
            
            except (ServiceUnavailableError, NetworkError) as e:
                if attempt == self.max_retries:
                    raise e
                
                delay = self._calculate_delay(attempt)
                await asyncio.sleep(delay)
                last_exception = e
            
            except (AuthenticationError, ValidationError) as e:
                # Don't retry authentication or validation errors
                raise e
            
            except SarvamAPIError as e:
                if attempt == self.max_retries:
                    raise e
                
                # Retry other API errors with backoff
                delay = self._calculate_delay(attempt)
                await asyncio.sleep(delay)
                last_exception = e
        
        # Should not reach here, but raise last exception if it does
        raise last_exception
    
    def _calculate_delay(self, attempt: int) -> float:
        """Calculate delay with exponential backoff and jitter"""
        delay = min(
            self.base_delay * (self.exponential_base ** attempt),
            self.max_delay
        )
        
        # Add jitter to prevent thundering herd
        jitter = random.uniform(0.1, 0.9)
        return delay * jitter
```

### 4. Circuit Breaker Implementation

```python
import time
from enum import Enum
from typing import Callable, Any
from dataclasses import dataclass

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if service recovered

@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5
    recovery_timeout: int = 60
    success_threshold: int = 2  # For half-open state

class CircuitBreaker:
    def __init__(self, service_name: str, config: CircuitBreakerConfig = None):
        self.service_name = service_name
        self.config = config or CircuitBreakerConfig()
        
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time = None
        self.last_request_time = None
    
    async def call(self, func: Callable, *args, **kwargs) -> Any:
        """Execute function with circuit breaker protection"""
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
                self.success_count = 0
            else:
                raise ServiceUnavailableError(
                    f"Circuit breaker is open for {self.service_name}",
                    error_code="circuit_breaker_open"
                )
        
        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        
        except Exception as e:
            self._on_failure()
            raise e
    
    def _should_attempt_reset(self) -> bool:
        """Check if enough time has passed to attempt reset"""
        if self.last_failure_time is None:
            return True
        
        return (time.time() - self.last_failure_time) >= self.config.recovery_timeout
    
    def _on_success(self):
        """Handle successful request"""
        if self.state == CircuitState.HALF_OPEN:
            self.success_count += 1
            if self.success_count >= self.config.success_threshold:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
        else:
            self.failure_count = 0
    
    def _on_failure(self):
        """Handle failed request"""
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.state == CircuitState.HALF_OPEN:
            self.state = CircuitState.OPEN
        elif self.failure_count >= self.config.failure_threshold:
            self.state = CircuitState.OPEN
```

### 5. Comprehensive Error Handler

```python
import logging
from typing import Optional, Dict, Any

class SarvamErrorHandler:
    def __init__(self):
        self.logger = logging.getLogger('sarvam_error_handler')
        self.retry_handler = RetryHandler()
        self.circuit_breakers = {}
        self.error_metrics = {}
    
    async def handle_request(self, service: str, func: Callable, 
                           *args, **kwargs) -> Any:
        """Handle API request with comprehensive error handling"""
        
        # Get or create circuit breaker for service
        if service not in self.circuit_breakers:
            self.circuit_breakers[service] = CircuitBreaker(service)
        
        circuit_breaker = self.circuit_breakers[service]
        
        try:
            # Execute with circuit breaker and retry logic
            result = await circuit_breaker.call(
                self.retry_handler.retry_with_backoff,
                func, *args, **kwargs
            )
            
            self._record_success(service)
            return result
        
        except SarvamAPIError as e:
            self._record_error(service, e)
            
            # Attempt graceful degradation
            fallback_result = await self._attempt_fallback(service, e, *args, **kwargs)
            if fallback_result is not None:
                return fallback_result
            
            # If no fallback available, raise original error
            raise e
    
    async def _attempt_fallback(self, service: str, error: SarvamAPIError, 
                               *args, **kwargs) -> Optional[Any]:
        """Attempt fallback strategies for different services"""
        fallback_strategies = {
            'chat_completions': self._chat_fallback,
            'text_to_speech': self._tts_fallback,
            'speech_to_text': self._stt_fallback,
            'translation': self._translation_fallback
        }
        
        fallback_func = fallback_strategies.get(service)
        if fallback_func:
            try:
                return await fallback_func(error, *args, **kwargs)
            except Exception as fallback_error:
                self.logger.warning(
                    f"Fallback failed for {service}: {fallback_error}"
                )
        
        return None
    
    async def _chat_fallback(self, error: SarvamAPIError, *args, **kwargs) -> Dict[str, Any]:
        """Fallback strategy for chat completions"""
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "I'm experiencing some technical difficulties. Please try again in a moment."
                },
                "finish_reason": "fallback"
            }],
            "usage": {"total_tokens": 0},
            "fallback": True,
            "error_code": error.error_code
        }
    
    async def _tts_fallback(self, error: SarvamAPIError, *args, **kwargs) -> Dict[str, Any]:
        """Fallback strategy for text-to-speech"""
        # Return text instead of audio
        text_input = kwargs.get('text', args[0] if args else '')
        return {
            "text": text_input,
            "audio_url": None,
            "fallback": True,
            "error_code": error.error_code,
            "message": "Audio generation temporarily unavailable. Displaying text instead."
        }
    
    async def _stt_fallback(self, error: SarvamAPIError, *args, **kwargs) -> Dict[str, Any]:
        """Fallback strategy for speech-to-text"""
        return {
            "text": "[Audio processing unavailable]",
            "confidence": 0.0,
            "fallback": True,
            "error_code": error.error_code,
            "message": "Speech recognition temporarily unavailable."
        }
    
    async def _translation_fallback(self, error: SarvamAPIError, *args, **kwargs) -> Dict[str, Any]:
        """Fallback strategy for translation"""
        source_text = kwargs.get('text', args[0] if args else '')
        return {
            "translated_text": source_text,  # Return original text
            "source_language": "auto",
            "target_language": kwargs.get('target_language', 'en'),
            "fallback": True,
            "error_code": error.error_code,
            "message": "Translation temporarily unavailable. Showing original text."
        }
    
    def _record_success(self, service: str):
        """Record successful request"""
        if service not in self.error_metrics:
            self.error_metrics[service] = {'success': 0, 'errors': {}}
        
        self.error_metrics[service]['success'] += 1
    
    def _record_error(self, service: str, error: SarvamAPIError):
        """Record error occurrence"""
        if service not in self.error_metrics:
            self.error_metrics[service] = {'success': 0, 'errors': {}}
        
        error_type = type(error).__name__
        if error_type not in self.error_metrics[service]['errors']:
            self.error_metrics[service]['errors'][error_type] = 0
        
        self.error_metrics[service]['errors'][error_type] += 1
        
        # Log error details
        self.logger.error(
            f"Service {service} error: {error.message}",
            extra={
                'service': service,
                'error_code': error.error_code,
                'status_code': error.status_code,
                'error_type': error_type
            }
        )
```

## India-Specific Error Handling

### 1. Network Condition Adaptation

```python
class NetworkAwareErrorHandler:
    def __init__(self):
        self.connection_quality = self._detect_connection_quality()
        self.adaptive_timeouts = {
            'excellent': 5.0,
            'good': 10.0,
            'fair': 20.0,
            'poor': 45.0
        }
    
    def _detect_connection_quality(self) -> str:
        """Detect connection quality based on recent response times"""
        # This would integrate with actual network monitoring
        # For now, return a placeholder
        return 'good'
    
    def get_adaptive_timeout(self) -> float:
        """Get timeout based on connection quality"""
        return self.adaptive_timeouts.get(self.connection_quality, 10.0)
    
    async def handle_network_error(self, error: Exception, attempt: int) -> bool:
        """Handle network errors with India-specific adaptations"""
        timeout = self.get_adaptive_timeout()
        
        # Increase timeout for poor connections
        if self.connection_quality in ['fair', 'poor']:
            timeout *= (attempt + 1)
        
        await asyncio.sleep(min(timeout, 60.0))
        return True
```

### 2. Regional Fallback Services

```python
class RegionalFallbackHandler:
    def __init__(self):
        self.regional_endpoints = {
            'primary': 'https://api.sarvam.ai',
            'mumbai': 'https://mumbai.api.sarvam.ai',
            'bangalore': 'https://bangalore.api.sarvam.ai',
            'delhi': 'https://delhi.api.sarvam.ai'
        }
        self.current_endpoint = 'primary'
    
    async def try_regional_fallback(self, func: Callable, *args, **kwargs):
        """Try different regional endpoints on failure"""
        endpoints_to_try = list(self.regional_endpoints.keys())
        
        # Start with current endpoint
        if self.current_endpoint in endpoints_to_try:
            endpoints_to_try.remove(self.current_endpoint)
            endpoints_to_try.insert(0, self.current_endpoint)
        
        last_error = None
        
        for endpoint_name in endpoints_to_try:
            try:
                endpoint_url = self.regional_endpoints[endpoint_name]
                
                # Update base URL for this attempt
                kwargs['base_url'] = endpoint_url
                
                result = await func(*args, **kwargs)
                
                # Update current endpoint if successful
                self.current_endpoint = endpoint_name
                return result
            
            except Exception as e:
                last_error = e
                continue
        
        # If all endpoints failed, raise the last error
        raise last_error
```

## User Experience Error Handling

### 1. User-Friendly Messages

```python
class UserFriendlyErrorMessages:
    """Convert technical errors to user-friendly messages"""
    
    ERROR_MESSAGES = {
        'rate_limit_exceeded': {
            'en': "We're experiencing high demand. Please wait a moment and try again.",
            'hi': "हमारे पास अधिक मांग है। कृपया एक क्षण प्रतीक्षा करें और पुनः प्रयास करें।",
            'te': "మాకు అధిక డిమాండ్ ఉంది. దయచేసి ఒక క్షణం వేచి ఉండి మళ్లీ ప్రయత్నించండి.",
            'ta': "எங்களுக்கு அதிக தேவை உள்ளது. தயவுசெய்து சிறிது நேரம் காத்திருந்து மீண்டும் முயற்சிக்கவும்."
        },
        'network_error': {
            'en': "Connection issue. Please check your internet and try again.",
            'hi': "कनेक्शन की समस्या। कृपया अपना इंटरनेट जांचें और पुनः प्रयास करें।",
            'te': "కనెక్షన్ సమస్య. దయచేసి మీ ఇంటర్నెట్‌ను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
            'ta': "இணைப்பு பிரச்சினை. உங்கள் இணையத்தை சரிபார்த்து மீண்டும் முயற்சிக்கவும்."
        },
        'service_unavailable': {
            'en': "Service temporarily unavailable. We're working to fix this.",
            'hi': "सेवा अस्थायी रूप से अनुपलब्ध। हम इसे ठीक करने पर काम कर रहे हैं।",
            'te': "సేవ తాత్కాలికంగా అందుబాటులో లేదు. మేము దీన్ని పరిష్కరించడానికి పని చేస్తున్నాము.",
            'ta': "சேவை தற்காலிகமாக கிடைக்கவில்லை. இதை சரிசெய்ய நாங்கள் பணியாற்றுகிறோம்."
        }
    }
    
    def get_user_message(self, error_type: str, language: str = 'en') -> str:
        """Get user-friendly error message"""
        messages = self.ERROR_MESSAGES.get(error_type, {})
        return messages.get(language, messages.get('en', 'An error occurred. Please try again.'))
    
    def format_error_for_user(self, error: SarvamAPIError, language: str = 'en') -> Dict[str, Any]:
        """Format error for user display"""
        if isinstance(error, RateLimitError):
            error_type = 'rate_limit_exceeded'
        elif isinstance(error, NetworkError):
            error_type = 'network_error'
        elif isinstance(error, ServiceUnavailableError):
            error_type = 'service_unavailable'
        else:
            error_type = 'general_error'
        
        return {
            'user_message': self.get_user_message(error_type, language),
            'error_code': error.error_code,
            'retry_suggested': error_type in ['rate_limit_exceeded', 'network_error'],
            'retry_after': getattr(error, 'retry_after', None)
        }
```

### 2. Progressive Error Disclosure

```python
class ProgressiveErrorHandler:
    """Handle errors with progressive disclosure for different user levels"""
    
    def __init__(self):
        self.user_error_formatter = UserFriendlyErrorMessages()
    
    def format_error_by_user_level(self, error: SarvamAPIError, 
                                 user_level: str = 'basic', 
                                 language: str = 'en') -> Dict[str, Any]:
        """Format error based on user technical level"""
        
        base_info = self.user_error_formatter.format_error_for_user(error, language)
        
        if user_level == 'basic':
            return {
                'message': base_info['user_message'],
                'can_retry': base_info['retry_suggested'],
                'retry_in_seconds': base_info.get('retry_after')
            }
        
        elif user_level == 'advanced':
            return {
                **base_info,
                'technical_details': {
                    'error_type': type(error).__name__,
                    'status_code': error.status_code,
                    'service_endpoint': getattr(error, 'endpoint', None)
                }
            }
        
        elif user_level == 'developer':
            return {
                **base_info,
                'technical_details': {
                    'error_type': type(error).__name__,
                    'error_code': error.error_code,
                    'status_code': error.status_code,
                    'response_data': error.response_data,
                    'timestamp': time.time()
                },
                'debugging_info': {
                    'request_id': getattr(error, 'request_id', None),
                    'trace_id': getattr(error, 'trace_id', None)
                }
            }
        
        return base_info
```

## Monitoring and Alerting

### 1. Error Tracking

```python
import json
from datetime import datetime
from typing import List

class ErrorTracker:
    def __init__(self):
        self.error_log = []
        self.error_counts = {}
        self.alert_thresholds = {
            'high_error_rate': 0.1,  # 10% error rate
            'critical_errors': 5,    # 5 critical errors in window
            'service_down': 3        # 3 consecutive failures
        }
    
    def log_error(self, service: str, error: SarvamAPIError, 
                  request_context: Dict[str, Any] = None):
        """Log error occurrence"""
        error_entry = {
            'timestamp': datetime.now().isoformat(),
            'service': service,
            'error_type': type(error).__name__,
            'error_code': error.error_code,
            'status_code': error.status_code,
            'message': error.message,
            'context': request_context or {}
        }
        
        self.error_log.append(error_entry)
        
        # Update error counts
        error_key = f"{service}:{type(error).__name__}"
        self.error_counts[error_key] = self.error_counts.get(error_key, 0) + 1
        
        # Check alert conditions
        self._check_alert_conditions(service, error)
    
    def _check_alert_conditions(self, service: str, error: SarvamAPIError):
        """Check if error patterns warrant alerts"""
        # Implement alerting logic here
        # This could integrate with monitoring services
        pass
    
    def get_error_summary(self, time_window_hours: int = 24) -> Dict[str, Any]:
        """Get error summary for specified time window"""
        cutoff_time = datetime.now().timestamp() - (time_window_hours * 3600)
        
        recent_errors = [
            error for error in self.error_log
            if datetime.fromisoformat(error['timestamp']).timestamp() > cutoff_time
        ]
        
        # Group by service and error type
        error_breakdown = {}
        for error in recent_errors:
            service = error['service']
            error_type = error['error_type']
            
            if service not in error_breakdown:
                error_breakdown[service] = {}
            
            if error_type not in error_breakdown[service]:
                error_breakdown[service][error_type] = 0
            
            error_breakdown[service][error_type] += 1
        
        return {
            'time_window_hours': time_window_hours,
            'total_errors': len(recent_errors),
            'error_breakdown': error_breakdown,
            'top_errors': self._get_top_errors(recent_errors)
        }
    
    def _get_top_errors(self, errors: List[Dict], limit: int = 5) -> List[Dict]:
        """Get most frequent errors"""
        error_counts = {}
        
        for error in errors:
            key = f"{error['service']}:{error['error_type']}"
            if key not in error_counts:
                error_counts[key] = {
                    'service': error['service'],
                    'error_type': error['error_type'],
                    'count': 0,
                    'latest_message': error['message']
                }
            error_counts[key]['count'] += 1
        
        return sorted(
            error_counts.values(),
            key=lambda x: x['count'],
            reverse=True
        )[:limit]
```

## Testing Error Scenarios

### 1. Error Simulation

```python
import random
from unittest.mock import Mock

class ErrorSimulator:
    """Simulate various error conditions for testing"""
    
    def __init__(self):
        self.error_scenarios = {
            'rate_limit': self._simulate_rate_limit,
            'network_timeout': self._simulate_network_timeout,
            'service_unavailable': self._simulate_service_unavailable,
            'authentication_failure': self._simulate_auth_failure,
            'validation_error': self._simulate_validation_error
        }
    
    def simulate_error(self, scenario: str, probability: float = 1.0):
        """Simulate error with given probability"""
        if random.random() < probability:
            return self.error_scenarios[scenario]()
        return None
    
    def _simulate_rate_limit(self):
        """Simulate rate limit error"""
        mock_response = Mock()
        mock_response.status_code = 429
        mock_response.headers = {'Retry-After': '60'}
        mock_response.json.return_value = {
            'error': {
                'type': 'rate_limit_error',
                'code': 'rate_limit_exceeded',
                'message': 'Rate limit exceeded'
            }
        }
        return mock_response
    
    def _simulate_network_timeout(self):
        """Simulate network timeout"""
        import requests
        raise requests.exceptions.Timeout("Connection timed out")
    
    def _simulate_service_unavailable(self):
        """Simulate service unavailable"""
        mock_response = Mock()
        mock_response.status_code = 503
        mock_response.json.return_value = {
            'error': {
                'type': 'service_unavailable',
                'code': 'service_unavailable',
                'message': 'Service temporarily unavailable'
            }
        }
        return mock_response
    
    def _simulate_auth_failure(self):
        """Simulate authentication failure"""
        mock_response = Mock()
        mock_response.status_code = 401
        mock_response.json.return_value = {
            'error': {
                'type': 'authentication_error',
                'code': 'invalid_api_key',
                'message': 'Invalid API key provided'
            }
        }
        return mock_response
    
    def _simulate_validation_error(self):
        """Simulate validation error"""
        mock_response = Mock()
        mock_response.status_code = 400
        mock_response.json.return_value = {
            'error': {
                'type': 'validation_error',
                'code': 'invalid_parameter',
                'message': 'Invalid parameter value',
                'param': 'model'
            }
        }
        return mock_response
```

### 2. Error Handling Tests

```python
import pytest
import asyncio
from unittest.mock import AsyncMock, patch

@pytest.fixture
def error_handler():
    return SarvamErrorHandler()

@pytest.fixture
def error_simulator():
    return ErrorSimulator()

class TestErrorHandling:
    
    @pytest.mark.asyncio
    async def test_rate_limit_retry(self, error_handler, error_simulator):
        """Test rate limit error handling with retry"""
        
        # Mock function that fails twice then succeeds
        call_count = 0
        async def mock_api_call():
            nonlocal call_count
            call_count += 1
            if call_count <= 2:
                raise RateLimitError("Rate limit exceeded", retry_after=1)
            return {"success": True}
        
        result = await error_handler.handle_request(
            "chat_completions", mock_api_call
        )
        
        assert result["success"] is True
        assert call_count == 3
    
    @pytest.mark.asyncio
    async def test_circuit_breaker_activation(self, error_handler):
        """Test circuit breaker opens after repeated failures"""
        
        async def failing_function():
            raise ServiceUnavailableError("Service down")
        
        # Should fail 5 times then open circuit breaker
        for i in range(5):
            with pytest.raises(ServiceUnavailableError):
                await error_handler.handle_request(
                    "test_service", failing_function
                )
        
        # Circuit should now be open
        circuit_breaker = error_handler.circuit_breakers["test_service"]
        assert circuit_breaker.state == CircuitState.OPEN
    
    @pytest.mark.asyncio
    async def test_fallback_strategies(self, error_handler):
        """Test fallback strategies for different services"""
        
        async def failing_chat():
            raise ServiceUnavailableError("Chat service down")
        
        result = await error_handler.handle_request(
            "chat_completions", failing_chat
        )
        
        assert result["fallback"] is True
        assert "technical difficulties" in result["choices"][0]["message"]["content"]
    
    def test_error_classification(self):
        """Test error classification from HTTP responses"""
        
        # Test rate limit error
        mock_response = Mock()
        mock_response.status_code = 429
        mock_response.headers = {'Retry-After': '60'}
        mock_response.json.return_value = {
            'error': {'message': 'Too many requests', 'code': 'rate_limit'}
        }
        
        error = ErrorParser.parse_response_error(mock_response)
        
        assert isinstance(error, RateLimitError)
        assert error.retry_after == 60
    
    def test_user_friendly_messages(self):
        """Test user-friendly error message generation"""
        
        formatter = UserFriendlyErrorMessages()
        
        rate_limit_error = RateLimitError("Rate limit exceeded")
        message = formatter.format_error_for_user(rate_limit_error, 'hi')
        
        assert 'अधिक मांग' in message['user_message']
        assert message['retry_suggested'] is True
```

## Integration Examples

### 1. React Error Boundary

```javascript
// components/ErrorBoundary.jsx
import React from 'react';

class SarvamErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            errorInfo: null,
            userMessage: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
            userMessage: this.formatErrorMessage(error)
        });
        
        // Log error to monitoring service
        this.logError(error, errorInfo);
    }

    formatErrorMessage(error) {
        const errorMessages = {
            'RateLimitError': 'We are experiencing high demand. Please wait a moment.',
            'NetworkError': 'Connection issue. Please check your internet.',
            'ServiceUnavailableError': 'Service temporarily unavailable.'
        };
        
        return errorMessages[error.name] || 'An unexpected error occurred.';
    }

    logError(error, errorInfo) {
        // Send to error tracking service
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h3>Something went wrong</h3>
                    <p>{this.state.userMessage}</p>
                    <button onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default SarvamErrorBoundary;
```

### 2. Service Layer Integration

```python
# services/chat_service.py
from typing import List, Dict, Any
from .error_handling import SarvamErrorHandler

class ChatService:
    def __init__(self):
        self.error_handler = SarvamErrorHandler()
        self.base_url = "https://api.sarvam.ai"
    
    async def generate_response(self, messages: List[Dict[str, str]], 
                              user_language: str = 'en') -> Dict[str, Any]:
        """Generate chat response with comprehensive error handling"""
        
        async def api_call():
            # Actual API call implementation
            return await self._make_chat_request(messages)
        
        try:
            result = await self.error_handler.handle_request(
                "chat_completions", api_call
            )
            return result
        
        except Exception as e:
            # Format error for user
            formatted_error = self.error_handler.user_error_formatter.format_error_for_user(
                e, user_language
            )
            
            return {
                "error": True,
                "message": formatted_error['user_message'],
                "can_retry": formatted_error['retry_suggested'],
                "retry_after": formatted_error.get('retry_after')
            }
    
    async def _make_chat_request(self, messages: List[Dict[str, str]]) -> Dict[str, Any]:
        """Make actual chat API request"""
        # Implementation details...
        pass
```

## Best Practices Summary

### 1. Error Handling Principles

- **Fail Fast**: Don't hide errors, handle them appropriately
- **Graceful Degradation**: Provide fallback functionality when possible
- **User-Centric**: Show user-friendly messages in local languages
- **Observability**: Log errors for monitoring and debugging
- **Recovery**: Implement retry logic with exponential backoff

### 2. India-Specific Considerations

- **Network Variability**: Handle poor connectivity gracefully
- **Regional Endpoints**: Use regional fallbacks for better performance
- **Language Support**: Provide error messages in local languages
- **Device Constraints**: Optimize for low-end devices with limited resources

### 3. Monitoring and Alerting

- **Error Rates**: Monitor error rates by service and region
- **Performance Impact**: Track how errors affect user experience
- **Recovery Times**: Measure how quickly services recover
- **User Impact**: Understand which errors affect users most

## Next Steps

- Review [Authentication Guide](./authentication.md) for secure error handling
- Check [Rate Limits](./rate-limits.md) for rate limit error prevention
- See [Sarvam AI API](./sarvam-ai-api.md) for service-specific error codes

---

*This error handling guide is part of AssistantPro's comprehensive reliability and user experience strategy for India's emerging markets.*
