from django.urls import path, include

urlpatterns = [
    path('api/v1/users/', include('main.urls.user_urls')),
    path('api/v1/videos/', include('main.urls.video_urls')),
    path('api/v2/channels/', include('main.urls.channel_urls')),
    path('api/v2/subscribers/', include('main.urls.subscriber_urls')),

]
