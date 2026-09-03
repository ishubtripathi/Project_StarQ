import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";

interface ChatMessagesProps {
  messages: ChatMessage[];
  loading: boolean;
}

export default function ChatMessages({
  messages,
  loading,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-neutral-800 bg-[#111111] px-4 py-3">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-500" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-500 delay-100" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-500 delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}