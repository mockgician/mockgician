from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.engine import engine
from app.models.service import Base
from app.models.user import Base as UserBase
from app.init_db import put_records_to_db

from app.routes import (
    token,
    get_services,
    get_service_by_id,
    delete_services,
    get_inputs,
    create_service,
    update_service,
    static,
)

Base.metadata.create_all(bind=engine)
UserBase.metadata.create_all(bind=engine)

put_records_to_db()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://0.0.0.0:3000",
    "http://0.0.0.0:8000",
    "http://0.0.0.0:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route for getting static data
app.include_router(static.router)
# Route for generating user token
app.include_router(token.router)
# Route for retrieving input data
app.include_router(get_inputs.router)
# Route for fetching data for services
app.include_router(get_services.router)
# Route for removing services by ids
app.include_router(delete_services.router)
# Route for creating a new service
app.include_router(create_service.router)
# Route for updating an existing service
app.include_router(update_service.router)
# Route for fetching service by id
app.include_router(get_service_by_id.router)
