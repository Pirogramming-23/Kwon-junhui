from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.idea_create, name='idea_create'),
    path('<int:idea_id>/', views.idea_detail, name='idea_detail'),
    path('toggle_star/', views.toggle_star, name='toggle_star'),
    path("adjust_level/", views.adjust_level, name="adjust_level"),
]
