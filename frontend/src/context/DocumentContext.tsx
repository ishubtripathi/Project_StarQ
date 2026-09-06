/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  status: string;
  pages?: number | null;
  characters?: number | null;
  images?: number | null;
  tables?: number | null;
  date: string;
}

interface DocumentContextType {
  documents: DocumentItem[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentItem[]>>;
}

const DocumentContext = createContext<
  DocumentContextType | undefined
>(undefined);

const initialDocuments: DocumentItem[] = [
  {
    id: "demo-1",
    name: "annual-report.pdf",
    type: "pdf",
    status: "processed",
    pages: 102,
    characters: 24580,
    images: 13,
    tables: 8,
    date: "Today",
  },
  {
    id: "demo-2",
    name: "financial-data.csv",
    type: "csv",
    status: "processed",
    pages: null,
    characters: null,
    images: null,
    tables: null,
    date: "Yesterday",
  },
];

export function DocumentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [documents, setDocuments] =
    useState<DocumentItem[]>(initialDocuments);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        setDocuments,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error(
      "useDocuments must be used inside DocumentProvider.",
    );
  }

  return context;
}