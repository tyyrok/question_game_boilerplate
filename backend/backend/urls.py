from django.contrib import admin
from django.urls import path, include
from authentication.views import CustomObtainAuthTokenView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth-token/", CustomObtainAuthTokenView.as_view()),
    path("api/", include("game.urls")),
]