from django.urls import path, include

urlpatterns = [
    path('api/v1/users/', include('main.urls.user_urls'))
]
