import type { QueryResponse } from "../types/chat";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function sendQuery(
  query: string,
  documentIds: string[]
): Promise<QueryResponse> {
  if (!query.trim()) {
    throw new Error("Query cannot be empty.");
  }

  if (documentIds.length === 0) {
    throw new Error("No documents selected.");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.trim(),
        top_k: 5,
        document_ids: documentIds,
      }),
    }
  );

  if (!response.ok) {
    let errorMessage =
      "Failed to process your question.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        errorMessage = errorData.detail;
      }
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}