---
title: Text Preprocessing Quickstart
description: Get started with Sarvam AI Text Models
icon: lightbulb
---

<p
  style={{
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1.4",
    marginBottom: "1.5rem",
  }}
>
  Sarvam AI offers a powerful text preprocessing model:
</p>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  }}
>
  <Card title="Mayura" icon="language" href="models/mayura">
    Advanced text preprocessing model with translation, transliteration, and
    script conversion capabilities for Indian languages.
  </Card>
</div>

<Note>
  View our [pricing page](https://dashboard.sarvam.ai/admin/billing/plans) for
  detailed information about model-specific pricing and usage tiers.
</Note>

## Mayura: Our Text Preprocessing Model

Mayura is our state-of-the-art text preprocessing model that excels in handling Indian languages with features like translation, transliteration, and script conversion.

## Text Preprocessing Features

<Tabs>
  <Tab title="Basic Translation">
    <div className="mb-8">
      <h3>Basic Text Translation</h3>
      <p>
        Translate text between Indian languages with high accuracy. Features include:
      </p>
      <ul>
        <li>Support for multiple Indian languages</li>
        <li>Automatic language detection</li>
        <li>Natural and fluent translations</li>
        <li>Context-aware processing</li>
      </ul>
    </div>
    <Tabs>
      <Tab title="Python">
  ```python
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="YOUR_SARVAM_API_KEY",
)

response = client.text.translate(
    input="Hello, how are you?",
    source_language_code="auto",
    target_language_code="hi-IN",
    speaker_gender="Male"
)

print(response)

  ```
      </Tab>
      <Tab title="JavaScript">
  ```javascript
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: "YOUR_API_SUBSCRIPTION_KEY"
});

const response = await client.text.translate({
    input: "Hello, how are you?",
    source_language_code: "auto",
    target_language_code: "hi-IN",
    speaker_gender: "Male"
});

console.log(response);
  ```
      </Tab>
      <Tab title="cURL">
        ```bash
        curl -X POST https://api.sarvam.ai/translate \
     -H "api-subscription-key: <YOUR_API_SUBSCRIPTION_KEY>" \
     -H "Content-Type: application/json" \
     -d '{
  "input": "input",
  "source_language_code": "auto",
  "target_language_code": "en-IN"
}'
        ```
      </Tab>
    </Tabs>

  </Tab>

  <Tab title="Advanced Options">
    <div className="mb-8">
      <h3>Advanced Text Processing</h3>
      <p>
        Fine-tune text processing with various parameters:
      </p>
      <ul>
        <li>Translation modes (formal, modern-colloquial, classic-colloquial, code-mixed)</li>
        <li>Custom preprocessing options</li>
        <li>Mixed language handling</li>
      </ul>
    </div>
    <Tabs>
      <Tab title="Python">
        ```python
        from sarvamai import SarvamAI

        client = SarvamAI(
            api_subscription_key="YOUR_API_SUBSCRIPTION_KEY"
        )

        response = client.text.translate(
            input="Welcome to Sarvam AI!",
            source_language_code="en",
            target_language_code="hi",
            model="mayura:v1",
            mode="modern-colloquial",
            enable_preprocessing=True
        )

        print(response.translated_text)
        ```
      </Tab>
      <Tab title="JavaScript">
        ```javascript
        import { SarvamAIClient } from "sarvamai";

        const client = new SarvamAIClient({
          apiSubscriptionKey: "YOUR_API_SUBSCRIPTION_KEY"
        });

        const response = await client.text.translate({
          input: "Welcome to Sarvam AI!",
          source_language_code: "en",
          target_language_code: "hi",
          model: "mayura:v1",
          mode: "modern-colloquial",
          enable_preprocessing: true
        });

        console.log(response.translatedText);
        ```
      </Tab>
      <Tab title="cURL">
        ```bash
        curl -X POST https://api.sarvam.ai/translate \
     -H "api-subscription-key: <YOUR_API_SUBSCRIPTION_KEY>" \
     -H "Content-Type: application/json" \
     -d '{
 "input": "Welcome to Sarvam AI!",
 "source_language_code": "en",
"target_language_code": "hi",
"model": "mayura:v1",
"mode": "modern-colloquial",
"enable_preprocessing": true
}'
        ```
      </Tab>
    </Tabs>

  </Tab>
</Tabs>

<Card title="Key Considerations">
  - Maximum text length: 1000 characters per request 
  - Supports 10 Indic Langagues and English 
  - Automatic language detection available 
  - Translation modes: formal (default), modern-colloquial, classic-colloquial, code-mixed
</Card>