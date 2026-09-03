interface UploadStatusProps {
  status: "idle" | "uploading" | "success" | "error";
  message?: string;
}

export default function UploadStatus({
  status,
  message,
}: UploadStatusProps) {
  if (status === "idle") {
    return null;
  }

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        status === "uploading"
          ? "border-neutral-700 bg-neutral-900 text-neutral-300"
          : status === "success"
            ? "border-neutral-700 bg-neutral-900 text-white"
            : "border-red-900 bg-red-950/30 text-red-400"
      }`}
    >
      {message}
    </div>
  );
}