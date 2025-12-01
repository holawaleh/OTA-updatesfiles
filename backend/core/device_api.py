from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Device
from .serializers import DeviceSerializer

def normalize_mac(mac):
    mac = mac.upper().strip()
    mac = mac.replace(":", "").replace("-", "").replace(" ", "")
    return mac

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def device_register(request):
    mac = request.data.get("mac")
    current_version = request.data.get("current_version", "")

    if not mac:
        return Response({"error": "MAC address required"}, status=400)

    mac = normalize_mac(mac)

    device, created = Device.objects.get_or_create(mac_address=mac)

    if created or not device.current_version:
        device.current_version = current_version
        device.save()

    data = DeviceSerializer(device).data
    return Response({
        "created": created,
        "device": data,
        "api_key": device.api_key,
    })
