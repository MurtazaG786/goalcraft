from agent import GoalCraftAgent

agent = GoalCraftAgent()

state = {
    "goal": "Learn MERN stack in 30 days",
    "total_tasks": 20,
    "completed_tasks": 6,
    "missed_tasks": 4,
    "days_remaining": 12,
    "recent_behavior": "User slowed down recently"
}

tasks = [
    {"title": "React basics", "is_core": True},
    {"title": "Advanced Mongo aggregation", "is_core": False},
    {"title": "CRUD API", "is_core": True},
]

result = agent.run(state, tasks)
print(result)
