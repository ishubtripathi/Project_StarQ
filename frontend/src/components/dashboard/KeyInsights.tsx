interface Insight {
  title: string;
  description: string;
}

interface KeyInsightsProps {
  insights: Insight[];
}

export default function KeyInsights({
  insights,
}: KeyInsightsProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5">
      <h2 className="text-lg font-medium text-white">
        Key Insights
      </h2>

      <div className="mt-5 space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="rounded-lg border border-neutral-800 bg-[#0d0d0d] p-4"
          >
            <h3 className="text-sm font-medium text-neutral-200">
              {insight.title}
            </h3>

            <p className="mt-1 text-sm leading-5 text-neutral-500">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}