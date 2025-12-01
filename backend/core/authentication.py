from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Device

class DeviceAPIKeyAuthentication(BaseAuthentication):
    keyword = "DeviceKey"

    def authenticate(self, request):
        auth = request.headers.get("Authorization")

        if not auth:
            return None  # allow other auth classes (JWT) to run

        # Expect: Authorization: DeviceKey <api_key>
        try:
            prefix, key = auth.split(" ")
        except ValueError:
            raise AuthenticationFailed("Invalid Authorization header")

        if prefix != self.keyword:
            return None  # possibly JWT, not our concern

        try:
            device = Device.objects.get(api_key=key)
        except Device.DoesNotExist:
            raise AuthenticationFailed("Invalid device API key")

        # Return device as the authenticated user object
        return (device, None)
