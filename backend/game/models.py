from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Game(models.Model):
    """Main class for game
    """
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_created=True)
    