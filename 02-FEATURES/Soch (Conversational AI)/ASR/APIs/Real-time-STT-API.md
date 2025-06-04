---
title: Real-time Speech-to-Text API
description: Process short audio files synchronously with immediate response
icon: bolt
---

## Overview

The Real-time Speech-to-Text API is designed for processing short audio files synchronously with immediate response. It's perfect for quick transcriptions and testing scenarios.

## Features

<CardGroup cols={2}>
  <Card title="Processing" icon="bolt">
    - Instant results
    - Simple integration
    - Maximum duration: 30 seconds
  </Card>

  <Card title="Audio Support" icon="file-audio">
    - Multiple audio formats
    - High accuracy transcription
    - Multiple Indian languages and English support
  </Card>
</CardGroup>


## Code Examples

<Tabs>
  <Tab title="Python">
    ``` python
    from sarvamai import SarvamAI

    client = SarvamAI(
        api_subscription_key="YOUR_SARVAM_API_KEY",
    )

    response = client.speech_to_text.transcribe(
        file=open("audio.wav", "rb"),
        model="saarika:v2",
        language_code="gu-IN"
    )

    print(response)
    ```

  </Tab>
  <Tab title="JavaScript">
    ``` javascript
    import { SarvamAIClient } from "sarvamai";
    import fs from "fs";

    const API_KEY = "YOUR_API_KEY";
    const FILE_PATH = "/path/to/audio.wav"; // or .mp3

    async function main() {
          const client = new SarvamAIClient({ apiSubscriptionKey: API_KEY });

    const buffer = fs.readFileSync(FILE_PATH);
    const mimeType = FILE_PATH.endsWith(".mp3") ? "audio/mpeg" : "audio/wav";
    const file = new File([buffer], FILE_PATH.split("/").pop() || "audio", { type: mimeType });

    const response = await client.speechToText.transcribe(file, {
          model: "saarika:v2",
          language_code: "hi-IN"
});

console.log(response);
}
```

  </Tab>
  <Tab title="cURL">
    ```bash
    curl -X POST https://api.sarvam.ai/speech-to-text \
        -H "api-subscription-key: <YOUR_API_SUBSCRIPTION_KEY>" \
        -H "Content-Type: multipart/form-data" \
        -F model="saarika:v2" \
        -F language_code="en-IN" \
        -F file=@"file.wav;type=audio/wav"
    ```
  </Tab>
</Tabs>



## Next Steps

<Steps>
  <Step title="Get API Key">
    Sign up and get your API key from the
    [dashboard](https://dashboard.sarvam.ai).
  </Step>
  <Step title="Test Integration">Try the API with sample audio files.</Step>
  <Step title="Go Live">Deploy your integration and monitor usage.</Step>
</Steps>

<Note>
  Need help? Contact us on [discord](https://discord.gg/5rAsykttcs) for
  guidance.
</Note>