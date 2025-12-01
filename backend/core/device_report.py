from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from .models import Device, Firmware
from .serializers import DeviceSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def ota_report(request):
    device = request.user

    if not isinstance(device, Device):
        return Response({"error": "Unauthorized"}, status=401)

    status = request.data.get("status")
    installed_version = request.data.get("installed_version")
    update_counter = request.data.get("update_counter")

    if not status or update_counter is None:
        return Response({"error": "Missing fields"}, status=400)

    # SUCCESS CASE
    if status == "success":
        device.last_seen_update_counter = update_counter
        device.current_version = installed_version
        device.pending_firmware = None
        device.save()

        return Response({
            "ok": True,
            "message": "Update recorded successfully"
        })

    # FAILURE CASE
    if status == "failed":
        # Do NOT clear pending firmware
        return Response({
            "ok": False,
            "message": "Failure recorded"
        })

    return Response({"error": "Unknown status"}, status=400)
