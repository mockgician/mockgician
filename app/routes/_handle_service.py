from fastapi import (
    APIRouter,
    HTTPException,
)
import json
from starlette.requests import Request

from app.services.get_services import (
    get_service_by_name
)

router = APIRouter()


@router.route(path="/{service_name}", methods=["GET", "POST", "PUT", "DELETE"])
def handle_service(request: Request):
    service = get_service_by_name(request.url.path[1:])

    if service is None:
        raise HTTPException(status_code=404, detail="Service was not found by id")

    else:
        return json.loads(service.body)
