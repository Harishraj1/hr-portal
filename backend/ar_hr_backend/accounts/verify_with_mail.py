import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

APP_EMAIL = "ronaldoleon029@gmail.com"
APP_PASSWORD = "riub ixyp wrgz wvgo"

def getHTMLcontent(username, otp, email_for):
    return f'''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello {username}!</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    color: #333;
                }}
                .container {{
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }}
                h1 {{
                    color: #4A90E2;
                    margin-bottom: 10px;
                }}
                p {{
                    margin: 10px 0;
                }}
                .otp {{
                    font-size: 24px;
                    font-weight: bold;
                    color: #E94E77; /* A distinct color for the OTP */
                }}
                .footer {{
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888;
                }}
                a {{
                    color: #4A90E2;
                    text-decoration: none;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>{"Welcome to Our Service!" if email_for == "welcome" else "Reset Password"}</h1>
                <p>{"Your One-Time Password (OTP) is:" if email_for == "welcome" else "Your reset code is:"}</p>
                <p class="otp">{otp}</p>
                <p class="footer">{"Please verify your email to activate your account." if email_for == "welcome" else "Please use this code to reset your password."}</p>
            </div>
        </body>
        </html>
    '''

def send_email(subject, to_email, otp, username="null", email_for="welcome"):
    smtp_server = "smtp.gmail.com"  
    smtp_port = 587  # Use 587 for TLS
    smtp_user = APP_EMAIL  
    smtp_password = APP_PASSWORD

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(getHTMLcontent(username=to_email if username == "null" else username, otp=otp, email_for=email_for), 'html'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls() 
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            return True
    except Exception as e:
        return f"Failed to send email: {e}"

