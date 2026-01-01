import os
import json
from langchain_huggingface import ChatHuggingFace,HuggingFaceEndpoint
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
load_dotenv()
llm=HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    huggingfacehub_api_token=os.getenv("HF_API_KEY"),
    task="conversational",
    max_new_tokens=300,
    temperature=0.7,
)
model=ChatHuggingFace(llm=llm)

def create_response(state:dict)->dict:
  prompt={ f"""
    You are an adaptive goal-planning agent.

    Rules:
    - Be motivating, not judgmental
    - Highlight progress already made
    - Reduce scope if time is limited
    - Never overwhelm the user

    User goal:
    {state['goal']}

    Current status:
    - Total tasks: {state['total_tasks']}
    - Completed tasks: {state['completed_tasks']}
    - Missed tasks: {state['missed_tasks']}
    - Days remaining: {state['days_remaining']}
    - Recent behavior: {state['recent_behavior']}

    Respond ONLY in valid JSON with this schema:
    {{
  "message": "string",
  "decision": "relax_plan | maintain_plan | add_stretch | refocus",
  "confidence": "low | medium | high"
  }}
  """}
  prompt = str(prompt).strip()

  response=model.invoke([HumanMessage(content=prompt)]).content
  try:
      return json.loads(response)
  except Exception:
        # hard safety fallback
      return {
           "message": "Let’s keep going step by step and focus on what matters most.",
            "decision": "maintain_plan",
            "confidence": "low",
        }