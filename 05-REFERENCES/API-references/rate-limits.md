# Rate Limits and Optimization Guide

> Comprehensive rate limiting strategy and optimization techniques for AssistantPro's Sarvam AI integration

## Overview

This guide covers rate limiting policies, optimization strategies, and best practices for managing API usage in AssistantPro while maintaining optimal performance for India's diverse user base.

## Rate Limit Structure

### Current Sarvam AI Limits

| Service | Requests/Minute | Requests/Hour | Requests/Day |
|---------|----------------|---------------|--------------|
| Chat Completions | 60 | 1,800 | 10,000 |
| Text-to-Speech | 100 | 3,000 | 15,000 |
| Speech-to-Text | 100 | 3,000 | 15,000 |
| Translation | 120 | 3,600 | 20,000 |

*Note: Limits may vary based on subscription tier*

### Response Headers

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
X-RateLimit-Reset-After: 3600
```

## Implementation Strategies

### 1. Rate Limit Tracking

```python
import time
from typing import Dict, Optional
from dataclasses import dataclass
from threading import Lock

@dataclass
class RateLimitInfo:
    limit: int
    remaining: int
    reset_time: int
    reset_after: int

class RateLimitTracker:
    def __init__(self):
        self.limits: Dict[str, RateLimitInfo] = {}
        self.lock = Lock()
    
    def update_from_headers(self, service: str, headers: dict):
        """Update rate limit info from API response headers"""
        with self.lock:
            self.limits[service] = RateLimitInfo(
                limit=int(headers.get('X-RateLimit-Limit', 0)),
                remaining=int(headers.get('X-RateLimit-Remaining', 0)),
                reset_time=int(headers.get('X-RateLimit-Reset', 0)),
                reset_after=int(headers.get('X-RateLimit-Reset-After', 0))
            )
    
    def can_make_request(self, service: str) -> bool:
        """Check if request can be made without hitting rate limit"""
        with self.lock:
            if service not in self.limits:
                return True
            
            limit_info = self.limits[service]
            
            # Check if reset time has passed
            if time.time() >= limit_info.reset_time:
                return True
            
            return limit_info.remaining > 0
    
    def get_wait_time(self, service: str) -> Optional[int]:
        """Get seconds to wait before next request"""
        with self.lock:
            if service not in self.limits:
                return None
            
            limit_info = self.limits[service]
            
            if limit_info.remaining > 0:
                return None
            
            return max(0, limit_info.reset_time - int(time.time()))
```

### 2. Request Queue Management

```python
import asyncio
from collections import deque
from typing import Callable, Any

class RequestQueue:
    def __init__(self, max_concurrent: int = 5):
        self.queue = deque()
        self.max_concurrent = max_concurrent
        self.active_requests = 0
        self.rate_tracker = RateLimitTracker()
    
    async def add_request(self, service: str, request_func: Callable, *args, **kwargs):
        """Add request to queue with rate limiting"""
        request_item = {
            'service': service,
            'func': request_func,
            'args': args,
            'kwargs': kwargs,
            'future': asyncio.Future()
        }
        
        self.queue.append(request_item)
        await self._process_queue()
        
        return await request_item['future']
    
    async def _process_queue(self):
        """Process queued requests with rate limiting"""
        while self.queue and self.active_requests < self.max_concurrent:
            request = self.queue[0]
            service = request['service']
            
            # Check rate limits
            if not self.rate_tracker.can_make_request(service):
                wait_time = self.rate_tracker.get_wait_time(service)
                if wait_time:
                    await asyncio.sleep(wait_time)
                    continue
            
            # Execute request
            request = self.queue.popleft()
            self.active_requests += 1
            
            asyncio.create_task(self._execute_request(request))
    
    async def _execute_request(self, request):
        """Execute individual request"""
        try:
            result = await request['func'](*request['args'], **request['kwargs'])
            request['future'].set_result(result)
        except Exception as e:
            request['future'].set_exception(e)
        finally:
            self.active_requests -= 1
            await self._process_queue()
