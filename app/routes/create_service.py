from typing import Annotated

from app.db.engine import SessionDep
from app.models.service import ServiceBase
from app.models.user import User
from app.services.handle_services import create_service
from app.utils.auth import get_current_active_user

from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)


router = APIRouter()


@router.put("/services/", response_model=ServiceBase, status_code=status.HTTP_201_CREATED)
async def create_new_service(
        db: SessionDep,
        service: ServiceBase,
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    try:
        new_service = create_service(db, service)
        return new_service

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"An error occurred while creating the service: {e}"
        )
