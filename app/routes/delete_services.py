from typing import Annotated

from app.db.engine import SessionDep
from app.models.user import User
from app.models.service import ServiceIds
from app.utils.auth import get_current_active_user
from app.services.handle_services import delete_services, DatabaseError

from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)

router = APIRouter()


@router.delete("/services/")
async def delete_services_by_ids(
        db: SessionDep,
        request: ServiceIds,
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    try:
        result = delete_services(db, request.services_ids)
        return {"message": "Services successfully deleted", "deleted_services": result}

    except DatabaseError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )
