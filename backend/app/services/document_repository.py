import json
from pathlib import Path

from app.models.document import DocumentResponse


DATA_DIR = (
    Path(__file__).resolve().parents[2] / "data"
)

DOCUMENTS_FILE = DATA_DIR / "documents.json"


def _ensure_storage():
    DATA_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    if not DOCUMENTS_FILE.exists():
        DOCUMENTS_FILE.write_text(
            "{}",
            encoding="utf-8",
        )


def _load_documents() -> dict[str, DocumentResponse]:
    _ensure_storage()

    try:
        data = json.loads(
            DOCUMENTS_FILE.read_text(
                encoding="utf-8"
            )
        )
    except (
        json.JSONDecodeError,
        OSError,
    ):
        return {}

    return {
        document_id: DocumentResponse.model_validate(
            document
        )
        for document_id, document in data.items()
    }


def _save_documents(
    documents: dict[str, DocumentResponse],
):
    _ensure_storage()

    data = {
        document_id: document.model_dump(
            mode="json"
        )
        for document_id, document in documents.items()
    }

    DOCUMENTS_FILE.write_text(
        json.dumps(
            data,
            indent=2,
        ),
        encoding="utf-8",
    )


def save_document(
    document: DocumentResponse,
) -> DocumentResponse:

    documents = _load_documents()

    stored_document = DocumentResponse(
        document_id=document.document_id,
        filename=document.filename,
        file_type=document.file_type,
        status=document.status,
        metadata=document.metadata,
        statistics=document.statistics,
        content=None,
    )

    documents[document.document_id] = stored_document

    _save_documents(documents)

    return document


def get_documents() -> list[DocumentResponse]:

    documents = _load_documents()

    return list(documents.values())


def get_document(
    document_id: str,
) -> DocumentResponse | None:

    documents = _load_documents()

    return documents.get(document_id)


def delete_document(
    document_id: str,
) -> bool:

    documents = _load_documents()

    if document_id not in documents:
        return False

    del documents[document_id]

    _save_documents(documents)

    return True