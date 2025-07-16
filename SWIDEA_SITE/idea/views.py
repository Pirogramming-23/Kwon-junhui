from .models import Idea
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .forms import IdeaForm
from django.views.decorators.csrf import csrf_exempt
from .models import Idea, IdeaStar
from django.http import JsonResponse
from django.views.decorators.http import require_POST

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

def idea_detail(request, idea_id):
    idea = get_object_or_404(Idea, id=idea_id)
    return render(request, 'idea_detail.html', {'idea': idea})

@csrf_exempt  
def toggle_star(request):
    if request.method == "POST":
        idea_id = request.POST.get("idea_id")
        idea = Idea.objects.get(id=idea_id)

        try:
            star = IdeaStar.objects.get(idea=idea)
            star.delete()
            return JsonResponse({'status': 'unstarred'})
        except IdeaStar.DoesNotExist:
            IdeaStar.objects.create(idea=idea)
            return JsonResponse({'status': 'starred'})
        
@require_POST
def adjust_level(request):
    idea_id = request.POST.get('idea_id')
    action = request.POST.get('action')

    idea = Idea.objects.get(id=idea_id)

    if action == 'increment':
        idea.level += 1
    elif action == 'decrement':
        idea.level -= 1
    idea.save()

    return JsonResponse({'level': idea.level})

def idea_list(request):
    sort = request.GET.get("sort")
    
    if sort == "latest":
        ideas = Idea.objects.all().order_by("-id")  # 최신순
    elif sort == "level_desc":
        ideas = Idea.objects.all().order_by("-level")
    elif sort == "level_asc":
        ideas = Idea.objects.all().order_by("level")
    else:
        ideas = Idea.objects.all()

    return render(request, 'main.html', {'ideas': ideas})

def idea_manage(request):
    ideas = Idea.objects.all()
    return render(request, 'idea_manage.html', {'ideas': ideas})

def idea_delete(request, idea_id):
    idea = get_object_or_404(Idea, id=idea_id)
    idea.delete()  
    return redirect('idea_manage') 
def idea_edit(request, idea_id):
    idea = get_object_or_404(Idea, id=idea_id)
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            form.save()
            return redirect('idea_manage') 
    else:
        form = IdeaForm(instance=idea)
    return render(request, 'idea_edit.html', {'form': form, 'idea': idea})