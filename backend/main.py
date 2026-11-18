from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.products import router as products_router
from routers.categories import router as categories_router
from routers.banners import router as banners_router
from routers.auth import router as auth_router
from routers.orders import router as orders_router

app = FastAPI(title="Flipkart Clone API", version="1.0.0")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(categories_router)
app.include_router(banners_router)
app.include_router(auth_router)
app.include_router(orders_router)

@app.get("/")
def root():
    return {
        "message": "Flipkart Clone API is running",
        "docs": "/docs",
        "endpoints": [
            "/api/products",
            "/api/categories",
            "/api/banners",
            "/api/auth",
            "/api/orders"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
