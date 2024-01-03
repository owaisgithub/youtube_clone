from django.urls import path, include

urlpatterns = [
    path('api/v1/users/', include('main.urls.user_urls')),
    path('api/v1/users/videos/', include('main.urls.video_urls')),
]
