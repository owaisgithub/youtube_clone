from django.urls import path

from main.views.user_view import *

urlpatterns = [
    path('create-user', UserView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('refreshed-tokens', RefreshedAccessTokens.as_view()),
    path('reset-password', ResetPassword.as_view()),
    path('update-avatar', UpdateAvatar.as_view()),
]