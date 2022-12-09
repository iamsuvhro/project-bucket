import imp
from django.shortcuts import render
from feed.serializers import FeedCardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import FeedCard
# Create your views here.

@api_view(["POST"])
def getCards(request):
    payload = request.data
    username = payload['username']
    response = FeedCard.objects.filter(user=username)
    serializer = FeedCardSerializer(response, many=True)
    return Response(serializer.data)