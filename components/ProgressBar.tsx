interface ProgressBarProps {
  percent: number;
  /** Если true — рендерится компактно, для использования в режиме записи */
  compact?: boolean;
  position?: "top" | "bottom";
}

export function ProgressBar({ percent, compact = false, position = "top" }: ProgressBarProps) {
  return (
    <div
      className={`pointer-events-none fixed left-0 right-0 z-40 ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
    >
      <div className="h-1.5 w-full bg-white/5">
        <div
          className="h-full bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {!compact && (
        <div
          className={`flex px-4 py-1.5 ${
            position === "top" ? "justify-end" : "justify-end"
          }`}
        >
          <span className="rounded-full bg-surface/80 px-3 py-1 text-xs font-medium tracking-wide text-muted backdrop-blur">
            {percent.toFixed(1)}% пути пройдено
          </span>
        </div>
      )}
    </div>
  );
}
