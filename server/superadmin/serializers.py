from rest_framework import serializers
from .models import AdminPanel


class AdminPanelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminPanel
        fields = '__all__'
