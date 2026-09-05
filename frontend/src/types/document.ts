export interface UploadResponse {
  document_id: string;
  filename: string;
  file_type: string;
  status: string;
  page_count?: number | null;
  metadata?: Record<string, unknown>;
  statistics?: Record<string, unknown>;
  content?: unknown;
}

export interface UploadError {
  detail: string;
}

export interface ActiveDocument {
  documents: {
    document_id: string;
    filename: string;
    file_type: string;
  }[];
}