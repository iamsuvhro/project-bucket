from django.urls import path,include
from . import views
from app.middlewares import login_exempt
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    # path('login/',views.Home),
    path('account/create/',views.create_user, name="create-user"),
    path('account/user-info/',views.get_user, name="user-info"),
    path('account/update/',views.update_user, name="update-user"),
    path('account/login/',views.login_user, name="login-user"),
    path('account/user-details/', login_exempt(csrf_exempt(views.UserServicesAPI.as_view())),name="user")

]