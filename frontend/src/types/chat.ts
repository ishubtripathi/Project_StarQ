export interface Source {
  filename: string | null;
  file_type: string | null;
  page_number?: number | null;
  row_number?: number | null;
  distance?: number | null;
}

export interface QueryResponse {
  query?: string;
  answer: string;
  retrieved_chunks?: unknown[];
  chunk_count?: number;
  context?: string;
  sources?: Source[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}