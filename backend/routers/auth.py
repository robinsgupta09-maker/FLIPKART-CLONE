import uuid
from fastapi import APIRouter
from models import SendOtpRequest, VerifyOtpRequest

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/send-otp")
def send_otp(request: SendOtpRequest):
    # Dummy OTP sending (always succeeds)
    return {
        "success": True,
        "message": f"OTP successfully sent to {request.phone_or_email}",
        "dummyOtp": "123456" # For convenient testing
    }

@router.post("/verify-otp")
def verify_otp(request: VerifyOtpRequest):
    # Any OTP is accepted for this mock portfolio project
    token = f"fk_token_{uuid.uuid4().hex[:16]}"
    is_phone = request.phone_or_email.replace("+", "").isdigit()
    
    user = {
        "id": f"usr_{uuid.uuid4().hex[:8]}",
        "name": "Flipkart Customer",
        "email": request.phone_or_email if not is_phone else "customer@flipkart.demo",
        "phone": request.phone_or_email if is_phone else "9876543210",
        "isPlusMember": True,
        "superCoins": 240,
        "savedAddresses": [
            {
                "id": "addr-1",
                "name": "Rahul Sharma",
                "phone": "9876543210",
                "pincode": "560103",
                "locality": "Bellandur Outer Ring Road",
                "address": "Flat 402, Green Glen Layout, Behind EcoSpace",
                "city": "Bengaluru",
                "state": "Karnataka",
                "landmark": "Near Central Mall",
                "addressType": "HOME",
                "isDefault": True
            }
        ]
    }
    return {
        "success": True,
        "token": token,
        "user": user
    }

@router.get("/me")
def get_current_user():
    return {
        "id": "usr_demo",
        "name": "Flipkart Customer",
        "email": "customer@flipkart.demo",
        "phone": "9876543210",
        "isPlusMember": True,
        "superCoins": 240
    }
