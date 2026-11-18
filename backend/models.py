from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SellerInfo(BaseModel):
    name: str
    rating: float

class Product(BaseModel):
    id: str
    title: str
    brand: str
    category: str
    subcategory: Optional[str] = None
    price: int
    originalPrice: int
    discount: int
    rating: float
    ratingCount: int
    reviewCount: int
    isAssured: bool = True
    images: List[str]
    highlights: List[str] = []
    specifications: Dict[str, Any] = {}
    offers: List[str] = []
    seller: Optional[SellerInfo] = None
    inStock: bool = True
    stockCount: int = 10
    warranty: Optional[str] = None
    dealOfTheDay: bool = False
    bestOfCategory: bool = False
    topPick: bool = False

class Category(BaseModel):
    id: str
    name: str
    slug: str
    icon: str
    hasDropdown: bool = False
    subcategories: List[Dict[str, Any]] = []

class Banner(BaseModel):
    id: str
    title: str
    subtitle: str
    image: str
    fallbackBg: Optional[str] = None
    link: str

class SendOtpRequest(BaseModel):
    phone_or_email: str

class VerifyOtpRequest(BaseModel):
    phone_or_email: str
    otp: str

class Address(BaseModel):
    name: str
    phone: str
    pincode: str
    locality: str
    address: str
    city: str
    state: str
    landmark: Optional[str] = None
    alternatePhone: Optional[str] = None
    addressType: str = "HOME" # HOME or WORK

class OrderItem(BaseModel):
    productId: str
    title: str
    price: int
    originalPrice: int
    image: str
    quantity: int
    sellerName: Optional[str] = None

class CreateOrderRequest(BaseModel):
    items: List[OrderItem]
    totalAmount: int
    discountAmount: int
    deliveryFee: int = 0
    shippingAddress: Address
    paymentMethod: str
    paymentStatus: str = "COMPLETED"
