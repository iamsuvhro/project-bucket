from django.urls import path,include
from . import views
urlpatterns = [
    # path('login/',views.Home),
    path('account/create/',views.create_user, name="create-user"),
    path('account/userinfo/',views.get_user, name="user-info"),
    path('account/update/',views.update_user, name="update-user")

]