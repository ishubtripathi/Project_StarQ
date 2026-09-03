import { useState } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const message = value.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);
    setValue("");
  };

  return (
    <div className="border-t border-neutral-800 bg-[#0b0b0b] p-4">
      <div className="mx-auto flex w-full max-w-3xl items-end gap-3 rounded-xl border border-neutral-800 bg-[#111111] p-2">
        <textarea
          value={value}
          disabled={disabled}
          onChange={(event) =>
            setValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask anything about your documents..."
          rows={1}
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-neutral-600">
        Press Enter to send • Shift + Enter for a new line
      </p>
    </div>
  );
}