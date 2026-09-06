from fastapi.testclient import TestClient

from app.main import app
from app.models.document import DocumentResponse
from app.services.document_repository import save_document


client = TestClient(app)


def test_list_documents():
    document = DocumentResponse(
        document_id="test-report.pdf",
        filename="test-report.pdf",
        file_type="application/pdf",
        status="processed",
        metadata={"author": "StarQ"},
        statistics={
            "page_count": 10,
            "text_pages": 10,
            "empty_pages": 0,
            "total_words": 500,
        },
        content=None,
    )

    save_document(document)

    response = client.get("/api/v1/documents")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert any(
        item["document_id"] == "test-report.pdf"
        for item in data
    )


def test_get_document_by_id():
    document = DocumentResponse(
        document_id="specific-report.pdf",
        filename="specific-report.pdf",
        file_type="application/pdf",
        status="processed",
        metadata={"author": "StarQ"},
        statistics={
            "page_count": 20,
            "text_pages": 18,
            "empty_pages": 2,
            "total_words": 1000,
        },
        content=None,
    )

    save_document(document)

    response = client.get(
        "/api/v1/documents/specific-report.pdf"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["document_id"] == "specific-report.pdf"
    assert data["filename"] == "specific-report.pdf"
    assert data["file_type"] == "application/pdf"
    assert data["statistics"]["page_count"] == 20
    assert data["content"] is None


def test_get_document_not_found():
    response = client.get(
        "/api/v1/documents/does-not-exist.pdf"
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Document not found."