from rest_framework import serializers

from game.models import Game as GameModel

class GameModelSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    
    class Meta:
        model = GameModel
        fields =['id', 'username', 'score', 'timestamp']
        
    def get_username(self, obj):
        username = obj.user.username
        return str(username)