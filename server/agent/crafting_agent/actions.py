def refocus_tasks(tasks: list[dict]) -> list[dict]:
    return [task for task in tasks if task.get("is_core") is True]


def maintain_tasks(tasks: list[dict]) -> list[dict]:
    return tasks


def relax_plan(tasks: list[dict]) -> list[dict]:
    for task in tasks:
        task["priority"] = "low"
    return tasks
