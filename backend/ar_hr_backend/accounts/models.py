from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User 


class Account(models.Model):
    username = models.CharField(max_length=150, unique=True) 
    email = models.EmailField(max_length=254, unique=True)    
    password = models.CharField(max_length=128)              
    phone = models.CharField(max_length=13, unique=True) 
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.username
    
class EmailVerification(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)
    is_verified = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=5)
    
    def __str__(self):
        return f"Email: {self.email} - Verified: {self.is_verified}"
    
class ResetPasswordVerification(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)
    is_verified = models.BooleanField(default=False)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=5)

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title