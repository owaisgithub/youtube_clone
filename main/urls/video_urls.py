from django.urls import path

from main.views.video_view import *
from main.views.subscription_view import *

urlpatterns = [
    path('upload-video', VideoView.as_view()),
    path('get-video/<int:videoId', VideoView.as_view()),
    path('update-video/<int:videoId>', VideoView.as_view()),
    path('update-thumbnail/<int:videoId>', VideoView.as_view()),
    path('update-video-detail/<int:videoId>', VideoView.as_view()),
    path('delete-video/<int:videoId>', VideoView.as_view()),
    
    ## Subscription urls
    path('subscribe-channel', SubscriptionView.as_view()),
]
