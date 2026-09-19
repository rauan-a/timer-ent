import { ViewMode } from "./CountdownDisplay";

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="flex gap-1 rounded-full border border-white/10 bg-surface p-1">
      <TabButton active={viewMode === "days"} onClick={() => onChange("days")}>
        Дни
      </TabButton>
      <TabButton active={viewMode === "full"} onClick={() => onChange("full")}>
        ДД:ЧЧ:ММ:СС
      </TabButton>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-accent text-bg"
          : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
