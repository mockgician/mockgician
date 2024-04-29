import json
from sqlalchemy.orm import sessionmaker

from app.db.engine import engine
from app.config import settings
from app.models.service import Service

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def put_records_to_db():
    services = []

    for i in range(settings.TEST_DATA_COUNT):
        services.append(
            Service(
                type="REST",
                name=f"Test Service # {i + 1}",
                description=f"This is a test service # {i + 1}",
                address="Test Address",
                method="POST",
                headers=json.dumps([{"key": "Content-Type", "value": "application/json"}]),
                response_code="200 OK",
                response_format="JSON",
                response_body=json.dumps({"message": f"Service {i + 1}"}),
            )
        )

    with SessionLocal() as session:
        session.add_all(services)
        session.commit()
