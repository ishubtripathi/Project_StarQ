import {
  FileText,
  Database,
  CheckCircle2,
} from "lucide-react";

interface DocumentDetailsProps {
  document: {
    name: string;
    type: string;
    status: string;
    pages?: number | null;
    characters?: number | null;
    images?: number | null;
    tables?: number | null;
    date?: string;
  };
  onBack: () => void;
}

export default function DocumentDetails({
  document,
  onBack,
}: DocumentDetailsProps) {
  const isCsv = document.type.toLowerCase() === "csv";

  const stats = [
    {
      label: "Pages",
      value: document.pages ?? "—",
    },
    {
      label: "Characters",
      value: document.characters ?? "—",
    },
    {
      label: "Images",
      value: document.images ?? "—",
    },
    {
      label: "Tables",
      value: document.tables ?? "—",
    },
  ];

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-neutral-500 transition hover:text-white"
      >
        ← Back to Documents
      </button>

      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">
              {isCsv ? (
                <Database size={21} className="text-neutral-400" />
              ) : (
                <FileText size={21} className="text-neutral-400" />
              )}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold text-white">
                {document.name}
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                {document.type.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300">
            <CheckCircle2 size={14} />
            {document.status}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-neutral-800 bg-[#0d0d0d] p-4"
            >
              <p className="text-xs text-neutral-500">
                {stat.label}
              </p>

              <p className="mt-2 text-lg font-medium text-neutral-200">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {document.date && (
          <p className="mt-5 text-xs text-neutral-600">
            Uploaded {document.date}
          </p>
        )}
      </div>
    </div>
  );
}