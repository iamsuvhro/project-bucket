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
from django.contrib.auth.models import User as Users

class UserServicesAPI(APIView):
    """
    Method for user services api  
    """
    @staticmethod
    def parse_user(user):
        """Parses user details"""
        user_dict = {
            "id": user.id,
            "name": user.name,
            "email": user.email.lower(),
        }
        return user_dict
    
    def get(self, request):
        """Checks existing session, etc"""
        if request.user.is_authenticated:
            user = UserServicesAPI.parse_user(request.user)
            Users.objects.filter(pk=request.user.pk) #.update(last_activity=now())
            return Response({"data": user, "success": True})
        else:
            # the login is a  GET request, so just show the user the login form.
            return Response({"message": "Please log in", "success": False}, status=401)


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
    response = UserAuthenticationService.login(payload, request)
    return Response(response)
    
    