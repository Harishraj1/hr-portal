from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Account, EmailVerification, ResetPasswordVerification, Job
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

from .utils import *


from .verify_with_mail import send_email
import secrets

def generate_otp():
    otp = secrets.randbelow(1000000)
    return str(otp).zfill(6)  


@api_view(['POST'])
def request_otp(request):
    email = request.data.get('email')
    username = request.data.get("username")
    otp = generate_otp()

    if candidate_collection.find_one({'email': email}):
        return JsonResponse({'message': 'User already exists, try logging in.'}, status=400)
    
    email_verification_collection.update_one(
        {'email': email},
        {'$set': {'otp': otp, 'created_at': datetime.datetime.utcnow()}},
        upsert=True
    )

    send_email(to_email=email, username=username, subject="Email verification", otp=otp)
    return JsonResponse({'message': 'OTP sent successfully.'}, status=200)

@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    verification = email_verification_collection.find_one({'email': email})

    if verification:
        created_at = verification.get('created_at')
        if created_at is not None:
            # Convert `created_at` to an aware datetime if it’s naive
            if timezone.is_naive(created_at):
                created_at = timezone.make_aware(created_at)

            expiration_time = created_at + datetime.timedelta(minutes=10)  # Adjust expiration time as needed

            if timezone.now() > expiration_time:
                return JsonResponse({'message': 'OTP has expired.'}, status=400)
        
        if verification['otp'] == otp:
            email_verification_collection.update_one({'email': email}, {'$set': {'is_verified': True}})
            return JsonResponse({'message': 'OTP verified successfully.'}, status=200)
        else:
            return JsonResponse({'message': 'Invalid OTP.'}, status=400)
    else:
        return JsonResponse({'message': 'Email not found or OTP not requested.'}, status=404)

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    otp = request.data.get('otp')
    password = request.data.get('password')

    verification = email_verification_collection.find_one({'email': email})

    if verification:
        created_at = verification.get('created_at')
        if created_at is not None:
            # Convert `created_at` to an aware datetime if it’s naive
            if timezone.is_naive(created_at):
                created_at = timezone.make_aware(created_at)

            expiration_time = created_at + datetime.timedelta(minutes=10)  # Adjust expiration time as needed

            if timezone.now() > expiration_time:
                return JsonResponse({'message': 'OTP has expired.'}, status=400)

        if verification['otp'] == otp:
            hashed_password = make_password(password)
            account = {
                'username': username,
                'email': email,
                'password': hashed_password,
            }
            candidate_collection.insert_one(account)

            # Manually generate JWT tokens
            access_token = create_access_token(str(account['_id']))
            refresh_token = create_refresh_token(str(account['_id']))

            return JsonResponse({
                'message': f"user {username} registered with {email}",
                'access': access_token,
                'refresh': refresh_token
            }, status=200)
        else:
            return JsonResponse({'message': 'Invalid OTP'}, status=400)
    else:
        return JsonResponse({'message': 'Email not found'}, status=404)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    account = candidate_collection.find_one({'email': email})
    if account:
        if check_password(password=password, encoded=account['password']):
            access_token = create_access_token(str(account['_id']))
            refresh_token = create_refresh_token(str(account['_id']))

            return Response({
                'refresh': refresh_token,
                'access': access_token,
            })
        else:
            return JsonResponse({"message": "Invalid credentials"}, status=400)
    else:
        return JsonResponse({'message': 'Email not found'}, status=404)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def authenticate(request):
    return JsonResponse({"message": "hello"})

@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_profile(request):
    user_email = request.user.email
    updates = {
        'first_name': request.data.get('first_name'),
        'last_name': request.data.get('last_name'),
        'phone_number': request.data.get('phone_number'),
        'address': request.data.get('address')
    }

    updates = {k: v for k, v in updates.items() if v is not None}  # Remove None values

    candidate_collection.update_one({'email': user_email}, {'$set': updates})
    return JsonResponse({'message': 'Profile updated successfully.'}, status=200)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def profile(request):
    account = candidate_collection.find_one({'email': request.user.email})

    if account:
        user_data = {
            'username': account['username'],
            'email': account['email'],
            'first_name': account.get('first_name', ''),
            'last_name': account.get('last_name', ''),
            'phone_number': account.get('phone_number', ''),
            'address': account.get('address', '')
        }
        return JsonResponse(user_data, status=200)
    else:
        return JsonResponse({'message': 'User not found'}, status=404)

@api_view(['POST'])
def request_password_reset_code(request):
    email = request.data.get('email')
    otp = generate_otp()

    if candidate_collection.find_one({'email': email}):
        reset_password_collection.update_one(
            {'email': email},
            {'$set': {'otp': otp, 'created_at': datetime.datetime.utcnow()}},
            upsert=True
        )
        send_email(to_email=email, subject="Reset Password", email_for="reset_password", otp=otp)
        return JsonResponse({'message': 'OTP sent successfully.'}, status=200)
    return JsonResponse({'message': 'The requested email doesn\'t exist. Please try with a registered account.'}, status=400)

@api_view(['POST'])
def reset_password_code_confirmation(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    verification = reset_password_collection.find_one({'email': email})

    if verification:
        created_at = verification.get('created_at')
        if created_at is not None:
            # Convert `created_at` to an aware datetime if it’s naive
            if timezone.is_naive(created_at):
                created_at = timezone.make_aware(created_at)

            expiration_time = created_at + datetime.timedelta(minutes=10)  # Adjust expiration time as needed

            if timezone.now() > expiration_time:
                return JsonResponse({'message': 'OTP has expired.'}, status=400)

        if verification['otp'] == otp:
            reset_password_collection.update_one({'email': email}, {'$set': {'is_verified': True}})
            return JsonResponse({'message': 'Reset Code Verified'}, status=200)
        else:
            return JsonResponse({'message': 'Invalid OTP'}, status=400)
    else:
        return JsonResponse({'message': 'Email not found'}, status=404)

@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email')
    password = request.data.get('password')

    account = candidate_collection.find_one({'email': email})

    if account:
        if check_password(password=password, encoded=account['password']):
            return JsonResponse({'message': "Password is same as before, try a different password!"}, status=400)
        
        hashed_password = make_password(password)
        candidate_collection.update_one({'email': email}, {'$set': {'password': hashed_password}})
        return JsonResponse({'message': "Password Reset Successfully"}, status=200)
    return JsonResponse({'message': 'Email not found'}, status=404)

@api_view(['GET'])
def recent_jobs(request):
    # Fetch all jobs from the MongoDB 'jobs' collection
    jobs_cursor = jobs_collection.find({})
    
    # Convert the cursor to a list and return it as JSON
    jobs = list(jobs_cursor)  # Convert cursor to list of documents

    # Return the job data as a JSON response
    return JsonResponse(jobs, safe=False, json_dumps_params={'default': str})   