interface ChatHeaderProps {
  documentName?: string;
}

export default function ChatHeader({
  documentName,
}: ChatHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-800 bg-[#0b0b0b] px-4 sm:px-6">
      
      <div className="flex min-w-0 items-center gap-3">
        {/* StarQ Logo */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
          S
        </div>

        {/* Title */}
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-white">
            StarQ
          </h1>

          <p className="truncate text-xs text-neutral-500">
            {documentName
              ? `Chatting with ${documentName}`
              : "Document Intelligence"}
          </p>
        </div>
      </div>

      {/* Active document indicator */}
      {documentName && (
        <div className="hidden max-w-[280px] items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 sm:flex">
          <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />

          <span className="truncate text-xs text-neutral-400">
            {documentName}
          </span>
        </div>
      )}
    </header>
  );
}