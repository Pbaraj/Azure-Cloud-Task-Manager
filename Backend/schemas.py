from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str
    description: str = ""
    completed: bool = False


class TaskResponse(TaskCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)