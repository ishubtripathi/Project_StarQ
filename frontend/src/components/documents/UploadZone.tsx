import { useRef, useState } from "react";
import { Upload, FileText, Database } from "lucide-react";

interface UploadZoneProps {
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}

export default function UploadZone({
  onFilesSelect,
  disabled = false,
}: UploadZoneProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);


  // ==========================================================
  // VALIDATE FILES
  // ==========================================================

  const handleFiles = (fileList: FileList | File[]) => {

    if (disabled) {
      return;
    }

    const files = Array.from(fileList);

    const validFiles = files.filter((file) => {

      const extension = file.name
        .split(".")
        .pop()
        ?.toLowerCase();

      return (
        extension === "pdf" ||
        extension === "csv"
      );
    });

    if (!validFiles.length) {
      return;
    }

    onFilesSelect(validFiles);
  };


  return (
    <div

      // ------------------------------------------------------
      // Drag Over
      // ------------------------------------------------------

      onDragOver={(event) => {

        event.preventDefault();

        if (!disabled) {
          setDragging(true);
        }

      }}


      // ------------------------------------------------------
      // Drag Leave
      // ------------------------------------------------------

      onDragLeave={() => {
        setDragging(false);
      }}


      // ------------------------------------------------------
      // Drop
      // ------------------------------------------------------

      onDrop={(event) => {

        event.preventDefault();

        setDragging(false);

        if (disabled) {
          return;
        }

        handleFiles(event.dataTransfer.files);
      }}


      // ------------------------------------------------------
      // Click
      // ------------------------------------------------------

      onClick={() => {

        if (!disabled) {
          inputRef.current?.click();
        }

      }}


      className={`
        cursor-pointer rounded-xl border-2 border-dashed
        p-10 text-center transition

        ${
          dragging
            ? "border-neutral-400 bg-neutral-900"
            : "border-neutral-800 bg-[#111111] hover:border-neutral-700 hover:bg-[#151515]"
        }

        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : ""
        }
      `}
    >

      {/* ======================================================
          FILE INPUT
          ====================================================== */}

      <input
        ref={inputRef}
        type="file"

        multiple

        accept=".pdf,.csv,application/pdf,text/csv"

        className="hidden"

        disabled={disabled}

        onChange={(event) => {

          if (event.target.files) {
            handleFiles(event.target.files);
          }

          // Allow selecting the same files again.
          event.target.value = "";
        }}
      />


      {/* ======================================================
          ICON
          ====================================================== */}

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">

        <Upload
          size={21}
          className="text-neutral-300"
        />

      </div>


      {/* ======================================================
          TITLE
          ====================================================== */}

      <h2 className="mt-4 text-base font-medium text-white">

        Upload documents

      </h2>


      {/* ======================================================
          DESCRIPTION
          ====================================================== */}

      <p className="mt-2 text-sm text-neutral-500">

        Drag & drop multiple files here or click to browse

      </p>


      {/* ======================================================
          FILE TYPES
          ====================================================== */}

      <div className="mt-5 flex justify-center gap-3">

        <span className="flex items-center gap-1.5 text-xs text-neutral-500">

          <FileText size={14} />

          PDF

        </span>


        <span className="flex items-center gap-1.5 text-xs text-neutral-500">

          <Database size={14} />

          CSV

        </span>

      </div>

    </div>
  );
}

