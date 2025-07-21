from django.shortcuts import render, get_object_or_404
from .models import Post
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Post, Comment
from django.shortcuts import render, redirect
from .forms import PostForm
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt


def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)  
        if form.is_valid():
            form.save()
            return redirect('post_list')
    else:
        form = PostForm()
    return render(request, 'post/post_create.html', {'form': form})



def post_detail(request, pk):
    return HttpResponse(f"Post detail page for post #{pk}")

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'post/post_list.html', {'posts': posts})


@csrf_exempt
@require_POST
def post_like(request):
    post_id = request.POST.get('post_id')
    post = get_object_or_404(Post, id=post_id)

    # 가짜 필드처럼 누를 때마다 올라가게 처리 (실제 DB 반영 없음)
    count = int(request.POST.get('current_count', 0)) + 1
    return JsonResponse({'liked': True, 'like_count': count})




@require_POST
def comment_ajax(request):
    post_id = request.POST.get("post_id")
    text = request.POST.get("text")
    post = get_object_or_404(Post, id=post_id)

    if request.user.is_authenticated:
        user = request.user
        username = user.username
    else:
        user = None
        username = "익명"

    comment = Comment.objects.create(post=post, user=user, text=text)

    return JsonResponse({
        "id": comment.id,
        "username": username,
        "text": comment.text,
    })


@require_POST
def delete_comment_ajax(request):
    comment_id = request.POST.get("comment_id")

    if request.user.is_authenticated:
        Comment.objects.filter(id=comment_id, user=request.user).delete()
        return JsonResponse({"deleted": True})
    else:
        return JsonResponse({"deleted": False, "error": "로그인 필요"}, status=403)
