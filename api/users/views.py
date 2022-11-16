from http.client import HTTPResponse
from urllib import response
from django.shortcuts import render, HttpResponse
from users.Services.user_authentication import UserAuthenticationService
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from users.Services import UserServices
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate,login

class UserServicesAPI(APIView):
    """
    Method for user services api  
    """
    pass


@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def create_user(request):
    payload = request.data
    response = UserServices.create_user(payload)
    return Response(response)


@api_view(['POST'])
def get_user(request):
    payload = request.data
    response = UserServices.get_user(payload)
    return Response(response)


@api_view(['POST'])
def update_user(request):
    payload = request.data
    response = UserServices.update_user(payload)
    return Response(response)

@api_view(['POST'])
def login_user(request):
    payload = request.data
    response = UserAuthenticationService.login(payload)
    return Response(response)
    
    