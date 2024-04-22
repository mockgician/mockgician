from enum import Enum as PyEnum
from pydantic import BaseModel
from typing import List, Optional

from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class ServiceType(PyEnum):
    REST = "REST"
    SOAP = "SOAP"


class HTTPMethod(PyEnum):
    POST = "POST"
    GET = "GET"
    PUT = "PUT"
    PATCH = "PATCH"
    DELETE = "DELETE"


class HTTPStatus(PyEnum):
    OK = "200 OK"
    CREATED = "201 CREATED"
    ACCEPTED = "202 ACCEPTED"
    NO_CONTENT = "204 NO_CONTENT"
    BAD_REQUEST = "400 BAD_REQUEST"
    UNAUTHORIZED = "401 UNAUTHORIZED"
    FORBIDDEN = "403 FORBIDDEN"
    NOT_FOUND = "404 NOT_FOUND"
    METHOD_NOT_ALLOWED = "405 METHOD_NOT_ALLOWED"
    INTERNAL_SERVER_ERROR = "500 INTERNAL_SERVER_ERROR"
    SERVICE_UNAVAILABLE = "503 SERVICE_UNAVAILABLE"
    GATEWAY_TIMEOUT = "504 GATEWAY_TIMEOUT"


class ResponseFormat(PyEnum):
    JSON = "JSON"
    XML = "XML"
    TEXT = "TEXT"


class Service(Base):
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True)
    type = Column(Enum(*[m.value for m in ServiceType]))
    name = Column(String)
    description = Column(String)
    address = Column(String)
    method = Column(Enum(*[m.value for m in HTTPMethod]))
    headers = Column(String)
    response_code = Column(Enum(*[m.value for m in HTTPStatus]))
    response_format = Column(Enum(*[m.value for m in ResponseFormat]))
    response_body = Column(String)


class ServiceBase(BaseModel):
    class Config:
        from_attributes = True

    id: Optional[int] = None
    type: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    method: str
    headers: Optional[str] = None
    response_code: str
    response_format: str
    response_body: Optional[str] = None


class ServicesList(BaseModel):
    total: int
    pages: int
    services: List[ServiceBase]


class ServiceIds(BaseModel):
    services_ids: List[int]
