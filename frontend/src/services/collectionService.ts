import type { Collection } from "../types/collection";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function getCollections(): Promise<Collection[]> {
  const response = await fetch(
    `${API_BASE_URL}/collections`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch collections.");
  }

  return response.json();
}

export async function createCollection(
  collection: Omit<Collection, "collection_id">,
): Promise<Collection> {
  const response = await fetch(
    `${API_BASE_URL}/collections`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create collection.");
  }

  return response.json();
}

export async function deleteCollection(
  collectionId: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/collections/${collectionId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete collection.");
  }
}