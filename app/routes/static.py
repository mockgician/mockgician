from fastapi import APIRouter
from fastapi.staticfiles import StaticFiles

router = APIRouter()


@router.on_event("startup")
def load_static():
    router.mount("/static", StaticFiles(directory="ui/build"), name="static")
