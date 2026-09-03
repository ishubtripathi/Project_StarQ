import type { ChatMessage } from "../../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

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
      </div>
    </div>
  );
}