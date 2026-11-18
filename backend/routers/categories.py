import json
import os
from fastapi import APIRouter

router = APIRouter(prefix="/api/categories", tags=["categories"])

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "categories.json")

@router.get("")
def get_categories():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
