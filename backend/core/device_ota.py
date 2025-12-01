from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from .models import Device, Firmware
from django.conf import settings

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def ota_check(request):
    # DeviceKey authentication will populate request.user as Device OR None  
    device = request.user  

    if not isinstance(device, Device):
        return Response({"error": "Unauthorized"}, status=401)

    # Device must be ACTIVE to receive updates
    if device.status != "ACTIVE":
        return Response({"action": "idle", "reason": "device_not_active"})

    # If no pending firmware, no update
    if not device.pending_firmware:
        return Response({"action": "idle"})

    # Check if update was already delivered
    if device.update_counter <= device.last_seen_update_counter:
        return Response({"action": "idle"})

    fw = device.pending_firmware

    # Absolute URL for file
    fw_url = request.build_absolute_uri(fw.file.url)

    return Response({
        "action": "update",
        "firmware": {
            "id": str(fw.id),
            "version": fw.version,
            "sha256": fw.sha256,
            "url": fw_url,
        },
        "update_counter": device.update_counter,
    })
