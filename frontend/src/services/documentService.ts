import type { UploadResponse } from "../types/document";

const API_BASE_URL = "http://127.0.0.1:8000";


// ==========================================================
// SINGLE DOCUMENT UPLOAD
// ==========================================================

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/v1/documents/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {

    let errorMessage = "Failed to upload document.";

    try {

      const errorData = await response.json();

      if (errorData?.detail) {
        errorMessage = errorData.detail;
      }

    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}


// ==========================================================
// MULTIPLE DOCUMENT UPLOAD
// ==========================================================

export interface MultipleUploadResponse {
  total_files: number;
  processed_files: number;
  failed_files: number;
  documents: Array<{
    filename: string;
    file_type?: string | null;
    status: string;
    metadata?: Record<string, unknown>;
    statistics?: Record<string, unknown>;
    error?: string;
  }>;
}


export async function uploadMultipleDocuments(
  files: File[]
): Promise<MultipleUploadResponse> {

  if (!files.length) {
    throw new Error("Please select at least one document.");
  }

  const formData = new FormData();

  // IMPORTANT:
  // The backend expects every file using the
  // same field name: "files".

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(
    `${API_BASE_URL}/api/v1/documents/upload-multiple`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {

    let errorMessage =
      "Failed to upload documents.";

    try {

      const errorData = await response.json();

      if (errorData?.detail) {
        errorMessage = errorData.detail;
      }

    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

