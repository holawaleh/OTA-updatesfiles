from django.db import models
from django.utils import timezone
import uuid
import secrets

class Project(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Firmware(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='firmwares')
    version = models.CharField(max_length=50)
    file = models.FileField(upload_to='firmware/')
    sha256 = models.CharField(max_length=64)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('project', 'version')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.project} - {self.version}"


class Device(models.Model):
    STATUS = (
        ('PENDING', 'PENDING'),
        ('ACTIVE', 'ACTIVE'),
        ('DISABLED', 'DISABLED'),
    )

    mac_address = models.CharField(max_length=17, unique=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)
    api_key = models.CharField(max_length=64, unique=True, editable=False)
    current_version = models.CharField(max_length=50, blank=True, default='')
    location = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default='PENDING')

    update_counter = models.PositiveIntegerField(default=0)
    last_seen_update_counter = models.PositiveIntegerField(default=0)

    pending_firmware = models.ForeignKey(Firmware, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Automatically generate API key on creation
        if not self.api_key:
            self.api_key = secrets.token_hex(32)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.mac_address
