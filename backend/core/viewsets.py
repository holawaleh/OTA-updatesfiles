from rest_framework import viewsets, permissions, status
from .models import Project, Firmware, Device
from .serializers import ProjectSerializer, FirmwareSerializer, DeviceSerializer
from rest_framework.decorators import action


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'], url_path='assign-firmware')
    def assign_firmware(self, request, pk=None):
        """
        Assign firmware to ALL ACTIVE devices in this project.

        POST /api/projects/<id>/assign-firmware/
        Body: { "firmware_id": "<uuid>" }
        """
        project = self.get_object()
        fw_id = request.data.get("firmware_id")

        if not fw_id:
            return Response({"detail": "firmware_id required"}, status=status.HTTP_400_BAD_REQUEST)

        # find firmware
        try:
            fw = Firmware.objects.get(id=fw_id)
        except Firmware.DoesNotExist:
            return Response({"detail": "Firmware not found"}, status=status.HTTP_404_NOT_FOUND)

        # ensure this firmware belongs to this project
        if fw.project_id != project.id:
            return Response({"detail": "Firmware does not belong to this project"}, status=400)

        updated = []
        skipped = []

        for device in project.devices.all():
            if device.status != "ACTIVE":
                skipped.append(device.mac_address)
                continue

            # assign firmware
            device.pending_firmware = fw
            device.update_counter = device.update_counter + 1
            device.save()

            # create history
            DeviceUpdateRecord.objects.create(
                device=device,
                firmware=fw,
                update_counter=device.update_counter,
                status='pending',
            )

            updated.append(device.mac_address)

        return Response({
            "detail": "Firmware assignment completed",
            "project": project.id,
            "updated_devices": updated,
            "skipped_devices": skipped,
            "total_updated": len(updated),
            "total_skipped": len(skipped),
        })


class FirmwareViewSet(viewsets.ModelViewSet):
    queryset = Firmware.objects.all()
    serializer_class = FirmwareSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [permissions.IsAuthenticated]
