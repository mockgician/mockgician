from typing import Annotated

from app.models.user import User
from app.models.service import (
    ServiceType,
    HTTPMethod,
    HTTPStatus,
)
from app.utils.auth import get_current_active_user

from fastapi import (
    APIRouter,
    Depends,
)


router = APIRouter()


@router.get("/service_types/", response_model=list[ServiceType])
def get_service_types(current_user: Annotated[User, Depends(get_current_active_user)]):
    return list(ServiceType)


@router.get("/http_methods/", response_model=list[HTTPMethod])
def get_http_methods(current_user: Annotated[User, Depends(get_current_active_user)]):
    return list(HTTPMethod)


@router.get("/http_statuses/", response_model=list[HTTPStatus])
async def get_http_status_codes(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return list(HTTPStatus)
