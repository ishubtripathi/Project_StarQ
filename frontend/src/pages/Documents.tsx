import { useMemo, useState } from "react";

import UploadZone from "../components/documents/UploadZone";
import UploadStatus from "../components/documents/UploadStatus";
import DocumentList from "../components/documents/DocumentList";
import DocumentDetails from "../components/documents/DocumentDetails";

import {
  uploadMultipleDocuments,
  type MultipleUploadResponse,
} from "../services/documentService";

import { setActiveDocument } from "../services/activeDocument";

type UploadState = "idle" | "uploading" | "success" | "error";

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

export default function Documents() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [status, setStatus] = useState<UploadState>("idle");

  const [message, setMessage] = useState("");

  const [documents, setDocuments] = useState<DocumentItem[]>([
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
  ]);

  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(
    null,
  );

  // ==========================================================
  // HANDLE MULTIPLE UPLOAD
  // ==========================================================

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    // --------------------------------------------------------
    // Upload state
    // --------------------------------------------------------

    setStatus("uploading");

    setMessage(
      `Uploading ${files.length} ${
        files.length === 1 ? "document" : "documents"
      }...`,
    );

    try {
      // ------------------------------------------------------
      // Upload files to backend
      // ------------------------------------------------------

      const result: MultipleUploadResponse =
        await uploadMultipleDocuments(files);

      // ------------------------------------------------------
      // Convert backend response into DocumentItem objects
      // ------------------------------------------------------

      const newDocuments: DocumentItem[] = result.documents
        .filter((document) => document.status === "processed")
        .map((document, index) => {
          const statistics = document.statistics ?? {};

          return {
            id: `${Date.now()}-${index}-${document.filename}`,

            name: document.filename,

            type: document.file_type ?? "unknown",

            status: document.status,

            pages:
              typeof statistics.total_pages === "number"
                ? statistics.total_pages
                : null,

            characters:
              typeof statistics.total_characters === "number"
                ? statistics.total_characters
                : null,

            images:
              typeof statistics.total_images === "number"
                ? statistics.total_images
                : null,

            tables:
              typeof statistics.total_tables === "number"
                ? statistics.total_tables
                : null,

            date: "Just now",
          };
        });

      // ------------------------------------------------------
      // Add new documents to the beginning of the list
      // ------------------------------------------------------

      setDocuments((current) => [...newDocuments, ...current]);

      if (newDocuments.length > 0) {
        setActiveDocument({
          documents: newDocuments.map((document) => ({
            document_id: document.name,
            filename: document.name,
            file_type: document.type,
          })),
        });
      }
      // ------------------------------------------------------
      // Build status message
      // ------------------------------------------------------

      if (result.failed_files === 0) {
        setStatus("success");

        setMessage(
          `${result.processed_files} ${
            result.processed_files === 1 ? "document" : "documents"
          } uploaded and processed successfully.`,
        );
      } else {
        setStatus("error");

        setMessage(
          `${result.processed_files} processed, ` +
            `${result.failed_files} failed.`,
        );
      }
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading.",
      );
    }
  };

  // ==========================================================
  // DOCUMENT COUNT
  // ==========================================================

  const documentCountText = useMemo(() => {
    return `${documents.length} ${
      documents.length === 1 ? "document" : "documents"
    }`;
  }, [documents.length]);

  // ==========================================================
  // DOCUMENT DETAILS
  // ==========================================================

  if (selectedDocument) {
    return (
      <div className="mx-auto w-full max-w-5xl p-5 sm:p-6 lg:p-8">
        <DocumentDetails
          document={selectedDocument}
          onBack={() => setSelectedDocument(null)}
        />
      </div>
    );
  }

  // ==========================================================
  // MAIN PAGE
  // ==========================================================

  return (
    <div className="mx-auto w-full max-w-5xl p-5 sm:p-6 lg:p-8">
      {/* ====================================================
          HEADER
          ==================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Documents
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Upload and manage your PDF and CSV documents.
          </p>
        </div>
      </div>

      {/* ====================================================
          UPLOAD
          ==================================================== */}

      <div className="mt-8">
        <UploadZone
          onFilesSelect={handleUpload}
          disabled={status === "uploading"}
        />
      </div>

      {/* ====================================================
          STATUS
          ==================================================== */}

      <div className="mt-5">
        <UploadStatus status={status} message={message} />
      </div>

      {/* ====================================================
          DOCUMENTS
          ==================================================== */}

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Your Documents</h2>

          <span className="text-xs text-neutral-500">{documentCountText}</span>
        </div>

        <DocumentList
          documents={documents}
          onSelect={(document) => {
            const selected = document as DocumentItem;

            setSelectedDocument(selected);
          }}
        />
      </div>
    </div>
  );
}
