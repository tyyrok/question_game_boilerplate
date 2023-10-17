from django.urls import path
from game.consumers import GameConsumer

websocket_urlpatterns = [
    path("game/", GameConsumer.as_asgi()),
] 