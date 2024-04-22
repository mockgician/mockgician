from typing import Annotated

from app.db.engine import SessionDep
from app.models.service import ServiceBase
from app.models.user import User
from app.services.handle_services import update_service
from app.utils.auth import get_current_active_user

from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)


router = APIRouter()


@router.patch("/services/", response_model=ServiceBase)
async def update_existing_service(
        service: ServiceBase,
        db: SessionDep,
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    try:
        updated_service = update_service(db, service)
        if updated_service is None:
            raise HTTPException(status_code=404, detail="Service not found")
        return updated_service

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"An error occurred while updating the service: {e}"
        )
