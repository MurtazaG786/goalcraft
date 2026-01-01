from craftingagent import create_response

state = {
    "goal": "Learn MERN stack in 30 days",
    "total_tasks": 20,
    "completed_tasks": 6,
    "missed_tasks": 4,
    "days_remaining": 12,
    "recent_behavior": "User was consistent early but slowed down recently"
}
print(create_response(state))