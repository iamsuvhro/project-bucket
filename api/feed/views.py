import imp
from django.shortcuts import render
from feed.serializers import FeedCardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import FeedCard
from feed.service import FeedCardService
# Create your views here.

@api_view(["POST"])
def getCards(request):
    payload = request.data
    user_id = payload['user_id']
    response = FeedCard.objects.filter(user=user_id)
    serializer = FeedCardSerializer(response, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createCard(request):
    payload = request.data
    res = FeedCardService.create_card(payload)
    return Response(res)