export interface CollectionDocument {
  document_id: string;
  filename: string;
  file_type: string;
}

export interface Collection {
  collection_id: string;
  name: string;
  description: string;
  documents: CollectionDocument[];
}