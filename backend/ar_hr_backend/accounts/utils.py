import os
import pymongo
from pymongo.errors import ConfigurationError, ServerSelectionTimeoutError
from pymongo import MongoClient
import secrets
import jwt
import datetime
from django.utils import timezone

class MongoDBConnection:
    _instance = None

    @classmethod
    def get_connection(cls):
        if cls._instance is None:
            try:
                client = pymongo.MongoClient("mongodb+srv://leonsihub:Ronaldo029%40MongoDB@ar-hr-cluster.v0kiw.mongodb.net/?retryWrites=true&w=majority&appName=Ar-Hr-Cluster", serverSelectionTimeoutMS=5000)
                client.admin.command("ping")  # Check connection
                cls._instance = client["hr_management_db"]
            except (ConfigurationError, ServerSelectionTimeoutError) as e:
                raise Exception(f"Database connection error: {e}")
        return cls._instance

    @classmethod
    def get_collection(cls, collection_name):
        return cls.get_connection()[collection_name]
    


# Function to create a refresh token manually
SECRET_KEY = 'your_secret_key'  # replace with your secret key
ALGORITHM = 'HS256'


def create_access_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15)  # Access token valid for 15 minutes
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Refresh token valid for 1 day
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Function to validate the refresh token
def validate_refresh_token(refresh_token):
    try:
        decoded_token = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = decoded_token['user_id']
        return user_id
    except jwt.ExpiredSignatureError:
        return "Token has expired"
    except jwt.InvalidTokenError:
        return "Invalid token"


hr_collection = MongoDBConnection.get_collection("hr_profiles")
candidate_collection = MongoDBConnection.get_collection("candidate_profiles")
email_verification_collection = MongoDBConnection.get_collection("email_verifications")
reset_password_collection = MongoDBConnection.get_collection("reset_password_verifications")
