from django.urls import path
from .views import *

urlpatterns = [
    path('authenticate/', authenticate, name="authenticate"),
    path('verify/', request_otp, name="requestotp"),
    path('verify-otp/', verify_otp, name="verify_otp"),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('profile/update/', update_profile, name='update_profile'),
    path('profile/', profile, name='profile'),
    path('password-reset-code/', request_password_reset_code, name="request_password_reset_code"),
    path('password-reset-code-confirm/', reset_password_code_confirmation, name="request_password_reset_code_confirmation"),
    path('password-reset/', reset_password, name="request_password"),
    path('jobs/recent',recent_jobs, name='recent_jobs'),
]