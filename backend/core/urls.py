from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ProjectViewSet, FirmwareViewSet, DeviceViewSet
from .device_api import device_register
from .device_ota import ota_check
from .device_report import ota_report



router = DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('firmwares', FirmwareViewSet)
router.register('devices', DeviceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('device/register/', device_register),
    path('device/ota/', ota_check),
    path('device/ota/report/', ota_report),
]
