import { FileText, Database, ChevronRight } from "lucide-react";

interface DocumentCardProps {
  name: string;
  type: string;
  status: string;
  pages?: number | null;
  date?: string;
  onClick?: () => void;
}

export default function DocumentCard({
  name,
  type,
  status,
  pages,
  date,
  onClick,
}: DocumentCardProps) {
  const isCsv = type.toLowerCase() === "csv";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-4 border-b border-neutral-800 px-5 py-4 text-left transition hover:bg-neutral-900/60"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
        {isCsv ? (
          <Database size={18} className="text-neutral-400" />
        ) : (
          <FileText size={18} className="text-neutral-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-200">
          {name}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <span>{type.toUpperCase()}</span>

          {pages !== null && pages !== undefined && (
            <>
              <span>•</span>
              <span>{pages} pages</span>
            </>
          )}

          {date && (
            <>
              <span>•</span>
              <span>{date}</span>
            </>
          )}
        </div>
      </div>

      <span className="hidden rounded-full border border-neutral-700 px-2.5 py-1 text-xs text-neutral-400 sm:block">
        {status}
      </span>

      <ChevronRight
        size={18}
        className="shrink-0 text-neutral-600 transition group-hover:translate-x-0.5 group-hover:text-neutral-300"
      />
    </button>
  );
}