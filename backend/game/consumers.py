from typing import Any
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from game.models import Game
from django.contrib.auth import get_user_model
import json
from uuid import UUID

User = get_user_model()

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj) -> Any:
        if isinstance(obj, UUID):
            return obj.hex
        return json.JSONEncoder.default(self, obj)
    
class GameConsumer(JsonWebsocketConsumer):
    """Main consumer for game interaction between front and back
    """
    
    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_name = None
        self.user = None
        
    def connect(self):
        print("Connected!")
        self.accept()
        
    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)
    
    def receive_json(self, content, **kwargs):
        print(content['type'])
        print(content['message'])
        return super().receive_json(content, **kwargs)