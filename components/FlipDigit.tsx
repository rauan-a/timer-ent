"use client";

import { AnimatePresence, motion } from "framer-motion";

interface FlipDigitProps {
  digit: number;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses: Record<NonNullable<FlipDigitProps["size"]>, string> = {
  sm: "text-[clamp(1.5rem,4vw,2.5rem)] h-[1.2em] min-w-[0.7em] rounded-lg",
  md: "text-[clamp(2rem,6vw,3.5rem)] h-[1.2em] min-w-[0.7em] rounded-xl",
  lg: "text-[clamp(3rem,9vw,6rem)] h-[1.2em] min-w-[0.7em] rounded-2xl",
  xl: "text-[clamp(4rem,16vw,11rem)] h-[1.2em] min-w-[0.65em] rounded-3xl",
};

/**
 * Одна ячейка-цифра с плавной анимацией смены значения (стиль одометра):
 * предыдущая цифра уезжает вверх и растворяется, новая въезжает снизу.
 */
export function FlipDigit({ digit, size = "lg" }: FlipDigitProps) {
  return (
    <div
      className={`relative overflow-hidden bg-surface font-mono font-semibold text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] flex items-center justify-center ${sizeClasses[size]}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="digit-glow absolute inset-0 flex items-center justify-center text-accent"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
