from django.urls import path
from game.views import GetResultsView

urlpatterns = [
   path("results/", GetResultsView.as_view()),
]