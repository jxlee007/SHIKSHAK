---
title: Language Identification API- A Hands-on Guide
description: >-
  A step-by-step guide on how to use the Sarvam AI Language Identification API
  for language detection tasks.
---


### **Overview**

This notebook demonstrates how to use the **Language Identification API** to detect the language code and script code. Also, we will see how we can use language identification in translate and transliterate to auto-detect the source code and do the respective transformations.

## **Table of Contents**

1. [Installation](#installation)
2. [Authentication](#authentication)
3. [Basic Usage](#basic-usage)
4. [Auto Detection](#auto-detection)
5. [Error Handling](#error-handling)
6. [Conclusion](#conclusion)

## **1️⃣ Setup & Installation**

Before you begin, ensure you have the necessary Python libraries installed. Run the following commands to install the required packages:

```python
!pip install requests
```

```python
import requests
```

## **2️⃣ Authentication**

To use the API, you need an API subscription key. Follow these steps to set up your API key:

1. **Obtain your API key**: If you don’t have an API key, sign up on the [Sarvam AI Dashboard](https://dashboard.sarvam.ai/) to get one.
2. **Replace the placeholder key**: In the code below, replace "YOUR_SARVAM_AI_API_KEY" with your actual API key.

```python
SARVAM_API_KEY = "Your API Key"
```

## **3️⃣ Basic Usage**

The API requires a single key parameter:

✔ **`input`** – The text for which the language code and script code need to be detected.

🚫 **Note:** If the API is unable to detect the language or script, it will return `null` for both fields.

### **Response Parameters**

- **`language_code`** (String) – The detected language in BCP-47 format. Supported values:

  - `"en-IN"` (English - India)
  - `"en-US"` (English - United States)
  - `"bn-IN"` (Bengali - India)
  - `"gu-IN"` (Gujarati - India)
  - `"hi-IN"` (Hindi - India)
  - `"kn-IN"` (Kannada - India)
  - `"ml-IN"` (Malayalam - India)
  - `"mr-IN"` (Marathi - India)
  - `"od-IN"` (Odia - India)
  - `"pa-IN"` (Punjabi - India)
  - `"ta-IN"` (Tamil - India)
  - `"te-IN"` (Telugu - India)
  - `"ur-IN"` (Urdu - India)

- **`script_code`** (String) – The detected writing script in ISO-15924 format. Supported values:
  - `"Latn"` → Latin (Roman script)
  - `"Beng"` → Bengali script
  - `"Gujr"` → Gujarati script
  - `"Deva"` → Devanagari script
  - `"Knda"` → Kannada script
  - `"Mlym"` → Malayalam script
  - `"Orya"` → Odia script
  - `"Guru"` → Gurmukhi (Punjabi) script
  - `"Taml"` → Tamil script
  - `"Telu"` → Telugu script
  - `"Arab"` → Arabic script

```python
import requests

url = "https://api.sarvam.ai/text-lid"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}
```

```python
example_text="hey, what is your name?"
```

```python
payload = {
    "input": example_text
}

# Send API request
response = requests.post(url, json=payload, headers=headers)

# Process response
if response.status_code == 200:
    data = response.json()
    language_code = data.get("language_code", "Language not detected")
    script_code = data.get("script_code", "Script not detected")

    print("\n=== Detection Results ===")
    print(f"Detected Language Code: {language_code}")
    print(f"Detected Script Code: {script_code}\n")
else:
    print(f"Error: {response.status_code}, {response.text}")
```

```python
example_text="A'in jun aatinob'aal li maare ink'a' neketaw ru."
```

```python
payload = {
    "input": example_text
}

# Send API request
response = requests.post(url, json=payload, headers=headers)

# Process response
if response.status_code == 200:
    data = response.json()
    language_code = data.get("language_code", "Language not detected")
    script_code = data.get("script_code", "Script not detected")

    print("\n=== Detection Results ===")
    print(f"Detected Language Code: {language_code}")
    print(f"Detected Script Code: {script_code}\n")
else:
    print(f"Error: {response.status_code}, {response.text}")
```

## **4️⃣ Auto Detection**

To enable automatic language detection, pass `"auto"` as the `source_language_code`. The API will return the transliterated/translated text along with the detected source language code.

🚫 **Note:** In case of detection failure, manually specify the `source_language_code` with one of the supported language codes.

If the API is unable to detect the language, the response will include an error message:

```json
{
  "error": {
    "message": "Unable to detect the language of the input text. Please explicitly pass the `source_language_code` parameter with a supported language.",
    "code": "unprocessable_entity_error"
  }
}
```

### Auto Detection in Transliterate

```python
import requests

# Define API request details
url = "https://api.sarvam.ai/transliterate"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}
```

```python
payload = {
    "input": "मुझे कल 9:30am को appointment है",
    "source_language_code": "auto",
    "target_language_code": "hi-IN",
    "spoken_form": True,
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    response_data = response.json()
    transliterated_text = response_data.get("transliterated_text", "Translation not available")
    source_language_code = response_data.get("source_language_code")

    print(f"✅ Transliteration Successful!\n🔤 Transliterated Text: {transliterated_text}")
    print(f"🌍 Detected Source Language: {source_language_code}")
else:
    print(f"❌ Error {response.status_code}: {response.text}")
```

```python
payload = {
    "input": "A'in jun aatinob'aal li maare ink'a' neketaw ru.",
    "source_language_code": "auto",
    "target_language_code": "hi-IN",
    "spoken_form": True,
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    response_data = response.json()
    transliterated_text = response_data.get("transliterated_text", "Translation not available")
    source_language_code = response_data.get("source_language_code")

    print(f"✅ Transliteration Successful!\n🔤 Transliterated Text: {transliterated_text}")
    print(f"🌍 Detected Source Language: {source_language_code}")
else:
    print(f"❌ Error {response.status_code}: {response.text}")
```

### Auto Detection in Translate

```python
import requests

# Define API request details
url = "https://api.sarvam.ai/translate"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}
```

```python
import requests

payload = {
    "source_language_code": "auto",
    "target_language_code": "bn-IN",
    "speaker_gender": "Male",
    "mode": "classic-colloquial",
    "model": "mayura:v1",
    "input": "मुझे कल 9:30am को appointment है"
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    response_data = response.json()
    translated_text = response_data.get("translated_text", "Translation not available")
    source_language_code = response_data.get("source_language_code", "Unknown")

    print(f"✅ Translation Successful!\n🌍 Detected Source Language: {source_language_code}")
    print(f"📝 Translated Text: {translated_text}")
else:
    print(f"❌ Error {response.status_code}: {response.text}")
```

## **5️⃣ Error Handling**

You may encounter these errors while using the API:

- **403 Forbidden** (`invalid_api_key_error`)

  - Cause: Invalid API key.
  - Solution: Use a valid API key from the [Sarvam AI Dashboard](https://dashboard.sarvam.ai/).

- **429 Too Many Requests** (`insufficient_quota_error`)

  - Cause: Exceeded API quota.
  - Solution: Check your usage, upgrade if needed, or implement exponential backoff when retrying.

- **500 Internal Server Error** (`internal_server_error`)

  - Cause: Issue on our servers.
  - Solution: Try again later. If persistent, contact support.

- **400 Bad Request** (`invalid_request_error`)

  - Cause: Incorrect request formatting.
  - Solution: Verify your request structure and parameters.

- **422 Unprocessable Entity Request** (`unprocessable_entity_error`)
  - Cause: Unable to detect the language of the input text.
  - Solution: Explicitly pass the source_language_code parameter with a supported language.

## **6️⃣ Conclusion**

For more details, refer to our official documentation and we are always there to support and help you on our Discord Server:

- **Documentation**: [docs.sarvam.ai](https://docs.sarvam.ai)
- **Community**: [Join the Discord Community](https://discord.gg/hTuVuPNF)

**Final Notes**

- Keep your API key secure.
- Use clear audio for best results.
- Explore advanced features like diarization and translation.

**Keep Building!** 🚀