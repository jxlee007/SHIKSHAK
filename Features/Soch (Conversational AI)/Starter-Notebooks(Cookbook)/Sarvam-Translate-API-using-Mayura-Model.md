---
title: 'Sarvam Translate API using Mayura Model '
description: >-
  A comprehensive guide to using the Sarvam Translate API to translate text
  between languages with advanced features like transliteration, output scripts,
  and gender options
---

# Overview

This tutorial demonstrates how to use the **Sarvam Translate API** to translate texts/paragraphs from one language to another. The API supports additional features such as transliteration (a type of conversion of a text from one script to another that involves swapping letters), output_script and gender.

## Table of Contents

1. [Installation](#installation)
2. [Authentication](#authentication)
3. [Basic Usage](#basic-usage)
4. [Translation Modes](#translation-modes)
5. [Advanced Features](#advanced-features)
6. [Error Handling](#error-handling)
7. [Additional Resources](#additional-resources)
8. [Final Notes](#final-notes)

## 1. Installation

Before you begin, ensure you have the necessary Python libraries installed. Run the following commands to install the required packages:

```python
pip install requests
```

```python
import requests
```

## 2. Authentication

To use the Sarvam API, you need an API subscription key. Follow these steps to set up your API key:

1. **Obtain your API key**: If you don't have an API key, sign up on the [Sarvam AI Dashboard](https://dashboard.sarvam.ai/) to get one.
2. **Replace the placeholder key**: In the code below, replace "YOUR_SARVAM_AI_API_KEY" with your actual API key.

```python
SARVAM_API_KEY = "YOUR_SARVAM_API_KEY"
```

## 3. Basic Usage

### 3.1. Read the Document

We have two sample documents under the `data` folder:

- `sample1.txt` contains an essay on _The Impact of Artificial Intelligence on Society_ in English.
- `sample2.txt` contains an essay on _The Impact of Artificial Intelligence on Society_ in Hindi.

```python
def read_file(file_path, lang_name):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            # Read the first 5 lines
            lines = [next(file) for _ in range(5)]
            print(f"=== {lang_name} Text (First Few Lines) ===")
            print("".join(lines))  # Print first few lines

            # Read the remaining content
            remaining_text = file.read()

            # Combine all text
            full_doc = "".join(lines) + remaining_text

            # Count total characters
            total_chars = len(full_doc)
            print(f"\nTotal number of characters in {lang_name} file:", total_chars)

            return full_doc
    except FileNotFoundError:
        print(f"Error: {file_path} not found.")
        return None
    except Exception as e:
        print(f"An error occurred while reading {file_path}: {e}")
        return None
```

```python
# Read English and Hindi documents
english_doc = read_file("data/sample1.txt", "English")
hindi_doc = read_file("data/sample2.txt", "Hindi")
```

### 3.2. Split the text into chunks

Since the API has a restriction of 1000 characters per request, we need to split the text accordingly.

```python
def chunk_text(text, max_length=1000):
    """Splits text into chunks of at most max_length characters while preserving word boundaries."""
    chunks = []

    while len(text) > max_length:
        split_index = text.rfind(" ", 0, max_length)  # Find the last space within limit
        if split_index == -1:
            split_index = max_length  # No space found, force split at max_length

        chunks.append(text[:split_index].strip())  # Trim spaces before adding
        text = text[split_index:].lstrip()  # Remove leading spaces for the next chunk

    if text:
        chunks.append(text.strip())  # Add the last chunk

    return chunks
```

```python
# Split the text
english_text_chunks = chunk_text(english_doc)

# Display chunk info
print(f"Total Chunks: {len(english_text_chunks)}")
for i, chunk in enumerate(english_text_chunks[:3], 1):  # Show only first 3 chunks for preview
    print(f"\n=== Chunk {i} (Length: {len(chunk)}) ===\n{chunk}")
```

### 3.3. Setting up the API Endpoint

There are three main types of translations supported:

1. **English to Indic** - Translating from English to Indian languages
2. **Indic to English** - Converting Indian languages to English
3. **Indic to Indic** - Translating between Indian languages

#### Indic to English Translation

```python
# Define API request details
url = "https://api.sarvam.ai/translate"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}

# Send requests for each chunk
translated_texts = []
for idx, chunk in enumerate(hindi_text_chunks):
    payload = {
        "source_language_code": "hi-IN",
        "target_language_code": "en-IN",
        "speaker_gender": "Male",
        "mode": "classic-colloquial",
        "model": "mayura:v1",
        "enable_preprocessing": False,
        "input": chunk
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        translated_text = response.json().get("translated_text", "Translation not available")
        translated_texts.append(translated_text)
        print(f"\n=== Translated Chunk {idx + 1} ===\n{translated_text}\n")
    else:
        print(f"Error: {response.status_code}, {response.text}")

# Combine all translated chunks
final_translation = "\n".join(translated_texts)
print("\n=== Final Translated Text ===")
print(final_translation)
```

#### Indic to Indic Translation

```python
# Define API request details
url = "https://api.sarvam.ai/translate"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}

# Send requests for each chunk
translated_texts = []
for idx, chunk in enumerate(hindi_text_chunks):
    payload = {
        "source_language_code": "hi-IN",
        "target_language_code": "bn-IN",
        "speaker_gender": "Male",
        "mode": "classic-colloquial",
        "model": "mayura:v1",
        "enable_preprocessing": False,
        "input": chunk
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        translated_text = response.json().get("translated_text", "Translation not available")
        translated_texts.append(translated_text)
        print(f"\n=== Translated Chunk {idx + 1} ===\n{translated_text}\n")
    else:
        print(f"Error: {response.status_code}, {response.text}")

# Combine all translated chunks
final_translation = "\n".join(translated_texts)
print("\n=== Final Translated Text ===")
print(final_translation)
```

#### English to Indic Translation

```python
# Define API request details
url = "https://api.sarvam.ai/translate"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}

# Send requests for each chunk
translated_texts = []
for idx, chunk in enumerate(english_text_chunks):
    payload = {
        "source_language_code": "en-IN",
        "target_language_code": "pa-IN",
        "speaker_gender": "Male",
        "mode": "classic-colloquial",
        "model": "mayura:v1",
        "enable_preprocessing": False,
        "input": chunk
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        translated_text = response.json().get("translated_text", "Translation not available")
        translated_texts.append(translated_text)
        print(f"\n=== Translated Chunk {idx + 1} ===\n{translated_text}\n")
    else:
        print(f"Error: {response.status_code}, {response.text}")

# Combine all translated chunks
final_translation = "\n".join(translated_texts)
print("\n=== Final Translated Text ===")
print(final_translation)
```

## 4. Translation Modes

### Translation Modes & Differences

1. **Formal** – Highly professional, uses pure Hindi (e.g., "कुल राशि", "देय है"). Suitable for official documents, legal papers, and corporate communication.
2. **Classic-Colloquial** – Balanced mix of Hindi & English, slightly informal (e.g., "कुल जोड़", "देना होगा"). Ideal for business emails, customer support, and semi-formal communication.
3. **Modern-Colloquial** – Hinglish, casual, and direct (e.g., "Invoice total", "due है", "contact करो"). Best for chatbots, social media, and casual conversations.

**Rule of Thumb:**

- Use Formal for official content
- Use Classic-Colloquial for general communication
- Use Modern-Colloquial for everyday conversations

```python
# To highlight the difference between the models lets use the below example.
full_text = (
    "The invoice total is $3,450.75, due by 15th March 2025. Contact us at support@example.com for queries. "
    "Order #987654321 was placed on 02/29/2024. Your tracking ID is TRK12345678."
)
```

```python
# Define API request details
url = "https://api.sarvam.ai/translate"
headers = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}
```

### 4.1. Classic Colloquial

```python
# Create the request payload
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Male",
    "mode": "classic-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

### 4.2. Formal

```python
# Create the request payload
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Male",
    "mode": "formal",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

### 4.3. Modern Colloquial

```python
# Create the request payload
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Male",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

## 5. Advanced Features

### 5.1. Speaker Gender

The translation model supports **Male** and **Female** speaker options, which impact the tone and style of the output.

#### Female

```python
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Female",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

#### Male

```python
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Male",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "input": full_text
}

response = requests.post(url, json=payload, headers=headers)
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

### 5.2. Numerals Format Feature

The `numerals_format` parameter controls how numbers appear in the translation. It has two options:

1. **International (Default)** - Uses standard 0-9 numerals.
   Example: "मेरा phone number है: 9840950950."
   Best for universally understood content, technical documents, and modern usage.

2. **Native** - Uses language-specific numerals.
   Example: "मेरा phone number है: ९८४०९५०९५०."
   Ideal for traditional texts, cultural adaptation, and regional content.

**When to Use What?**

- Use **International** for wider readability and digital content
- Use **Native** for localized, heritage-focused, and print media content

#### Native

```python
# Create the request payload
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Female",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "numerals_format": "native",
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

#### International

```python
# Create the request payload
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Female",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "numerals_format": "international",
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

### 5.3. Output Script Feature

The `output_script` parameter controls how the translated text is **transliterated**, i.e., how it appears in different scripts while keeping pronunciation intact.

#### Transliteration Options:

1. **Default (null)** – No transliteration applied.
   Example: "आपका Rs. 3000 का EMI pending है।"
   Best for modern, mixed-language content.

2. **Roman** – Converts the output into Romanized Hindi.
   Example: "aapka Rs. 3000 ka EMI pending hai."
   Ideal for users who can speak but not read native scripts.

3. **Fully-Native** – Uses formal native script transliteration.
   Example: "आपका रु. 3000 का ई.एम.ऐ. पेंडिंग है।"
   Best for official documents and structured writing.

4. **Spoken-Form-in-Native** – Uses native script but mimics spoken style.
   Example: "आपका थ्री थाउजेंड रूपीस का ईएमअइ पेंडिंग है।"
   Ideal for voice assistants, conversational AI, and informal speech.

**When to Use What?**

- **Default** – For natural, mixed-language modern writing
- **Roman** – For users unfamiliar with native scripts
- **Fully-Native** – For formal, structured translations
- **Spoken-Form-in-Native** – For casual speech and voice applications

```python
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Female",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "output_script":"roman",
    "numerals_format": "international",
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

```python
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Female",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "output_script":"spoken-form-in-native",
    "numerals_format": "international",
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

```python
# Create the request payload
payload = {
    "source_language_code": "en-IN",
    "target_language_code": "hi-IN",
    "speaker_gender": "Female",
    "mode": "modern-colloquial",
    "model": "mayura:v1",
    "enable_preprocessing": False,
    "output_script":"fully-native",
    "numerals_format": "international",
    "input": full_text
}

# Send the request
response = requests.post(url, json=payload, headers=headers)

# Check the response
if response.status_code == 200:
    translated_text = response.json().get("translated_text", "Translation not available")
    print("\n=== Translated Text ===\n", translated_text)
else:
    print(f"Error: {response.status_code}, {response.text}")
```

## 6. Error Handling

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

## 7. Additional Resources

For more details, refer to our official documentation and we are always there to support and help you on our Discord Server:

- **Documentation**: [docs.sarvam.ai](https://docs.sarvam.ai)
- **Community**: [Join the Discord Community](https://discord.gg/hTuVuPNF)

## 8. Final Notes

- Keep your API key secure.
- Use clear audio for best results.
- Explore advanced features like diarization and translation.

**Keep Building!** 🚀