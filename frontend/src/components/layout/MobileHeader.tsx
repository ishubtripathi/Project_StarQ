import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({
  onMenuClick,
}: MobileHeaderProps) {
  return (
    <header className="flex h-14 items-center border-b border-neutral-800 bg-[#0b0b0b] px-4 md:hidden">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>

      <span className="ml-3 font-semibold text-white">
        StarQ
      </span>
    </header>
  );
}