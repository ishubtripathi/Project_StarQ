export interface Source {
  filename?: string;
  file_type?: string;
  page_number?: number;
  row_number?: number;
  distance?: number;
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