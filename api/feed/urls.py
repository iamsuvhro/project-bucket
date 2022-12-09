from . import views
from django.urls import path,include

urlpatterns = [
    path('get-cards',views.getCards, name="get-cards")
]