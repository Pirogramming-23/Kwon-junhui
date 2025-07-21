from django.shortcuts import render, get_object_or_404
from .models import Post
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Post, Comment
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import PostForm
from django.contrib.auth.decorators import login_required

def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            return redirect('post_list')
    else:
        form = PostForm()
    return render(request, 'post/post_create.html', {'form': form})


def post_detail(request, pk):
    return HttpResponse(f"Post detail page for post #{pk}")

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'post/post_list.html', {'posts': posts})

@login_required
def post_like(request):
    post_id = request.POST.get('post_id')
    post = get_object_or_404(Post, id=post_id)

    if request.user in post.liked_users.all():
        post.liked_users.remove(request.user)
        liked = False
    else:
        post.liked_users.add(request.user)
        liked = True

    return JsonResponse({'liked': liked, 'like_count': post.liked_users.count()})


@login_required
def like_ajax(request):
    post_id = request.POST.get("post_id")
    post = Post.objects.get(id=post_id)
    if request.user in post.liked_users.all():
        post.liked_users.remove(request.user)
        liked = False
    else:
        post.liked_users.add(request.user)
        liked = True
    return JsonResponse({"liked": liked, "like_count": post.liked_users.count()})

@login_required
def comment_ajax(request):
    post_id = request.POST.get("post_id")
    text = request.POST.get("text")
    post = Post.objects.get(id=post_id)
    comment = Comment.objects.create(post=post, user=request.user, text=text)
    return JsonResponse({"username": request.user.username, "text": comment.text, "id": comment.id})

@login_required
def delete_comment_ajax(request):
    comment_id = request.POST.get("comment_id")
    Comment.objects.filter(id=comment_id, user=request.user).delete()
    return JsonResponse({"deleted": True})