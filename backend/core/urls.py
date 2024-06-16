from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, EventViewSet, UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'events', EventViewSet, basename='event')
router.register(r'users', UserViewSet, basename='user')


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