```

### 3. Intelligent Batching

```python
class BatchProcessor:
    def __init__(self, batch_size: int = 10, batch_timeout: float = 2.0):
        self.batch_size = batch_size
        self.batch_timeout = batch_timeout
        self.pending_requests = []
        self.batch_timer = None
    
    async def add_request(self, request_data: dict):
        """Add request to batch"""
        self.pending_requests.append(request_data)
        
        # Start timer for batch processing
        if self.batch_timer is None:
            self.batch_timer = asyncio.create_task(
                self._batch_timeout_handler()
            )
        
        # Process immediately if batch is full
        if len(self.pending_requests) >= self.batch_size:
            await self._process_batch()
    
    async def _batch_timeout_handler(self):
        """Handle batch timeout"""
        await asyncio.sleep(self.batch_timeout)
        if self.pending_requests:
            await self._process_batch()
    
    async def _process_batch(self):
        """Process accumulated batch"""
        if not self.pending_requests:
            return
        
        batch = self.pending_requests.copy()
        self.pending_requests.clear()
        
        if self.batch_timer:
            self.batch_timer.cancel()
            self.batch_timer = None
        
        # Process batch efficiently
        await self._execute_batch(batch)
    
    async def _execute_batch(self, batch: list):
        """Execute batch of requests"""
        # Group by service type for optimal processing
        service_groups = {}
        for request in batch:
            service = request.get('service', 'default')
            if service not in service_groups:
                service_groups[service] = []
            service_groups[service].append(request)
        
        # Process each service group
        tasks = []
        for service, requests in service_groups.items():
            task = asyncio.create_task(
                self._process_service_batch(service, requests)
            )
            tasks.append(task)
        
        await asyncio.gather(*tasks)
```

## Optimization Techniques

### 1. Caching Strategy

```python
import hashlib
import json
from typing import Optional, Any
from datetime import datetime, timedelta

class ResponseCache:
    def __init__(self, ttl_minutes: int = 60):
        self.cache = {}
        self.ttl = timedelta(minutes=ttl_minutes)
    
    def _generate_key(self, service: str, params: dict) -> str:
        """Generate cache key from service and parameters"""
        cache_data = {
            'service': service,
            'params': sorted(params.items())
        }
        cache_string = json.dumps(cache_data, sort_keys=True)
        return hashlib.md5(cache_string.encode()).hexdigest()
    
    def get(self, service: str, params: dict) -> Optional[Any]:
        """Get cached response"""
        key = self._generate_key(service, params)
        
        if key in self.cache:
            cached_item = self.cache[key]
            if datetime.now() - cached_item['timestamp'] < self.ttl:
                return cached_item['data']
            else:
                del self.cache[key]
        
        return None
    
    def set(self, service: str, params: dict, data: Any):
        """Cache response"""
        key = self._generate_key(service, params)
        self.cache[key] = {
            'data': data,
            'timestamp': datetime.now()
        }
    
    def clear_expired(self):
        """Clear expired cache entries"""
        current_time = datetime.now()
        expired_keys = [
            key for key, value in self.cache.items()
            if current_time - value['timestamp'] >= self.ttl
        ]
        
        for key in expired_keys:
            del self.cache[key]
```

### 2. Adaptive Rate Management

```python
class AdaptiveRateManager:
    def __init__(self):
        self.success_rates = {}
        self.adaptive_delays = {}
        self.min_delay = 0.1
        self.max_delay = 5.0
    
    def record_request(self, service: str, success: bool, response_time: float):
        """Record request outcome for adaptive management"""
        if service not in self.success_rates:
            self.success_rates[service] = []
            self.adaptive_delays[service] = self.min_delay
        
        self.success_rates[service].append({
            'success': success,
            'response_time': response_time,
            'timestamp': time.time()
        })
        
        # Keep only recent data (last 100 requests)
        if len(self.success_rates[service]) > 100:
            self.success_rates[service] = self.success_rates[service][-100:]
        
        self._adjust_delay(service)
    
    def _adjust_delay(self, service: str):
        """Adjust delay based on success rate and response times"""
        recent_requests = self.success_rates[service][-20:]  # Last 20 requests
        
        if not recent_requests:
            return
        
        success_rate = sum(1 for r in recent_requests if r['success']) / len(recent_requests)
        avg_response_time = sum(r['response_time'] for r in recent_requests) / len(recent_requests)
        
        current_delay = self.adaptive_delays[service]
        
        # Increase delay if success rate is low or response time is high
        if success_rate < 0.8 or avg_response_time > 2.0:
            new_delay = min(current_delay * 1.5, self.max_delay)
        else:
            new_delay = max(current_delay * 0.9, self.min_delay)
        
        self.adaptive_delays[service] = new_delay
    
    def get_delay(self, service: str) -> float:
        """Get adaptive delay for service"""
        return self.adaptive_delays.get(service, self.min_delay)
```

### 3. Priority Queue Implementation

```python
import heapq
from enum import Enum
from dataclasses import dataclass, field
from typing import Any

class Priority(Enum):
    HIGH = 1
    MEDIUM = 2
    LOW = 3

@dataclass
class PriorityRequest:
    priority: Priority
    timestamp: float
    service: str
    request_func: Any
    args: tuple = field(default_factory=tuple)
    kwargs: dict = field(default_factory=dict)
    future: Any = field(default=None)
    
    def __lt__(self, other):
        if self.priority.value != other.priority.value:
            return self.priority.value < other.priority.value
        return self.timestamp < other.timestamp

