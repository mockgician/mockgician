from typing import Optional

from app.db.engine import SessionDep
from app.utils.custom_exceptions import NoDataFoundError, DatabaseError
from app.models.service import Service, ServiceBase, ServiceCreate, ServicesList

from sqlalchemy import func
from sqlalchemy_pagination import paginate


def get_services(
    db: SessionDep,
    page: Optional[int] = 1,
    page_size: Optional[int] = 5,
    name: Optional[str] = None,
) -> ServicesList:
    query = db.query(Service)

    if name:
        query = query.filter(Service.name.like(f"%{name}%"))

    pagination = paginate(query, page, page_size)

    if not pagination.items:
        raise NoDataFoundError("Services not found")

    services = [
        ServiceBase.model_validate(service.__dict__) for service in pagination.items
    ]

    pages = pagination.pages
    total = pagination.total

    return ServicesList(total=total, pages=pages, services=services)


def create_service(db: SessionDep, service: ServiceCreate) -> Service:
    try:
        new_service = Service(**service.dict())
        db.add(new_service)
        db.commit()
        db.refresh(new_service)
        return new_service
    except Exception as e:
        db.rollback()
        raise DatabaseError(f"An error occurred while deleting data: {e}")


def update_service(db: SessionDep, service: ServiceBase) -> Service:
    db_service = db.query(Service).filter(Service.id == service.id).first()
    if db_service is None:
        raise ValueError("Service does not exist")
    for var, value in vars(service).items():
        setattr(db_service, var, value) if value else None
    db.commit()
    db.refresh(db_service)
    return db_service


def delete_services(db: SessionDep, services_ids: list) -> int:
    try:
        deleted_count = (
            db.query(Service)
            .filter(Service.id.in_(services_ids))
            .delete(synchronize_session=False)
        )
        db.commit()
        return deleted_count
    except Exception as e:
        db.rollback()
        raise DatabaseError(f"An error occurred while deleting data: {e}")


def get_service_by_name(db: SessionDep, service_name: str) -> Optional[Service]:
    try:
        service = db.query(Service).filter_by(name=service_name).first()
        return service
    except Exception as e:
        raise DatabaseError(f"An error occurred while receiving data: {e}")


def get_service(db: SessionDep, service_id: int) -> Optional[Service]:
    try:
        service = db.query(Service).filter_by(id=service_id).first()
        return service
    except Exception as e:
        raise DatabaseError(f"An error occurred while receiving data: {e}")


def get_all_services_count(db: SessionDep) -> int:
    try:
        count = db.query(func.count(Service.id)).scalar()
        return count
    except Exception as e:
        raise DatabaseError(f"An error occurred while receiving data: {e}")
