interface DocumentOverviewProps {
  filename: string;
  type: string;
  status: string;
  pages: number;
}

export default function DocumentOverview({
  filename,
  type,
  status,
  pages,
}: DocumentOverviewProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-neutral-500">
            Latest document
          </p>

          <h2 className="mt-1 text-lg font-medium text-white">
            {filename}
          </h2>
        </div>

        <span className="w-fit rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
          {status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-5 sm:grid-cols-4">
        <div>
          <p className="text-xs text-neutral-500">Type</p>
          <p className="mt-1 text-sm text-neutral-200">{type}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Pages</p>
          <p className="mt-1 text-sm text-neutral-200">{pages}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Status</p>
          <p className="mt-1 text-sm text-neutral-200">{status}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500">Processing</p>
          <p className="mt-1 text-sm text-neutral-200">Complete</p>
        </div>
      </div>
    </div>
  );
}