class PriorityRequestQueue:
    def __init__(self):
        self.queue = []
        self.rate_tracker = RateLimitTracker()
    
    async def add_request(self, priority: Priority, service: str, 
                         request_func: Callable, *args, **kwargs):
        """Add prioritized request to queue"""
        request = PriorityRequest(
            priority=priority,
            timestamp=time.time(),
            service=service,
            request_func=request_func,
            args=args,
            kwargs=kwargs,
            future=asyncio.Future()
        )
        
        heapq.heappush(self.queue, request)
        await self._process_next()
        
        return await request.future
    
    async def _process_next(self):
        """Process next highest priority request"""
        if not self.queue:
            return
        
        # Get highest priority request that can be executed
        available_request = None
        temp_queue = []
        
        while self.queue:
            request = heapq.heappop(self.queue)
            
            if self.rate_tracker.can_make_request(request.service):
                available_request = request
                break
            else:
                temp_queue.append(request)
        
        # Restore queue
        for request in temp_queue:
            heapq.heappush(self.queue, request)
        
        if available_request:
            await self._execute_request(available_request)
    
    async def _execute_request(self, request: PriorityRequest):
        """Execute priority request"""
        try:
            result = await request.request_func(*request.args, **request.kwargs)
            request.future.set_result(result)
        except Exception as e:
            request.future.set_exception(e)
```

## India-Specific Optimizations

### 1. Network Condition Adaptation

```python
class NetworkAwareRateManager:
    def __init__(self):
        self.connection_quality = "good"  # good, fair, poor
        self.regional_delays = {
            "delhi": 0.1,
            "mumbai": 0.1,
            "bangalore": 0.15,
            "tier2": 0.3,
            "tier3": 0.5
        }
    
    def adjust_for_network(self, base_delay: float, region: str) -> float:
        """Adjust delay based on network conditions and region"""
        regional_multiplier = self.regional_delays.get(region, 0.3)
        
        quality_multipliers = {
            "good": 1.0,
            "fair": 1.5,
            "poor": 2.5
        }
        
        quality_multiplier = quality_multipliers.get(self.connection_quality, 1.5)
        
        return base_delay * regional_multiplier * quality_multiplier
    
    def detect_connection_quality(self, recent_response_times: list) -> str:
        """Detect connection quality from response times"""
        if not recent_response_times:
            return "good"
        
        avg_time = sum(recent_response_times) / len(recent_response_times)
        
        if avg_time < 0.5:
            return "good"
        elif avg_time < 1.5:
            return "fair"
        else:
            return "poor"
```

### 2. Device-Aware Optimization

```python
class DeviceAwareOptimizer:
    def __init__(self):
        self.device_profiles = {
            "high_end": {"concurrent_requests": 5, "cache_size": 1000},
            "mid_range": {"concurrent_requests": 3, "cache_size": 500},
            "low_end": {"concurrent_requests": 1, "cache_size": 100}
        }
    
    def get_device_profile(self, ram_gb: int, cpu_cores: int) -> str:
        """Determine device profile based on specifications"""
        if ram_gb >= 6 and cpu_cores >= 4:
            return "high_end"
        elif ram_gb >= 3 and cpu_cores >= 2:
            return "mid_range"
        else:
            return "low_end"
    
    def optimize_for_device(self, device_profile: str) -> dict:
        """Get optimization settings for device"""
        return self.device_profiles.get(device_profile, self.device_profiles["low_end"])
```

## Monitoring and Analytics

### 1. Rate Limit Metrics

```python
class RateLimitMetrics:
    def __init__(self):
        self.metrics = {
            'requests_made': 0,
            'requests_throttled': 0,
            'rate_limit_hits': 0,
            'average_wait_time': 0.0,
            'service_usage': {}
        }
    
    def record_request(self, service: str, throttled: bool = False, 
                      wait_time: float = 0.0):
        """Record request metrics"""
        self.metrics['requests_made'] += 1
        
        if throttled:
            self.metrics['requests_throttled'] += 1
        
        if wait_time > 0:
            self.metrics['rate_limit_hits'] += 1
            
            # Update average wait time
            current_avg = self.metrics['average_wait_time']
            total_hits = self.metrics['rate_limit_hits']
            self.metrics['average_wait_time'] = (
                (current_avg * (total_hits - 1) + wait_time) / total_hits
            )
        
        # Track service usage
        if service not in self.metrics['service_usage']:
            self.metrics['service_usage'][service] = 0
        self.metrics['service_usage'][service] += 1
    
    def get_efficiency_report(self) -> dict:
        """Generate efficiency report"""
        total_requests = self.metrics['requests_made']
        
        if total_requests == 0:
            return {'efficiency': 100.0, 'recommendations': []}
        
        efficiency = (
            (total_requests - self.metrics['requests_throttled']) / total_requests
        ) * 100
        
        recommendations = []
        
        if efficiency < 80:
            recommendations.append("Consider implementing request caching")
        
        if self.metrics['average_wait_time'] > 1.0:
            recommendations.append("Implement adaptive rate limiting")
        
        return {
            'efficiency': efficiency,
            'total_requests': total_requests,
            'throttled_requests': self.metrics['requests_throttled'],
            'average_wait_time': self.metrics['average_wait_time'],
            'recommendations': recommendations
        }
