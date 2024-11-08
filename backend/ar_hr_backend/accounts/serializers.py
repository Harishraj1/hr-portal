# serializers.py
from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'updated_by', 'updated_at']
        depth = 1  # Expands the `updated_by` field to include related details
