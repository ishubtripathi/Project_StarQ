import { useState } from "react";
import {
  ExternalLink,
  FileText,
  Folder,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";

import { useDocuments } from "../context/DocumentContext";

interface CollectionDocument {
  document_id: string;
  filename: string;
  file_type: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  documents: CollectionDocument[];
  updatedAt: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "collection-1",
      name: "Annual Reports",
      description: "Company annual reports and financial documents.",
      documents: [
        {
          document_id: "annual-report-2024.pdf",
          filename: "annual-report-2024.pdf",
          file_type: "pdf",
        },
        {
          document_id: "annual-report-2025.pdf",
          filename: "annual-report-2025.pdf",
          file_type: "pdf",
        },
        {
          document_id: "financial-summary.csv",
          filename: "financial-summary.csv",
          file_type: "csv",
        },
      ],
      updatedAt: "Today",
    },
    {
      id: "collection-2",
      name: "Financial Data",
      description: "Financial CSV files and related documents.",
      documents: [
        {
          document_id: "financial-data.csv",
          filename: "financial-data.csv",
          file_type: "csv",
        },
        {
          document_id: "financial-report.pdf",
          filename: "financial-report.pdf",
          file_type: "pdf",
        },
      ],
      updatedAt: "Yesterday",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [collectionName, setCollectionName] = useState("");

  const [collectionDescription, setCollectionDescription] = useState("");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { documents } = useDocuments();
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const toggleDocumentSelection = (documentId: string) => {
    setSelectedDocumentIds((current) =>
      current.includes(documentId)
        ? current.filter((id) => id !== documentId)
        : [...current, documentId],
    );
  };

  const handleCreateCollection = () => {
    const name = collectionName.trim();

    if (!name || selectedDocumentIds.length === 0) {
      return;
    }

    const selectedDocuments: CollectionDocument[] = documents
      .filter((document) => selectedDocumentIds.includes(document.id))
      .map((document) => ({
        document_id: document.name,
        filename: document.name,
        file_type: document.type,
      }));

    const newCollection: Collection = {
      id: `${Date.now()}`,
      name,
      description: collectionDescription.trim() || "No description provided.",
      documents: selectedDocuments,
      updatedAt: "Just now",
    };

    setCollections((current) => [newCollection, ...current]);

    setCollectionName("");
    setCollectionDescription("");
    setSelectedDocumentIds([]);
    setShowCreateForm(false);
  };

  const handleDeleteCollection = (collectionId: string) => {
    setCollections((current) =>
      current.filter((collection) => collection.id !== collectionId),
    );

    setOpenMenu(null);
  };

  const handleCancelCreate = () => {
    setCollectionName("");
    setCollectionDescription("");
    setSelectedDocumentIds([]);
    setShowCreateForm(false);
  };

  if (selectedCollection) {
    return (
      <div className="mx-auto w-full max-w-6xl p-5 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setSelectedCollection(null)}
            className="mt-0.5 rounded-lg border border-neutral-800 p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
            title="Back to collections"
          >
            ←
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight text-white">
              {selectedCollection.name}
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              {selectedCollection.description}
            </p>
          </div>
        </div>

        {/* Collection Info */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-white">Documents</h2>

            <p className="mt-1 text-sm text-neutral-500">
              {selectedCollection.documents.length}{" "}
              {selectedCollection.documents.length === 1
                ? "document"
                : "documents"}{" "}
              in this collection
            </p>
          </div>

          <button
            type="button"
            disabled={selectedCollection.documents.length === 0}
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Chat with Collection
          </button>
        </div>

        {/* Documents */}
        <div className="mt-5 space-y-3">
          {selectedCollection.documents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-800 bg-[#111111] px-6 py-12 text-center">
              <FileText size={22} className="mx-auto text-neutral-500" />

              <h3 className="mt-3 text-sm font-medium text-white">
                No documents
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                This collection doesn't contain any documents yet.
              </p>
            </div>
          ) : (
            selectedCollection.documents.map((document) => (
              <div
                key={document.document_id}
                className="flex items-center justify-between rounded-xl border border-neutral-800 bg-[#111111] px-4 py-4 transition hover:border-neutral-700 hover:bg-[#151515]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
                    <FileText size={17} className="text-neutral-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {document.filename}
                    </p>

                    <p className="mt-0.5 text-xs uppercase text-neutral-600">
                      {document.file_type}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Collections
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Organize multiple documents together.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
        >
          <Plus size={16} />
          New Collection
        </button>
      </div>

      {/* Create Collection */}
      {showCreateForm && (
        <div className="mt-6 rounded-xl border border-neutral-800 bg-[#111111] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
              <Folder size={17} className="text-neutral-300" />
            </div>

            <div>
              <h2 className="text-sm font-medium text-white">
                Create collection
              </h2>

              <p className="text-xs text-neutral-500">
                Group related documents together.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {/* Collection Name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-400">
                Collection name
              </label>

              <input
                type="text"
                value={collectionName}
                onChange={(event) => setCollectionName(event.target.value)}
                placeholder="e.g. Research Papers"
                className="w-full rounded-lg border border-neutral-800 bg-[#0b0b0b] px-3 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-400">
                Description
              </label>

              <input
                type="text"
                value={collectionDescription}
                onChange={(event) =>
                  setCollectionDescription(event.target.value)
                }
                placeholder="What is this collection about?"
                className="w-full rounded-lg border border-neutral-800 bg-[#0b0b0b] px-3 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-600"
              />
            </div>

            {/* Documents */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-medium text-neutral-400">
                  Documents
                </label>

                <span className="text-xs text-neutral-600">
                  {selectedDocumentIds.length} selected
                </span>
              </div>

              {documents.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-800 bg-[#0b0b0b] px-4 py-6 text-center">
                  <FileText size={20} className="mx-auto text-neutral-600" />

                  <p className="mt-2 text-sm text-neutral-500">
                    No documents available.
                  </p>

                  <p className="mt-1 text-xs text-neutral-600">
                    Upload documents first.
                  </p>
                </div>
              ) : (
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {documents.map((document) => {
                    const isSelected = selectedDocumentIds.includes(
                      document.id,
                    );

                    return (
                      <button
                        type="button"
                        key={document.id}
                        onClick={() => toggleDocumentSelection(document.id)}
                        className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                          isSelected
                            ? "border-neutral-500 bg-neutral-900"
                            : "border-neutral-800 bg-[#0b0b0b] hover:border-neutral-700 hover:bg-neutral-900"
                        }`}
                      >
                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                            isSelected
                              ? "border-white bg-white text-black"
                              : "border-neutral-700 text-transparent"
                          }`}
                        >
                          ✓
                        </div>

                        <FileText
                          size={16}
                          className="shrink-0 text-neutral-400"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm text-white">
                            {document.name}
                          </p>

                          <p className="mt-0.5 text-xs uppercase text-neutral-600">
                            {document.type}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelCreate}
                className="rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateCollection}
                disabled={
                  !collectionName.trim() || selectedDocumentIds.length === 0
                }
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collections */}
      <div className="mt-8">
        {collections.length === 0 ? (
          /* Empty State */
          <div className="rounded-xl border border-dashed border-neutral-800 bg-[#111111] px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">
              <Folder size={21} className="text-neutral-400" />
            </div>

            <h2 className="mt-4 text-sm font-medium text-white">
              No collections yet
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-sm text-neutral-500">
              Create a collection to organize related documents together.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedDocumentIds([]);
                setShowCreateForm(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              <Plus size={15} />
              Create Collection
            </button>
          </div>
        ) : (
          /* Collection Cards */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group rounded-xl border border-neutral-800 bg-[#111111] p-5 transition hover:border-neutral-700 hover:bg-[#151515]"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
                    <Folder size={18} className="text-neutral-300" />
                  </div>

                  {/* Options Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === collection.id ? null : collection.id,
                        )
                      }
                      className="rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-900 hover:text-neutral-300"
                      title="Collection options"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === collection.id && (
                      <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-lg border border-neutral-800 bg-[#151515] shadow-xl">
                        {/* Open Collection */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCollection(collection);
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white"
                        >
                          <ExternalLink size={15} />
                          Open Collection
                        </button>

                        <div className="border-t border-neutral-800" />

                        {/* Delete Collection */}
                        <button
                          type="button"
                          onClick={() => handleDeleteCollection(collection.id)}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-neutral-900"
                        >
                          <Trash2 size={15} />
                          Delete Collection
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Collection Name */}
                <h2 className="mt-4 truncate text-base font-medium text-white">
                  {collection.name}
                </h2>

                {/* Description */}
                <p className="mt-1 min-h-[40px] text-sm leading-5 text-neutral-500">
                  {collection.description}
                </p>

                {/* Collection Metadata */}
                <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <FileText size={14} />
                    {collection.documents.length}{" "}
                    {collection.documents.length === 1
                      ? "document"
                      : "documents"}
                  </div>

                  <span className="text-xs text-neutral-600">
                    {collection.updatedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
