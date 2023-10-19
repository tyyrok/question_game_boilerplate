from rest_framework import serializers

class SimpleUsernameSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)