from django.http import HttpResponse
from django.shortcuts import render
from idea.models import Idea

def main(request):
    ideas = Idea.objects.all()
    return render(request, 'main.html', {'ideas': ideas})