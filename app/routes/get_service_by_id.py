from typing import Annotated

from app.db.engine import SessionDep
from app.models.user import User
from app.models.service import ServiceBase
from app.services.handle_services import get_service
from app.utils.auth import get_current_active_user

from fastapi import APIRouter, HTTPException, Depends, status


router = APIRouter()


@router.get("/services/{id}", response_model=ServiceBase)
async def get_service_by_id(
    id: int,  # noqa
    db: SessionDep,
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    try:
        service = get_service(db, id)
        if service is None:
            raise HTTPException(status_code=404, detail="Service not found")
        return service

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching the service: {e}",
        )
