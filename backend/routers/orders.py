import json
import os
import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from models import CreateOrderRequest

router = APIRouter(prefix="/api/orders", tags=["orders"])

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "orders.json")

def load_orders():
    if not os.path.exists(DATA_PATH):
        with open(DATA_PATH, "w", encoding="utf-8") as f:
            json.dump([], f)
        return []
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_orders(orders):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(orders, f, indent=2, ensure_ascii=False)

@router.post("")
def create_order(request: CreateOrderRequest):
    orders = load_orders()
    order_id = f"OD{uuid.uuid4().hex[:14].upper()}"
    new_order = {
        "orderId": order_id,
        "createdAt": datetime.now().isoformat(),
        "status": "Order Confirmed",
        "expectedDelivery": "Expected delivery within 2-4 business days",
        "items": [item.model_dump() for item in request.items],
        "totalAmount": request.totalAmount,
        "discountAmount": request.discountAmount,
        "deliveryFee": request.deliveryFee,
        "shippingAddress": request.shippingAddress.model_dump(),
        "paymentMethod": request.paymentMethod,
        "paymentStatus": request.paymentStatus
    }
    orders.insert(0, new_order)
    save_orders(orders)
    return new_order

@router.get("")
def get_orders():
    return load_orders()

@router.get("/{order_id}")
def get_order(order_id: str):
    orders = load_orders()
    for o in orders:
        if o["orderId"] == order_id:
            return o
    raise HTTPException(status_code=404, detail="Order not found")
