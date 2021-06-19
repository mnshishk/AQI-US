from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
# router.register('project2', views.)

urlpatterns = [
    path('', views.index),
    path('filter', views.APImapRequest, name='request')
]
