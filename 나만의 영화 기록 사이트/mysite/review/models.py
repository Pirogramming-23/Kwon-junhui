# review/models.py

from django.db import models

class Review(models.Model):
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=100, default="없음")
    actor = models.CharField(max_length=100, default="없음")
    year = models.PositiveIntegerField()
    genre = models.CharField(max_length=50)
    running_time = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return self.title
