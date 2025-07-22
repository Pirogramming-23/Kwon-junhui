from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)  
    liked_users = models.ManyToManyField(User, related_name='liked_posts', blank=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # ✅ 여기를 이렇게!
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)