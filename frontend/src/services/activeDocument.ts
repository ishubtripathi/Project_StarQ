import type { ActiveDocument } from "../types/document";

const STORAGE_KEY = "starq_active_document";

export function setActiveDocument(
  document: ActiveDocument
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(document)
  );
}

export function getActiveDocument():
  | ActiveDocument
  | null {
  const storedDocument =
    localStorage.getItem(STORAGE_KEY);

  if (!storedDocument) {
    return null;
  }

  try {
    return JSON.parse(
      storedDocument
    ) as ActiveDocument;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearActiveDocument(): void {
  localStorage.removeItem(STORAGE_KEY);
}