Chat
Chat Completions

POST
https://api.sarvam.ai/v1/chat/completions
POST
/v1/chat/completions

curl -X POST https://api.sarvam.ai/v1/chat/completions \
     -H "Authorization: Authorization" \
     -H "Content-Type: application/json" \
     -d '{
  "messages": [
    {
      "role": "assistant",
      "content": "content"
    }
  ],
  "model": "sarvam-m"
}'
Try it
200
Successful

{
  "id": "id",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 1,
      "message": {
        "content": "content",
        "role": "assistant"
      }
    }
  ],
  "created": 1,
  "model": "model",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 1,
    "prompt_tokens": 1,
    "total_tokens": 1
  }
}
Calls Sarvam LLM API to get the chat completion. Supported model(s): sarvam-m.

Headers
Authorization
string
Required
Bearer token for authentication. Format: “Bearer <token>”

Request
This endpoint expects an object.
messages
list of objects
Required
A list of messages comprising the conversation so far.


Show 3 variants
model
"sarvam-m"
Required
Model ID used to generate the response, like sarvam-m.

temperature
double
Optional
>=0
<=2
What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.

top_p
double
Optional
>=0
<=1
An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

We generally recommend altering this or temperature but not both.

reasoning_effort
enum
Optional
Allowed values:
low
medium
high
max_tokens
integer
Optional
The maximum number of tokens that can be generated in the chat completion.

stream
boolean
Optional
If set to true, the model response data will be streamed to the client as it is generated using server-sent events.

stop
string or list of strings
Optional
Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.


Show 2 variants
n
integer
Optional
>=1
<=128
How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.

seed
integer
Optional
This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the system_fingerprint response parameter to monitor changes in the backend.

frequency_penalty
double
Optional
>=-2
<=2
Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model’s likelihood to repeat the same line verbatim.

presence_penalty
double
Optional
>=-2
<=2
Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model’s likelihood to talk about new topics.

wiki_grounding
boolean
Optional
If set to true, the model response will be wiki grounded.

Response
Successful Response

id
string
A unique identifier for the chat completion.

choices
list of objects
A list of chat completion choices. Can be more than one if n is greater than 1.


Show 3 properties
created
integer
The Unix timestamp (in seconds) of when the chat completion was created.

model
string
The model used for the chat completion.

object
"chat.completion"
The object type, which is always chat.completion.

usage
object
Optional

Show 3 properties
Errors

400
Chat Completions Request Bad Request Error

403
Chat Completions Request Forbidden Error

422
Chat Completions Request Unprocessable Entity Error

429
Chat Completions Request Too Many Requests Error

500
Chat Completions Request Internal Server Error