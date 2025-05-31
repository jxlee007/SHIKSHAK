---
title: Speech-to-Text Translation API Using Saaras Model
description: >-
  A step-by-step guide on how to use the STT-Translate API for translating audio
  files into text using Saaras
---

# Overview
This notebook provides a step-by-step guide on how to use the **STT-Translate API** for translating audio files into text using **Saaras**. It includes instructions for installation, setting up the API key, uploading audio files, and translating audio using the API.

## 0. Installation

Before you begin, ensure you have the necessary Python libraries installed. Run the following commands to install the required packages:

```python
pip install requests pandas pydub
```

## 1. Import Required Libraries

This section imports the necessary Python libraries for making HTTP requests, handling audio files, and managing data.

```python
import requests
import io
```

- **requests**: For making HTTP requests to the API.
- **pandas**: For data manipulation (optional, depending on your use case).

## 2. Set Up the API Endpoint and Payload

To use the Saaras API, you need an API subscription key. Follow these steps to set up your API key:

1. **Obtain your API key**: If you don't have an API key, sign up on the [Sarvam AI Dashboard](https://dashboard.sarvam.ai/) to get one.
2. **Replace the placeholder key**: In the code below, replace "YOUR_SARVAM_AI_API_KEY" with your actual API key.

```python
SARVAM_AI_API="YOUR_SARVAM_AI_API_KEY"
```

### 2.1 Setting Up the API Endpoint and Payload

This section defines the API endpoint and the payload for the translation request. Replace the placeholder values with your actual API key and desired parameters.

```python
# API endpoint for speech-to-text translation
api_url = "https://api.sarvam.ai/speech-to-text-translate"

# Headers containing the API subscription key
headers = {
    "api-subscription-key": SARVAM_AI_API  # Replace with your API key
}

# Data payload for the translation request
data = {
    "model": "saaras:v2",  # Specify the model to be used
    "with_diarization": False  # Set to True for speaker diarization
}
```

## 3. Uploading Audio Files

To translate audio, you need to upload a `.wav` file. Follow these steps:

1. **Prepare your audio file**: Ensure your audio file is in `.wav` format. If your file is in a different format, you can use tools like `pydub` to convert it.
2. **Upload the file**: If you're using Google Colab, you can upload the file using the file uploader:

```python
from google.colab import files

uploaded = files.upload()
audio_file_path = list(uploaded.keys())[0]  # Get the name of the uploaded file
```

If you're working locally, ensure the file is in the same directory as your notebook and specify the file name:

```python
audio_file_path = "test.wav"  # Replace with your file name
```

## 4. Speech-to-Text Translation API

This section demonstrates how to use the *STT-Translate API* for translating audio files into text using *Saaras*. The API automatically identifies the language of the audio and supports long audio files by splitting them into chunks.

### 4.1. Splitting Audio into Chunks

The `split_audio` function splits an audio file into smaller chunks of a specified duration. This is useful for processing long audio files that exceed the API's input length limit.

```python
from pydub import AudioSegment

def split_audio(audio_path, chunk_duration_ms):
    """
    Splits an audio file into smaller chunks of specified duration.

    Args:
        audio_path (str): Path to the audio file to be split.
        chunk_duration_ms (int): Duration of each chunk in milliseconds.

    Returns:
        list: A list of AudioSegment objects representing the audio chunks.
    """
    audio = AudioSegment.from_file(audio_path)  # Load the audio file
    chunks = []
    if len(audio) > chunk_duration_ms:
        # Split the audio into chunks of the specified duration
        for i in range(0, len(audio), chunk_duration_ms):
            chunks.append(audio[i:i + chunk_duration_ms])
    else:
        # If the audio is shorter than the chunk duration, use the entire audio
        chunks.append(audio)
    return chunks
```

### 4.2. Translating Audio

The `translate_audio` function translates audio chunks using the Saaras API. It handles the API request for each chunk and collates the results.

```python
def translate_audio(audio_file_path, api_url, headers, data, chunk_duration_ms=5*60*1000):
    """
    Translates audio into text with optional diarization and timestamps.

    Args:
        audio_file_path (str): Path to the audio file.
        api_url (str): API endpoint URL for Speech-to-Text and Translate.
        headers (dict): Headers for API authentication.
        data (dict): Payload containing model and other options like diarization.
        chunk_duration_ms (int): Duration of each audio chunk in milliseconds.

    Returns:
        dict: Collated response containing the transcript and word-level timestamps.
    """
    # Split the audio into chunks
    chunks = split_audio(audio_file_path, chunk_duration_ms)
    responses = []

    # Process each chunk
    for idx, chunk in enumerate(chunks):
        # Export the chunk to a BytesIO object (in-memory binary stream)
        chunk_buffer = io.BytesIO()
        chunk.export(chunk_buffer, format="wav")
        chunk_buffer.seek(0)  # Reset the pointer to the start of the stream

        # Prepare the file for the API request
        files = {'file': ('audiofile.wav', chunk_buffer, 'audio/wav')}

        try:
            # Make the POST request to the API
            response = requests.post(api_url, headers=headers, files=files, data=data)
            if response.status_code == 200 or response.status_code == 201:
                print(f"Chunk {idx} POST Request Successful!")
                response_data = response.json()
                transcript = response_data.get("transcript", "")
                responses.append({"transcript": transcript})
            else:
                # Handle failed requests
                print(f"Chunk {idx} POST Request failed with status code: {response.status_code}")
                print("Response:", response.text)
        except Exception as e:
            # Handle any exceptions during the request
            print(f"Error processing chunk {idx}: {e}")
        finally:
            # Ensure the buffer is closed after processing
            chunk_buffer.close()

    # Collate the transcriptions from all chunks
    collated_transcript = " ".join([resp["transcript"] for resp in responses])
    collated_response = {
        "transcript": collated_transcript,
        "language": response_data.get("language_code")
    }
    return collated_response
```

### 4.3 Translating the Audio

This section calls the `translate_audio` function to translate the audio file. Replace `audio_file_path` with the path to your audio file.

```python
# Path to the audio file to be translated
# audio_file_path = "test.wav"  # Replace with your file path

# Translate the audio
translation = translate_audio(audio_file_path, api_url, headers, data)

# Display the translation results
translation
```

Example output:

```json
{
  "transcript": "There are many ethical stories in English that are beneficial for children. They activate your child's imagination, entertain them, and make them happy. Short ethical stories are ideal to keep them focused and focused throughout the story.",
  "language": "hi-IN"
}
```

## 5. Conclusion

This tutorial demonstrated how to use the **Saaras API** for translating audio files into text. By following the steps, you can easily translate audio, even long files, by splitting them into smaller chunks. The process involves installing required libraries, setting up your API key, uploading audio, and translating it using the provided functions.

## 6. Additional Resources

For more details, refer to the official **Saaras API documentation** and join the community for support:

- **Documentation**: [docs.sarvam.ai](https://docs.sarvam.ai/)
- **Community**: [Join the Discord Community](https://discord.gg/hTuVuPNF)

## 7. Final Notes

- Keep your API key secure.
- Use clear audio for best results.
- Explore advanced features like diarization and word-level timestamps.

**Keep Building!** 🚀 