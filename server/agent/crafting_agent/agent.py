from llm_client import LLMClient
from actions import refocus_tasks, maintain_tasks, relax_plan
from exception import agenterror


class GoalCraftAgent:
    def __init__(self):
        self.llm = LLMClient()

    def _build_prompt(self, state: dict) -> str:
        return f"""
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

Respond ONLY in valid JSON:
{{
  "message": "string",
  "decision": "relax_plan | maintain_plan | add_stretch | refocus",
  "confidence": "low | medium | high"
}}
"""

    def run(self, state: dict, tasks: list[dict]) -> dict:
        try:
            decision = self.llm.ask(self._build_prompt(state))

            if decision.decision == "refocus":
                updated_tasks = refocus_tasks(tasks)
            elif decision.decision == "relax_plan":
                updated_tasks = relax_plan(tasks)
            else:
                updated_tasks = maintain_tasks(tasks)

            return {
                "message": decision.message,
                "confidence": decision.confidence,
                "tasks": updated_tasks,
            }

        except agenterror as e:
            # graceful degradation
            return {
                "message": "Let’s focus on core tasks and keep moving forward.",
                "confidence": "low",
                "tasks": tasks,
                "error": str(e),
            }
