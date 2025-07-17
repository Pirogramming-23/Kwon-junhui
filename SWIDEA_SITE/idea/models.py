from django.db import models

class Idea(models.Model):
    title = models.CharField(max_length=100)
    level = models.IntegerField()
    tool = models.CharField(max_length=50)
    image = models.ImageField(upload_to='idea_images/')
    description = models.TextField('설명없음')
    
    def __str__(self):
        return self.title
    
class IdeaStar(models.Model):
    idea = models.OneToOneField(Idea, on_delete=models.CASCADE)