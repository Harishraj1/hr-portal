# sms_service.py

import requests
import secrets
from cryptography.fernet import Fernet

SMS_TOKEN = "your_fast2sms_token"  # Replace with your actual Fast2SMS token
OTP_SECRET = Fernet.generate_key()  # Secret key for OTP encryption
WEBSITE_NAME = "YourWebsiteName"  # Replace with your website name

class SMSService:
    @staticmethod
    def generate_otp():
        otp = secrets.randbelow(1000000)
        return str(otp).zfill(6)  # Generate a 6-digit OTP

    @staticmethod
    def send_otp(mobile):
        otp = SMSService.generate_otp()  # Generate OTP
        print("OTP To Check:", otp)

        # Encrypt OTP
        cipher = Fernet(OTP_SECRET)
        token = cipher.encrypt(otp.encode()).decode()

        # Send OTP via Fast2SMS
        response = requests.get(
            f"https://www.fast2sms.com/dev/bulkV2",
            params={
                "authorization": SMS_TOKEN,
                "route": "dlt",
                "sender_id": "SMSTRS",
                "message": "YourMessageID",  # Replace with your actual message ID
                "variables_values": f"{otp}|For {WEBSITE_NAME}|",
                "flash": "0",
                "numbers": mobile
            }
        )

        print("OTP RESPONSE:", response.json())
        return token  # Return the encrypted OTP token

    @staticmethod
    def verify_otp(otp, token):
        # Decrypt OTP
        cipher = Fernet(OTP_SECRET)
        original_otp = cipher.decrypt(token.encode()).decode()
        return original_otp == otp  # Verify the OTP
