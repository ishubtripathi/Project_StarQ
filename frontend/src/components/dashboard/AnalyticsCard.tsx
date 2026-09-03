interface AnalyticsCardProps {
  title: string;
  description: string;
}

export default function AnalyticsCard({
  title,
  description,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5">
      <div>
        <h2 className="text-lg font-medium text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          {description}
        </p>
      </div>

      <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-dashed border-neutral-800 bg-[#0d0d0d]">
        <span className="text-sm text-neutral-600">
          Analytics will appear here
        </span>
      </div>
    </div>
  );
}