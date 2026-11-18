import json
import os
from fastapi import APIRouter

router = APIRouter(prefix="/api/banners", tags=["banners"])

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "banners.json")

@router.get("")
def get_banners():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
