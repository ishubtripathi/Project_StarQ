from uuid import uuid4

from fastapi import APIRouter, HTTPException

from app.schemas.collection import (
    CollectionCreate,
    CollectionResponse,
)

from app.services.collection_service import (
    create_collection,
    get_collections,
    get_collection,
    delete_collection,
)


router = APIRouter(
    prefix="/api/v1/collections",
    tags=["Collections"],
)


@router.post(
    "",
    response_model=CollectionResponse,
)
async def create_new_collection(
    collection: CollectionCreate,
):
    collection_id = str(uuid4())

    new_collection = CollectionResponse(
        collection_id=collection_id,
        name=collection.name,
        description=collection.description,
        documents=collection.documents,
    )

    return create_collection(new_collection)


@router.get(
    "",
    response_model=list[CollectionResponse],
)
async def get_all_collections():
    return get_collections()


@router.get(
    "/{collection_id}",
    response_model=CollectionResponse,
)
async def get_single_collection(
    collection_id: str,
):
    collection = get_collection(collection_id)

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found",
        )

    return collection


@router.delete("/{collection_id}")
async def remove_collection(
    collection_id: str,
):
    deleted = delete_collection(collection_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Collection not found",
        )

    return {
        "message": "Collection deleted successfully",
        "collection_id": collection_id,
    }