```

## Best Practices

### 1. Graceful Degradation

```python
class GracefulRateHandler:
    def __init__(self):
        self.fallback_strategies = {
            'chat': self._chat_fallback,
            'tts': self._tts_fallback,
            'stt': self._stt_fallback
        }
    
    async def handle_rate_limit(self, service: str, original_request: dict):
        """Handle rate limit with fallback strategies"""
        fallback = self.fallback_strategies.get(service)
        
        if fallback:
            return await fallback(original_request)
        
        # Default fallback: queue for later
        return await self._queue_for_retry(service, original_request)
    
    async def _chat_fallback(self, request: dict):
        """Fallback for chat requests"""
        # Use cached responses or simplified responses
        return {
            "message": "I'm experiencing high demand. Please try again in a moment.",
            "fallback": True
        }
    
    async def _tts_fallback(self, request: dict):
        """Fallback for TTS requests"""
        # Return text instead of audio
        return {
            "text": request.get("input", ""),
            "audio_url": None,
            "fallback": True
        }
    
    async def _stt_fallback(self, request: dict):
        """Fallback for STT requests"""
        # Queue for processing when rate limit resets
        return await self._queue_for_retry("stt", request)
```

### 2. Configuration Management

```python
# config/rate_limits.py
RATE_LIMIT_CONFIG = {
    "development": {
        "chat_completions": {"rpm": 60, "rph": 1800},
        "text_to_speech": {"rpm": 100, "rph": 3000},
        "speech_to_text": {"rpm": 100, "rph": 3000},
        "translation": {"rpm": 120, "rph": 3600}
    },
    "production": {
        "chat_completions": {"rpm": 300, "rph": 9000},
        "text_to_speech": {"rpm": 500, "rph": 15000},
        "speech_to_text": {"rpm": 500, "rph": 15000},
        "translation": {"rpm": 600, "rph": 18000}
    }
}

class RateLimitConfig:
    def __init__(self, environment: str = "development"):
        self.config = RATE_LIMIT_CONFIG.get(environment, RATE_LIMIT_CONFIG["development"])
    
    def get_limit(self, service: str, period: str = "rpm") -> int:
        """Get rate limit for service and period"""
        service_config = self.config.get(service, {})
        return service_config.get(period, 60)
```

## Error Recovery

### 1. Circuit Breaker Pattern

```python
import time
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    async def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection"""
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is open")
        
        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e
    
    def _on_success(self):
        """Handle successful request"""
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        """Handle failed request"""
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
```

## Testing Rate Limits

### 1. Load Testing

```python
import asyncio
import time
from concurrent.futures import ThreadPoolExecutor

async def rate_limit_load_test():
    """Test rate limiting under load"""
    start_time = time.time()
    tasks = []
    
    # Create 100 concurrent requests
    for i in range(100):
        task = asyncio.create_task(make_test_request(f"request_{i}"))
        tasks.append(task)
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    end_time = time.time()
    duration = end_time - start_time
    
    # Analyze results
    successful = sum(1 for r in results if not isinstance(r, Exception))
    rate_limited = sum(1 for r in results if isinstance(r, RateLimitError))
    
    print(f"Duration: {duration:.2f}s")
    print(f"Successful: {successful}")
    print(f"Rate Limited: {rate_limited}")
    print(f"Requests/second: {len(tasks)/duration:.2f}")

async def make_test_request(request_id: str):
    """Make a test request"""
    # Simulate API request
    await asyncio.sleep(0.1)
    return f"Response for {request_id}"
```

## Next Steps

- Review [Authentication Guide](./authentication.md) for secure API access
- Check [Error Handling](./error-handling.md) for comprehensive error management
- See [Sarvam AI API](./sarvam-ai-api.md) for complete API documentation

---

*This rate limiting guide is part of AssistantPro's comprehensive API optimization suite for India's emerging markets.*
