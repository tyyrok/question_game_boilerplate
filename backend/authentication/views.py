from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_404_NOT_FOUND
from authentication.serializers import SimpleUsernameSerializer
from django.contrib.auth import get_user_model
import random

User = get_user_model()

class CustomObtainAuthTokenView(ObtainAuthToken):
    """ Simple class for creating new user when username='new' received and
        returning token for this user
    """
    def post(self, request, *args, **kwargs):
        serializer = SimpleUsernameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data["username"]
        if username == 'new':
            username = self.create_random_username()
            user = User.objects.create(username=username)
        else:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({"message": "user doesn't exist"}, status=HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})
    
    @staticmethod
    def create_random_username() -> str:
        """Method for making random unique username for new user"""
        new_username = 'user' + str(random.randint(100, 1000000))
        while len(User.objects.filter(username=new_username)) != 0:
            new_username = 'user' + str(random.randint(100, 1000000))            
        return new_username
