from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

import apps.awards.views
import apps.users.views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Aposcar API",
      default_version='v1',
      description="Provide access to all the resources of the Aposcar Project",
      contact=openapi.Contact(email="labqua4tro@gmail.com"),
   ),
   public=True,
   permission_classes=(permissions.IsAdminUser,),
)

router = DefaultRouter()
router.register(r'users', apps.users.views.UserViewSet, basename='userprofile')
router.register(r'indications', apps.awards.views.IndicationViewSet)
router.register(r'categories', apps.awards.views.CategoryViewSet)
router.register(r'nominees', apps.awards.views.NomineeViewSet)
router.register(r'rooms', apps.users.views.RoomViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', apps.users.views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
