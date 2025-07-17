from django.contrib import admin
from django.urls import path, include  
from config.views import main
from idea import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", main),
    path("ideas/", views.idea_list, name="idea_list"),
    path("idea/", include("idea.urls")),  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
