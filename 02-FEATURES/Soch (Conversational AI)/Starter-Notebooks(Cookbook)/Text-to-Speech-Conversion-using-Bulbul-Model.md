# Text-to-Speech Conversion using Bulbul Model

# Overview

This guide demonstrates how to convert text into speech using the **Sarvam AI Text-to-Speech API**. The resulting audio files are saved as `.wav` files.

## 🛠 Prerequisites

Before running this, ensure you have:

- Python 3.7 or higher
- Python packages: `sarvamai`

Install the required package using pip:

```bash
pip install sarvamai
```

## 📦 Import Required Libraries

```python
from sarvamai import SarvamAI
from sarvamai.play import play, save
```

## 🔑 Set Up Your API Key

To use the TTS Bulbul API:

1. Sign up at [Sarvam AI Dashboard](https://dashboard.sarvam.ai/) to get your API key.
2. Replace the placeholder key in the code.

```python
SARVAM_API_KEY = "YOUR_SARVAM_API_KEY"
client = SarvamAI(api_subscription_key=SARVAM_API_KEY)
```

## 📄 Example Text Input

```python
text = """
Netaji Subhash Marg से Dayanand Road की तरफ, south की तरफ़ जाने से शुरू करें।
Dayanand Road पर पहुँचने के बाद, बाएँ मुड़ जाएँ। 350 meters तक सीधा चलते रहें।
आपको बायें तरफ़, United Bank of India ATM दिखेगा।
Dayanand School के दाएँ तरफ़ से गुजरने के बाद, बाएँ मुड़ें।
120 meters के बाद, Ghata Masjid Road पर, right turn करें।
280 meters तक चलते रहें।
Mahatma Gandhi Marg पे रहें और, 2.9 kilometers तक Old Delhi की तरफ जाएँ।
फिर, HC Sen Marg पर continue करें, और Paranthe Wali Gali तक drive करें।
"""
```

## ⚙️ API Parameters

| Parameter              | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `target_language_code` | Language of the input text (e.g., `hi-IN`)                                                       |
| `speaker`              | Voice used: Female - `Anushka`, `Manisha`, `Vidya`, `Arya`; Male - `Abhilash`, `Karun`, `Hitesh` |
| `pitch`                | Pitch adjustment: -0.75 to 0.75 (default: 0.0)                                                   |
| `pace`                 | Speed control: 0.5 to 2.0 (default: 1.0)                                                         |
| `loudness`             | Volume: 0.3 to 3.0 (default: 1.0)                                                                |
| `speech_sample_rate`   | Output sample rate: 8000, 16000, 22050, or 24000 Hz                                              |
| `enable_preprocessing` | Normalize English/numeric entities (default: false)                                              |

## 🔁 Convert Text to Speech

```python
response = client.text_to_speech.convert(
    text="Your Text",
    target_language_code="hi-IN",
    speaker="anushka",
    enable_preprocessing=True,
)
```

## ▶️ Play or 💾 Save Audio

To play the output:

```python
play(response)
```

To save the output:

```python
save(response, "output.wav")
```

## 📤 Output

Running the above code saves a `output.wav` file containing the speech.

## ✅ Conclusion

This MDX guide showed how to use **Sarvam AI**'s TTS API to convert Hindi text into lifelike speech. Customize the text, language, voice, and parameters to suit your application.

---

## 📚 Additional Resources

- **Documentation**: [docs.sarvam.ai](https://docs.sarvam.ai)
- **Community Support**: [Join our Discord](https://discord.gg/hTuVuPNF)

> 🛡️ **Note**: Keep your API key safe and avoid committing it in public repositories.

🚀 **Keep Building!**

```

```