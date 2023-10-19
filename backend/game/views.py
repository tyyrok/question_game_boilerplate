from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from game.models import Game as GameModel
from game.serializers import GameModelSerializer

# Create your views here.
class GetResultsView(ListAPIView):
    """View for returning score board"""
    queryset = GameModel.objects.all().order_by('-score')
    serializer_class = GameModelSerializer