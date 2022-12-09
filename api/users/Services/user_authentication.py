from users.serializers import AccountSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import User

class UserAuthenticationService:
    """
    Service for User authentication 
    """
    def login(payload, request):
        res = {
            "success":False,
            "message":"Error while login"
        }
        username = payload['username']
        password = payload['password']
        
        try:
            query = authenticate(username=username,password=password)
            if query is not None:
                login(request,query)
                query = User.objects.filter(username=username)
                user_details_serializer = AccountSerializer(query, many=True)

                res.update({
                    "success":True,
                    "message":"Successfully Login",
                    "data":user_details_serializer.data
                })
            else:
                res.update({
                    "success":False,
                    "message":"Invalid username or password"
                })
            return res
        except Exception as ex:
            return res