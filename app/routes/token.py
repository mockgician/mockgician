from datetime import timedelta
from typing import Annotated

from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status,
)
from fastapi.security import OAuth2PasswordRequestForm

from app.db.engine import SessionDep
from app.config import settings
from app.utils.auth import (
    authenticate_user,
    create_access_token,
)
from app.models.token import Token


router = APIRouter()


@router.post("/token/", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: SessionDep,
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
