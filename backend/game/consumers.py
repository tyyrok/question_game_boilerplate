import json
from typing import Any
from uuid import UUID
from django.contrib.auth import get_user_model
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from game.game import Game

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
        self.user = self.scope['user']
        if self.user.is_anonymous:
            return
        self.game = Game(self.user)
        self.game_name = f"{self.user.username}-game"
        async_to_sync(self.channel_layer.group_add)(
            self.game_name,
            self.channel_name
        )
        self.send_json(
            self.game.get_next_question()
        )
        self.send_json(
            self.game.get_user_result()
        )
        
    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)
    
    def receive_json(self, content, **kwargs):
        message_type = content['type']
        if message_type == 'check_answer':
            async_to_sync(self.channel_layer.group_send)(
                self.game_name,
                self.game.check_answer(content['message']),
            )           
        elif message_type == "get_score":
            async_to_sync(self.channel_layer.group_send)(
                self.game_name,
                self.game.get_user_result()
            )
            
        return super().receive_json(content, **kwargs)
    
    def lost(self, event):
        self.send_json(event)
        
    def win(self, event):
        self.send_json(event)
        
    def next_question(self, event):
        self.send_json(event)
        
    def score(self, event):
        self.send_json(event)
        