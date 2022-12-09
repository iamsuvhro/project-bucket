
from time import time
from django.db import models
from django.contrib.auth.models import User

class FeedCard(models.Model):
    """
    Model for storing feed card details
    """
    card_id = models.IntegerField(primary_key=True)
    project_title = models.CharField(max_length=100)
    project_drescriptions = models.TextField(max_length=5000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    repository = models.CharField(max_length=100)
    card_created = models.CharField(max_length=50)
    
    def __str__(self):
        return self.project_title