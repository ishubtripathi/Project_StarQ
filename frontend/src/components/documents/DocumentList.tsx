import DocumentCard from "./DocumentCard";

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  pages?: number | null;
  date?: string;
}

interface DocumentListProps {
  documents: Document[];
  onSelect?: (document: Document) => void;
}

export default function DocumentList({
  documents,
  onSelect,
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-10 text-center">
        <p className="text-sm text-neutral-500">
          No documents found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-[#111111]">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          name={document.name}
          type={document.type}
          status={document.status}
          pages={document.pages}
          date={document.date}
          onClick={() => onSelect?.(document)}
        />
      ))}
    </div>
  );
}