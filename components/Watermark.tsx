import { WATERMARK } from "@/lib/config";

export function Watermark() {
  return (
    <span className="pointer-events-none fixed bottom-3 right-4 z-30 select-none font-mono text-xs text-muted/60">
      {WATERMARK}
    </span>
  );
}
