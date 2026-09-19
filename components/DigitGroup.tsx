import { FlipDigit } from "./FlipDigit";

interface DigitGroupProps {
  value: number;
  length: number;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/** Группа цифр (например часы: "0" "7") + подпись под ними ("часы"). */
export function DigitGroup({ value, length, label, size = "lg" }: DigitGroupProps) {
  const digits = value.toString().padStart(length, "0").split("").map(Number);

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="flex gap-1 sm:gap-1.5">
        {digits.map((d, i) => (
          <FlipDigit key={i} digit={d} size={size} />
        ))}
      </div>
      <span className="text-[clamp(0.65rem,1.4vw,0.95rem)] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
    </div>
  );
}
