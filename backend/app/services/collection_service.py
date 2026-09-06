import json
from pathlib import Path

from app.schemas.collection import CollectionResponse


# Store collection data inside the backend data directory.
DATA_DIR = Path(__file__).resolve().parents[2] / "data"
COLLECTIONS_FILE = DATA_DIR / "collections.json"


def _ensure_storage():
    """Create the data directory and collection file if needed."""

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    if not COLLECTIONS_FILE.exists():
        COLLECTIONS_FILE.write_text("{}", encoding="utf-8")


def _load_collections() -> dict[str, CollectionResponse]:
    """Load collections from persistent storage."""

    _ensure_storage()

    try:
        data = json.loads(
            COLLECTIONS_FILE.read_text(encoding="utf-8")
        )
    except (json.JSONDecodeError, OSError):
        return {}

    return {
        collection_id: CollectionResponse.model_validate(collection)
        for collection_id, collection in data.items()
    }


def _save_collections(
    collections: dict[str, CollectionResponse],
):
    """Save collections to persistent storage."""

    _ensure_storage()

    data = {
        collection_id: collection.model_dump(mode="json")
        for collection_id, collection in collections.items()
    }

    COLLECTIONS_FILE.write_text(
        json.dumps(data, indent=2),
        encoding="utf-8",
    )


def create_collection(
    collection: CollectionResponse,
) -> CollectionResponse:
    """Persist a new collection."""

    collections = _load_collections()

    collections[collection.collection_id] = collection

    _save_collections(collections)

    return collection


def get_collections() -> list[CollectionResponse]:
    """Return all persisted collections."""

    collections = _load_collections()

    return list(collections.values())


def get_collection(
    collection_id: str,
) -> CollectionResponse | None:
    """Return one collection by ID."""

    collections = _load_collections()

    return collections.get(collection_id)


def delete_collection(
    collection_id: str,
) -> bool:
    """Delete a collection from persistent storage."""

    collections = _load_collections()

    if collection_id not in collections:
        return False

    del collections[collection_id]

    _save_collections(collections)

    return True