from typing import Annotated, Optional

from app.db.engine import SessionDep
from app.models.user import User
from app.models.service import ServicesList
from app.services.handle_services import (
    get_services,
    NoDataFoundError,
    DatabaseError
)
from app.utils.auth import get_current_active_user

from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)


router = APIRouter()


@router.get("/services/", response_model=ServicesList)
async def get_all_services(
        db: SessionDep,
        current_user: Annotated[User, Depends(get_current_active_user)],
        page: int = 1,
        page_size: int = 10,
        name: Optional[str] = None
):
    try:
        result = get_services(db, page, page_size, name)
        return result

    except NoDataFoundError:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT,
            detail="Services not found",
        )

    except DatabaseError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )
