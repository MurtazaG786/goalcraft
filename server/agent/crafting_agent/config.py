import os
from dotenv import load_dotenv

load_dotenv() 
class agentconfig:
    HF_API_KEY:str=os.getenv("HF_API_KEY")
    MODEL_ID: str = "mistralai/Mistral-7B-Instruct-v0.2"
    MAX_TOKEN:int=250
    temprature:float=0.5

    @classmethod
    def validate(cls):
        if not cls.HF_API_KEY:
            raise EnvironmentError("api key is not working...")
        