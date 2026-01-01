import json
from langchain_huggingface import ChatHuggingFace,HuggingFaceEndpoint
from langchain_core.messages import HumanMessage
from config import agentconfig
from exception import invalidLlmResponseError
from schema import responseschema
class LLMClient:
    def __init__(self):
        agentconfig.validate()

        llm = HuggingFaceEndpoint(
            repo_id=agentconfig.MODEL_ID,
            huggingfacehub_api_token=agentconfig.HF_API_KEY,
            task="conversational",
            max_new_tokens=agentconfig.MAX_TOKEN,
            temperature=agentconfig.temprature,
        )

        self.chat_model = ChatHuggingFace(llm=llm)

    def ask(self, prompt: str) -> responseschema:
        if not isinstance(prompt, str) or not prompt.strip():
            raise ValueError("Prompt must be a non-empty string")

        response = self.chat_model.invoke(
            [HumanMessage(content=prompt.strip())]
        ).content

        try:
            data = json.loads(response)
            return responseschema(**data)
        except Exception as e:
            raise invalidLlmResponseError(
                f"Invalid LLM response: {response}"
            ) from e
