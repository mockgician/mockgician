from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_service_types():
    response = client.get("/service_types/")
    assert response.status_code == 200
    # assert response.json() == [{"service_type": "example_service_type"}]


def test_get_http_methods():
    response = client.get("/http_methods/")
    assert response.status_code == 200
    # assert response.json() == [{"http_method": "GET"}, {"http_method": "POST"}]
