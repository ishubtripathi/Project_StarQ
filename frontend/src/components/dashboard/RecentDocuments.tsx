import { FileText, Database } from "lucide-react";

interface Document {
  name: string;
  type: string;
  status: string;
  pages: number | null;
  date: string;
}

interface RecentDocumentsProps {
  documents: Document[];
}

export default function RecentDocuments({
  documents,
}: RecentDocumentsProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#111111]">
      <div className="border-b border-neutral-800 p-5">
        <h2 className="text-lg font-medium text-white">
          Recent Documents
        </h2>
      </div>

      <div className="divide-y divide-neutral-800">
        {documents.map((document) => {
          const Icon =
            document.type === "CSV"
              ? Database
              : FileText;

          return (
            <div
              key={document.name}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-2">
                  <Icon size={18} className="text-neutral-400" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-200">
                    {document.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {document.type}
                    {document.pages
                      ? ` • ${document.pages} pages`
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-500">
                  {document.date}
                </span>

                <span className="rounded-full border border-neutral-700 px-2.5 py-1 text-xs text-neutral-400">
                  {document.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}