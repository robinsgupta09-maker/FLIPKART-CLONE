# Flipkart Clone - Pixel-Accurate Learning & Portfolio Project

A pixel-accurate clone of [Flipkart (flipkart.com)](https://www.flipkart.com) built as a full-stack portfolio project.

## 🛠 Tech Stack

- **Frontend**:
  - React 19 + Vite
  - React Router DOM v7
  - Tailwind CSS v4 with Flipkart design system colors (`#2874f0`, `#ffe500`, `#fb641b`, `#388e3c`)
  - Lucide React Icons
  - Context API for Auth, Cart, and Wishlist state persistence (`localStorage`)
- **Backend**:
  - FastAPI (Python 3.11+)
  - Pydantic models
  - CORS middleware enabled
  - Dummy JSON datastore with **68+ products** across 8 categories
- **Real Product Photography**:
  - High-resolution unblocked catalog photography with responsive aspect ratios and hover zoom

---

## 🚀 Features Replicated

1. **Header (Sticky)**:
   - Flipkart logo with italicized *Explore Plus ★* sub-branding in yellow
   - Search bar with live auto-suggest dropdown
   - Login button with rich hover dropdown menu (*My Profile*, *Orders*, *Wishlist*, *Rewards*, *Gift Cards*)
   - *Become a Seller* & *More* dropdowns
   - Cart button with live item count badge
   - Responsive mobile drawer navigation

2. **Category Bar & Mega Menu**:
   - Grocery, Mobiles, Fashion, Electronics, Home & Furniture, Appliances, Travel, Beauty & Toys, Two Wheelers
   - Rich hover mega-menu dropdown with multi-column subcategories (Men's Top Wear, Women Ethnic, Footwear, Audio, Laptops, etc.)

3. **Homepage**:
   - Hero banner carousel with auto-sliding timer, pagination dots, and navigation arrows
   - *Best of Electronics* & *Deals of the Day* horizontal product sliders with *View All* teaser cards
   - 3-column promotional banner row
   - Comprehensive 6-column dark navy footer (`#172337`) with accepted payment badges (VISA, MasterCard, RuPay, UPI, NetBanking)

4. **Product Listing & Search**:
   - Left filter sidebar: Price range min/max selector, dynamic Brand filter checkboxes with search filter, Customer ratings (4★/3★/2★), Discount % filter, and *Flipkart Assured* filter
   - Sort By tabs: *Relevance*, *Price -- Low to High*, *Price -- High to Low*, *Newest First*
   - List View & Grid View switcher
   - Responsive pagination

5. **Product Detail Page (PDP)**:
   - Vertical thumbnail gallery with active selection
   - Large main image with 2.5x magnified zoom preview on hover
   - Dual action CTAs: **Add to Cart** (Yellow `#ff9f00`) & **Buy Now** (Orange `#fb641b`)
   - Ratings badge (`#388e3c`), Flipkart Assured badge, strike-through MRP, and discount percentage
   - Available offers list with tag icons
   - Delivery pincode checker with instant delivery estimate
   - Product highlights bullet points & services
   - Seller information & rating score
   - Detailed specifications table
   - Ratings & reviews breakdown bars with customer review cards
   - Similar products horizontal shelf

6. **Cart Page**:
   - Deliver to address strip with *Change* action
   - Quantity (+ / -) controls, *Save for Later*, and *Remove*
   - Price Details card with breakdown: Item price, Discount savings (green), Delivery charges (Free), Packaging fee, and Total Amount
   - Safe and Secure Payments trust guarantee

7. **Checkout Flow**:
   - 4-step accordion layout:
     1. Login status check
     2. Delivery Address selector + *Add a new address* modal form
     3. Order summary review
     4. Payment Options: UPI (GPay/PhonePe), Credit/Debit Cards, Net Banking, and Cash on Delivery
   - Mock payment confirmation with unique generated Order ID (`OD...`)

8. **User Account Pages**:
   - *My Orders*: Past order history with delivery tracking timeline and *Rate & Review* action
   - *My Wishlist*: Saved items with quick *Move to Cart* and delete actions
   - *Profile Information*: User personal details and saved addresses

---

## 📦 How to Run Locally

### 1. Backend Setup (FastAPI)

```bash
cd backend

# (Optional) Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows

# Install dependencies
pip install fastapi uvicorn pydantic

# Start FastAPI server
uvicorn main:app --reload --port 8000
```

Backend will be live at: `http://localhost:8000` (API documentation at `http://localhost:8000/docs`)

---

### 2. Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Frontend will be live at: `http://localhost:5173`

---

## 🌐 Deploy to Render (render.com)

This project is pre-configured with a Render Blueprint (`render.yaml`) to deploy both Frontend and Backend seamlessly on Render's Free tier:

### Option A: 1-Click Blueprint (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repository: `robinsgupta09-maker/FLIPKART-CLONE`.
4. Click **Apply**. Render will automatically build the React frontend and launch the FastAPI server!

### Option B: Manual Web Service
1. In Render, select **New +** -> **Web Service**.
2. Connect your repository.
3. Configure:
   - **Environment**: Python
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Click **Create Web Service**.

---

## 📁 Project Directory Structure

```
flipkart/
├── backend/
│   ├── main.py              # FastAPI application & router mounts
│   ├── models.py            # Pydantic schemas
│   ├── generate_data.py     # Product dataset generator script
│   ├── routers/
│   │   ├── auth.py          # OTP authentication & profiles
│   │   ├── banners.py       # Carousel & promotional banners
│   │   ├── categories.py    # Category tree & mega-menus
│   │   ├── orders.py        # Order creation & history
│   │   └── products.py      # Search, filter, sort & pagination
│   └── data/
│       ├── products.json    # 68+ realistic products
│       ├── categories.json  # Category list with mega-menus
│       ├── banners.json     # Hero banner carousel data
│       └── orders.json      # Placed orders store
├── frontend/
│   ├── index.html           # Title, meta, Roboto font & favicon
│   ├── vite.config.js       # Vite configuration with Tailwind v4
│   ├── package.json
│   └── src/
│       ├── App.jsx          # Route configurations
│       ├── main.jsx         # App root mount
│       ├── index.css        # Tailwind base & Flipkart design tokens
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   ├── CartContext.jsx
│       │   └── WishlistContext.jsx
│       ├── services/
│       │   └── api.js       # Fetch helpers for backend API
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── CategoryBar.jsx
│       │   ├── BannerCarousel.jsx
│       │   ├── ProductSlider.jsx
│       │   ├── ProductCard.jsx
│       │   ├── FilterSidebar.jsx
│       │   ├── Footer.jsx
│       │   ├── LoginModal.jsx
│       │   ├── RatingBadge.jsx
│       │   └── AssuredBadge.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── ProductListingPage.jsx
│           ├── ProductDetailPage.jsx
│           ├── CartPage.jsx
│           ├── CheckoutPage.jsx
│           ├── OrderSuccessPage.jsx
│           ├── MyOrdersPage.jsx
│           ├── WishlistPage.jsx
│           └── AccountPage.jsx
└── README.md
```
