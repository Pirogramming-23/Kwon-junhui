from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.idea_create, name='idea_create'),
]
