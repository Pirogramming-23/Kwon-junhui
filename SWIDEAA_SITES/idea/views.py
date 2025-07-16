from .models import Idea
from django.shortcuts import render, redirect
from .forms import IdeaForm

def idea_list(request):
    ideas = Idea.objects.all()
    return render(request, 'main.html', {'ideas': ideas})

def idea_create(request):
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('idea_list')
    else:
        form = IdeaForm()
    return render(request, 'idea_create.html', {'form': form})