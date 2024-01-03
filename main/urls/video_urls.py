from django.urls import path

from main.views.video_view import *

urlpatterns = [
    path('upload-video', VideoView.as_view()),
    path('update-video/<int:id>', VideoView.as_view()),
    path('update-thumbnail/<int:id>', VideoView.as_view()),
    path('update-video-detail/<int:id>', VideoView.as_view()),
    path('delete-video/<int:id>', VideoView.as_view()),
]
