from typing import Literal
import os

decision_type=Literal["maintain_plan","refocus","stretch_plan","relax_plan"]
confidence_type=Literal["high","medium","low"]
class responseschema:
    message:str
    decision:decision_type
    confidence:confidence_type