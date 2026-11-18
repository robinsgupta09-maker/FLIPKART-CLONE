import json
import os
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

router = APIRouter(prefix="/api/products", tags=["products"])

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "products.json")

def load_products():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("")
def get_products(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    search: Optional[str] = None,
    brand: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None,
    rating: Optional[float] = None,
    min_discount: Optional[int] = None,
    sort: Optional[str] = "relevance",
    page: int = Query(1, ge=1),
    limit: int = Query(24, ge=1, le=100)
):
    products = load_products()

    # Base filtering for facets
    filtered = products

    if category:
        cat_lower = category.lower().replace("-", "").replace(" ", "")
        filtered = [
            p for p in filtered
            if p["category"].lower().replace("-", "").replace(" ", "") == cat_lower
        ]

    if subcategory:
        filtered = [
            p for p in filtered
            if p.get("subcategory", "").lower() == subcategory.lower()
        ]

    if search:
        s = search.lower().strip()
        filtered = [
            p for p in filtered
            if s in p["title"].lower()
            or s in p["brand"].lower()
            or s in p["category"].lower()
            or s in p.get("subcategory", "").lower()
        ]

    # Compute available brands and prices in this category/search
    available_brands = {}
    for p in filtered:
        b = p["brand"]
        available_brands[b] = available_brands.get(b, 0) + 1

    # Secondary filtering
    if brand:
        selected_brands = [b.strip().lower() for b in brand.split(",") if b.strip()]
        if selected_brands:
            filtered = [p for p in filtered if p["brand"].lower() in selected_brands]

    if min_price is not None:
        filtered = [p for p in filtered if p["price"] >= min_price]

    if max_price is not None:
        filtered = [p for p in filtered if p["price"] <= max_price]

    if rating is not None:
        filtered = [p for p in filtered if p["rating"] >= rating]

    if min_discount is not None:
        filtered = [p for p in filtered if p["discount"] >= min_discount]

    # Sorting
    if sort == "price_asc":
        filtered.sort(key=lambda x: x["price"])
    elif sort == "price_desc":
        filtered.sort(key=lambda x: x["price"], reverse=True)
    elif sort == "rating_desc":
        filtered.sort(key=lambda x: x["rating"], reverse=True)
    elif sort == "discount_desc":
        filtered.sort(key=lambda x: x["discount"], reverse=True)
    elif sort == "newest":
        filtered.reverse()
    # "relevance" keeps default curated order

    total = len(filtered)
    total_pages = (total + limit - 1) // limit if total > 0 else 1
    start = (page - 1) * limit
    end = start + limit
    paginated_items = filtered[start:end]

    return {
        "products": paginated_items,
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": total_pages,
        "facets": {
            "brands": available_brands,
            "minPrice": min((p["price"] for p in products), default=0),
            "maxPrice": max((p["price"] for p in products), default=150000),
        }
    }

@router.get("/deals")
def get_deals():
    products = load_products()
    deals = [p for p in products if p.get("dealOfTheDay")]
    return deals

@router.get("/best-of")
def get_best_of():
    products = load_products()
    best_items = [p for p in products if p.get("bestOfCategory")]
    return best_items

@router.get("/top-picks")
def get_top_picks():
    products = load_products()
    top_items = [p for p in products if p.get("topPick")]
    return top_items

@router.get("/{product_id}")
def get_product_by_id(product_id: str):
    products = load_products()
    for p in products:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@router.get("/{product_id}/similar")
def get_similar_products(product_id: str, limit: int = 10):
    products = load_products()
    target = None
    for p in products:
        if p["id"] == product_id:
            target = p
            break
    if not target:
        raise HTTPException(status_code=404, detail="Product not found")

    similar = [
        p for p in products
        if p["id"] != product_id and (p["category"] == target["category"] or p["brand"] == target["brand"])
    ]
    return similar[:limit]
