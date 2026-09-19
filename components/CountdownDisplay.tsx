import { TimeLeft } from "@/lib/countdown";
import { DigitGroup } from "./DigitGroup";
import { FlipDigit } from "./FlipDigit";

export type ViewMode = "days" | "full";

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
  viewMode: ViewMode;
  /** Крупный режим — используется в режиме записи для максимально читаемых цифр в кадре */
  large?: boolean;
}

export function CountdownDisplay({ timeLeft, viewMode, large = false }: CountdownDisplayProps) {
  if (viewMode === "days") {
    const digits = timeLeft.days.toString().split("").map(Number);
    return (
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="flex gap-1.5 sm:gap-2.5">
          {digits.map((d, i) => (
            <FlipDigit key={i} digit={d} size={large ? "xl" : "xl"} />
          ))}
        </div>
        <span className="text-[clamp(0.75rem,2vw,1.1rem)] uppercase tracking-[0.3em] text-muted">
          {pluralizeDays(timeLeft.days)} до ЕНТ-2027
        </span>
      </div>
    );
  }

  const size = large ? "lg" : "md";

  return (
    <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 md:gap-8">
      <DigitGroup value={timeLeft.days} length={Math.max(2, timeLeft.days.toString().length)} label="дни" size={size} />
      <Separator large={large} />
      <DigitGroup value={timeLeft.hours} length={2} label="часы" size={size} />
      <Separator large={large} />
      <DigitGroup value={timeLeft.minutes} length={2} label="минуты" size={size} />
      <Separator large={large} />
      <DigitGroup value={timeLeft.seconds} length={2} label="секунды" size={size} />
    </div>
  );
}

function Separator({ large }: { large?: boolean }) {
  return (
    <span
      className={`select-none pb-[1.6em] font-mono text-accent/50 ${
        large ? "text-[clamp(3rem,9vw,6rem)]" : "text-[clamp(2rem,6vw,3.5rem)]"
      }`}
    >
      :
    </span>
  );
}

function pluralizeDays(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "день";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "дня";
  return "дней";
}
