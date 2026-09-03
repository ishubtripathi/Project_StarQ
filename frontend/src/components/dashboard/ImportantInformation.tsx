interface ImportantInformationProps {
  summary: string;
  keyPoints: string[];
  topics: string[];
}

export default function ImportantInformation({
  summary,
  keyPoints,
  topics,
}: ImportantInformationProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5">
      <h2 className="text-lg font-medium text-white">
        Important Information
      </h2>

      <div className="mt-5">
        <p className="text-sm leading-6 text-neutral-400">
          {summary}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-neutral-200">
          Key Points
        </h3>

        <ul className="mt-3 space-y-3">
          {keyPoints.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-5 text-neutral-400"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-neutral-200">
          Topics
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-300"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}