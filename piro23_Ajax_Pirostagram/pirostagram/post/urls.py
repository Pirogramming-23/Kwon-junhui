from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('like/', views.post_like, name='post_like'),  # ← 여기!
    path('comment/', views.comment_ajax, name='comment_ajax'),
    path('comment/delete/', views.delete_comment_ajax, name='delete_comment_ajax'),
    path('create/', views.post_create, name='post_create'),
]
