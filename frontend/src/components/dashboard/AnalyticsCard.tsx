interface AnalyticsMetric {
  label: string;
  value: number;
}

interface AnalyticsCardProps {
  title: string;
  description: string;
  metrics: AnalyticsMetric[];
  footer?: string;
}

export default function AnalyticsCard({
  title,
  description,
  metrics,
  footer,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          {description}
        </p>
      </div>

      {/* Metrics */}
      <div
        className={`mt-7 grid gap-4 ${
          metrics.length === 2
            ? "grid-cols-2"
            : metrics.length === 3
              ? "grid-cols-3"
              : "grid-cols-2 sm:grid-cols-4"
        }`}
      >
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {metric.value.toLocaleString()}
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-7 border-t border-neutral-800 pt-4">
          <p className="text-xs text-neutral-500">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
}