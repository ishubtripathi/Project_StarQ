import type { ChatMessage } from "../../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  const uniqueSources = Array.from(
    new Map(
      (message.sources ?? [])
        .filter((source) => source.filename)
        .map((source) => [
          source.filename,
          source,
        ])
    ).values()
  );

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-white text-black"
            : "border border-neutral-800 bg-[#111111] text-neutral-300"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
        </p>

        {!isUser && uniqueSources.length > 0 && (
          <div className="mt-3 border-t border-neutral-800 pt-3">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
              Sources
            </p>

            <div className="flex flex-wrap gap-2">
              {uniqueSources.map((source) => (
                <div
                  key={source.filename}
                  className="inline-flex max-w-55 items-center gap-1.5 rounded-lg border border-neutral-800 bg-[#0b0b0b] px-2.5 py-1.5"
                  title={source.filename}
                >
                  <span className="text-xs">📄</span>

                  <span className="truncate text-xs text-neutral-400">
                    {source.filename}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}