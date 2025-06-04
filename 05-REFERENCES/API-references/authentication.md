# Authentication Guide

> Complete authentication documentation for AssistantPro's Sarvam AI integration

## Overview

AssistantPro uses API key-based authentication for secure access to Sarvam AI services. This guide covers authentication setup, security best practices, and implementation patterns for the privacy-first AI platform.

## API Key Authentication

### Getting Your API Key

1. **Register with Sarvam AI**
   - Visit [Sarvam AI Console](https://www.sarvam.ai/)
   - Create developer account
   - Subscribe to required service plan

2. **Generate API Key**
   - Navigate to API Keys section
   - Create new key for AssistantPro
   - Copy and securely store the key

### Authentication Headers

All API requests require the following header:

```http
Content-Type: application/json
API-Subscription-Key: YOUR_API_KEY_HERE
```

### Implementation Examples

#### Python Implementation

```python
import os
import requests
from typing import Optional

class SarvamAuthenticator:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('SARVAM_API_KEY')
        if not self.api_key:
            raise ValueError("API key is required")
    
    def get_headers(self) -> dict:
        """Get authentication headers for API requests"""
        return {
            'Content-Type': 'application/json',
            'API-Subscription-Key': self.api_key
        }
    
    def make_authenticated_request(self, url: str, data: dict) -> requests.Response:
        """Make authenticated request to Sarvam AI API"""
        headers = self.get_headers()
        
        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            raise SarvamAPIError(f"Request failed: {str(e)}")

# Usage
auth = SarvamAuthenticator()
headers = auth.get_headers()
```

#### JavaScript/Node.js Implementation

```javascript
class SarvamAuth {
    constructor(apiKey = null) {
        this.apiKey = apiKey || process.env.SARVAM_API_KEY;
        if (!this.apiKey) {
            throw new Error('API key is required');
        }
    }
    
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'API-Subscription-Key': this.apiKey
        };
    }
    
    async makeAuthenticatedRequest(url, data) {
        const headers = this.getHeaders();
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
}

// Usage
const auth = new SarvamAuth();
const headers = auth.getHeaders();
```

#### React/Frontend Implementation

```javascript
// utils/sarvamAuth.js
export class SarvamAuthClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.sarvam.ai';
    }
    
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'API-Subscription-Key': this.apiKey
        };
    }
    
    async authenticatedFetch(endpoint, data) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = this.getHeaders();
        
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
        
        return response.json();
    }
}
```

## Environment Configuration

### Development Environment

```bash
# .env.local
SARVAM_API_KEY=your_development_api_key_here
SARVAM_BASE_URL=https://api.sarvam.ai
```

### Production Environment

```bash
# .env.production
SARVAM_API_KEY=your_production_api_key_here
SARVAM_BASE_URL=https://api.sarvam.ai
```

### Docker Configuration

```dockerfile
# Dockerfile
ENV SARVAM_API_KEY=""
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  assistantpro:
    environment:
      - SARVAM_API_KEY=${SARVAM_API_KEY}
```

## Security Best Practices

### 1. API Key Protection

```python
# ✅ Good: Use environment variables
import os
api_key = os.getenv('SARVAM_API_KEY')

# ❌ Bad: Hardcode in source code
api_key = "sk-1234567890abcdef"  # Never do this
```

### 2. Key Rotation Strategy

```python
class APIKeyManager:
    def __init__(self):
        self.primary_key = os.getenv('SARVAM_API_KEY_PRIMARY')
        self.backup_key = os.getenv('SARVAM_API_KEY_BACKUP')
    
    def get_active_key(self):
        """Get currently active API key with fallback"""
        return self.primary_key or self.backup_key
    
    def rotate_keys(self):
        """Implement key rotation logic"""
        # Switch primary and backup keys
        self.primary_key, self.backup_key = self.backup_key, self.primary_key
```

### 3. Request Validation

```python
def validate_api_key(api_key: str) -> bool:
    """Validate API key format"""
    if not api_key:
        return False
    
    # Check basic format (adjust based on Sarvam AI key format)
    if len(api_key) < 20:
        return False
        
    # Add more validation as needed
    return True
```

## Error Handling

### Authentication Errors

```python
class AuthenticationError(Exception):
    """Raised when authentication fails"""
    pass

def handle_auth_error(response):
    """Handle authentication-related errors"""
    if response.status_code == 401:
        raise AuthenticationError("Invalid API key")
    elif response.status_code == 403:
        raise AuthenticationError("API key lacks required permissions")
    elif response.status_code == 429:
        raise AuthenticationError("Rate limit exceeded")
```

### Retry Logic with Authentication

```python
import time
from typing import Callable

def with_auth_retry(func: Callable, max_retries: int = 3):
    """Retry function with authentication error handling"""
    for attempt in range(max_retries):
        try:
            return func()
        except AuthenticationError as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(2 ** attempt)  # Exponential backoff
```

## Testing Authentication

### Unit Tests

```python
import pytest
from unittest.mock import patch, Mock

def test_authentication_headers():
    """Test authentication header generation"""
    auth = SarvamAuthenticator("test-key")
    headers = auth.get_headers()
    
    assert headers['Content-Type'] == 'application/json'
    assert headers['API-Subscription-Key'] == 'test-key'

def test_missing_api_key():
    """Test error handling for missing API key"""
    with pytest.raises(ValueError):
        SarvamAuthenticator(None)

@patch('requests.post')
def test_authenticated_request(mock_post):
    """Test authenticated API request"""
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {'success': True}
    mock_post.return_value = mock_response
    
    auth = SarvamAuthenticator("test-key")
    response = auth.make_authenticated_request(
        "https://api.sarvam.ai/test", 
        {"test": "data"}
    )
    
    assert response.json()['success'] is True
    mock_post.assert_called_once()
```

## Integration with AssistantPro

### Service Layer Integration

```python
# services/sarvam_service.py
from .authentication import SarvamAuthenticator

class SarvamService:
    def __init__(self):
        self.auth = SarvamAuthenticator()
        self.base_url = "https://api.sarvam.ai"
    
    async def chat_completion(self, messages: list):
        """Chat completion with authentication"""
        url = f"{self.base_url}/chat/completions"
        data = {
            "model": "sarvamai/sarvam-2b-v0.5",
            "messages": messages
        }
        
        response = self.auth.make_authenticated_request(url, data)
        return response.json()
```

### Privacy-First Implementation

```python
class PrivacyAwareSarvamAuth:
    """Authentication with privacy safeguards"""
    
    def __init__(self, api_key: str):
        self.api_key = self._sanitize_key(api_key)
        self.request_log = []  # Local logging only
    
    def _sanitize_key(self, key: str) -> str:
        """Sanitize API key for logging"""
        if len(key) > 8:
            return f"{key[:4]}{'*' * (len(key) - 8)}{key[-4:]}"
        return "*" * len(key)
    
    def log_request(self, endpoint: str, status: int):
        """Log request without sensitive data"""
        self.request_log.append({
            'endpoint': endpoint,
            'status': status,
            'timestamp': time.time(),
            'api_key_hint': self._sanitize_key(self.api_key)
        })
```

## Monitoring and Observability

### Authentication Metrics

```python
import logging

class AuthMetrics:
    def __init__(self):
        self.logger = logging.getLogger('sarvam_auth')
        self.success_count = 0
        self.failure_count = 0
    
    def log_success(self):
        """Log successful authentication"""
        self.success_count += 1
        self.logger.info("Authentication successful")
    
    def log_failure(self, error: str):
        """Log authentication failure"""
        self.failure_count += 1
        self.logger.warning(f"Authentication failed: {error}")
    
    def get_metrics(self):
        """Get authentication metrics"""
        return {
            'success_rate': self.success_count / (self.success_count + self.failure_count),
            'total_requests': self.success_count + self.failure_count
        }
```

## Compliance and Privacy

### GDPR Compliance

- API keys are stored securely and not logged in plain text
- User data is not transmitted with authentication requests
- Key rotation capabilities for enhanced security

### Indian Data Protection

- Authentication tokens remain within Indian data centers when possible
- No third-party authentication providers used
- Direct API key management for maximum control

## Troubleshooting

### Common Issues

1. **Invalid API Key Error**
   ```
   Status: 401 Unauthorized
   Solution: Verify API key is correct and active
   ```

2. **Rate Limit Exceeded**
   ```
   Status: 429 Too Many Requests
   Solution: Implement exponential backoff
   ```

3. **Permissions Error**
   ```
   Status: 403 Forbidden
   Solution: Check API key has required permissions
   ```

### Debug Mode

```python
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)

# Test authentication
auth = SarvamAuthenticator()
auth.logger.setLevel(logging.DEBUG)
```

## Next Steps

- Review [Rate Limits](./rate-limits.md) for usage optimization
- Check [Error Handling](./error-handling.md) for comprehensive error management
- See [Sarvam AI API](./sarvam-ai-api.md) for complete API documentation

---

*This authentication guide is part of AssistantPro's comprehensive API documentation suite.*
