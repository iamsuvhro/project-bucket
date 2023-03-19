
from time import time
from django.db import models
from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.postgres.fields import ArrayField
import json


class JSONEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, list):
            return json.dumps(obj)
        return super().default(obj)

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
    pinned = models.BooleanField(default=False,  null=True)
    tags = models.CharField(max_length=1000, blank=True)

    def set_tags(self, tags):
        self.tags = ','.join(tags)

    def get_tags(self):
        return self.tags.split(',') if self.tags else []
    
    def __str__(self):
        return self.project_title
    

"""
my_model = feedcard.objects.create()
my_model.set_my_list(['item1', 'item2', 'item3'])
my_model.save()

my_list = my_model.get_my_list()
print(my_list)  # Output: ['item1', 'item2', 'item3']

"""