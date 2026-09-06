import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";
import type { DocumentResponse } from "../types/document";
import StatCard from "../components/dashboard/StatCard";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";

export default function Dashboard() {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        setLoading(true);
        setError(null);

        const data = await getDocuments();
        setDocuments(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load documents.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  // ==========================================================
  // DASHBOARD STATISTICS
  // ==========================================================

  const totalDocuments = documents.length;

  const pdfDocuments = documents.filter(
    (document) =>
      document.file_type === "pdf" || document.file_type === "application/pdf",
  ).length;

  const csvDocuments = documents.filter(
    (document) =>
      document.file_type === "csv" || document.file_type === "text/csv",
  ).length;

  const totalPages = documents.reduce(
    (total, document) => total + Number(document.statistics?.page_count ?? 0),
    0,
  );

  const totalRows = documents.reduce(
    (total, document) => total + Number(document.statistics?.row_count ?? 0),
    0,
  );

  const totalWords = documents.reduce(
    (total, document) => total + Number(document.statistics?.total_words ?? 0),
    0,
  );

  const totalCharacters = documents.reduce(
    (total, document) =>
      total + Number(document.statistics?.total_characters ?? 0),
    0,
  );

  const totalImages = documents.reduce(
    (total, document) => total + Number(document.statistics?.total_images ?? 0),
    0,
  );

  const totalTextPages = documents.reduce(
    (total, document) =>
      total +
      Number(
        document.statistics?.text_pages ??
          document.statistics?.pages_with_text ??
          0,
      ),
    0,
  );

  const totalEmptyPages = documents.reduce(
    (total, document) =>
      total +
      Number(
        document.statistics?.empty_pages ??
          document.statistics?.pages_without_text ??
          0,
      ),
    0,
  );

  const totalMissingValues = documents.reduce(
    (total, document) =>
      total + Number(document.statistics?.missing_values ?? 0),
    0,
  );

  const totalCells = documents.reduce(
    (total, document) =>
      total +
      Number(document.statistics?.row_count ?? 0) *
        Number(document.statistics?.column_count ?? 0),
    0,
  );

  const totalAvailableValues = Math.max(totalCells - totalMissingValues, 0);

  console.log("Dashboard documents:", documents);

  return (
    <div className="mx-auto w-full max-w-7xl p-5 sm:p-6 lg:p-8">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Overview of your documents and insights.
          </p>
        </div>

        <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200 sm:w-auto">
          Upload Document
        </button>
      </div>

      {/* ======================================================
          LOADING STATE
      ====================================================== */}

      {loading && (
        <div className="mt-8 rounded-xl border border-neutral-800 bg-[#111111] p-6">
          <p className="text-neutral-400">Loading documents...</p>
        </div>
      )}

      {/* ======================================================
          ERROR STATE
      ====================================================== */}

      {error && (
        <div className="mt-8 rounded-xl border border-red-900 bg-red-950/30 p-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* ======================================================
          DASHBOARD CONTENT
      ====================================================== */}

      {!loading && !error && (
        <>
          {/* ==================================================
              PRIMARY STATISTICS
          ================================================== */}

          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Documents"
              value={totalDocuments}
              description="Documents available in StarQ."
            />

            <StatCard
              title="PDF Documents"
              value={pdfDocuments}
              description="Uploaded PDF documents."
            />

            <StatCard
              title="CSV Documents"
              value={csvDocuments}
              description="Uploaded CSV datasets."
            />

            <StatCard
              title="Total Pages"
              value={totalPages.toLocaleString()}
              description="Pages across PDF documents."
            />
          </section>

          {/* ==================================================
              ADDITIONAL STATISTICS
          ================================================== */}

          <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              title="Total Rows"
              value={totalRows.toLocaleString()}
              description="Rows across CSV datasets."
            />

            <StatCard
              title="Total Words"
              value={totalWords.toLocaleString()}
              description="Words extracted from PDF documents."
            />
          </section>

          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-medium tracking-tight text-white">
                Analytics
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                A summary of the content and data extracted from your documents.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <AnalyticsCard
                title="PDF Overview"
                description="Content extracted from your PDF documents."
                metrics={[
                  {
                    label: "Words",
                    value: totalWords,
                  },
                  {
                    label: "Characters",
                    value: totalCharacters,
                  },
                  {
                    label: "Images",
                    value: totalImages,
                  },
                ]}
                footer={`${totalTextPages.toLocaleString()} text pages · ${totalEmptyPages.toLocaleString()} empty pages`}
              />

              <AnalyticsCard
                title="Page Distribution"
                description="Text availability across your PDF documents."
                metrics={[
                  {
                    label: "Text Pages",
                    value: totalTextPages,
                  },
                  {
                    label: "Empty Pages",
                    value: totalEmptyPages,
                  },
                ]}
                footer={`${totalPages.toLocaleString()} total pages analyzed`}
              />

              <AnalyticsCard
                title="CSV Overview"
                description="Structure and size of your CSV datasets."
                metrics={[
                  {
                    label: "Rows",
                    value: totalRows,
                  },
                  {
                    label: "Columns",
                    value: documents.reduce(
                      (total, document) =>
                        total + Number(document.statistics?.column_count ?? 0),
                      0,
                    ),
                  },
                ]}
                footer={`${totalMissingValues.toLocaleString()} missing values detected`}
              />

              <AnalyticsCard
                title="Data Quality"
                description="Availability of values across your CSV datasets."
                metrics={[
                  {
                    label: "Available",
                    value: totalAvailableValues,
                  },
                  {
                    label: "Missing",
                    value: totalMissingValues,
                  },
                ]}
                footer={
                  totalCells > 0
                    ? `${((totalAvailableValues / totalCells) * 100).toFixed(
                        1,
                      )}% of values are available`
                    : "No CSV values available"
                }
              />
            </div>
          </section>

          {/* ==================================================
              DOCUMENT LIST
          ================================================== */}

          <section className="mt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">
                Available Documents
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Documents currently available in StarQ.
              </p>
            </div>

            {documents.length === 0 ? (
              <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6">
                <p className="text-sm text-neutral-400">
                  No documents have been uploaded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((document) => (
                  <div
                    key={document.document_id}
                    className="rounded-xl border border-neutral-800 bg-[#111111] p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium text-white">
                          {document.filename}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                          {document.file_type}
                        </p>
                      </div>

                      <span className="text-sm text-neutral-400">
                        Status: {document.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
