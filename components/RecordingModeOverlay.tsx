"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TimeLeft } from "@/lib/countdown";
import { CountdownDisplay, ViewMode } from "./CountdownDisplay";
import { ProgressBar } from "./ProgressBar";
import { FinalScreen } from "./FinalScreen";

export type Orientation = "horizontal" | "vertical";

interface RecordingModeOverlayProps {
  timeLeft: TimeLeft;
  viewMode: ViewMode;
  progressPercent: number;
  onExit: () => void;
}

/**
 * Полноэкранный "режим для записи": прячет всю лишнюю UI и оставляет
 * только таймер (и опционально прогресс-бар), с переключателем
 * ориентации 16:9 / 9:16 под экран записи или шортс.
 */
export function RecordingModeOverlay({
  timeLeft,
  viewMode,
  progressPercent,
  onExit,
}: RecordingModeOverlayProps) {
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [showProgress, setShowProgress] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Выход по Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onExit]);

  // Скрываем панель управления через несколько секунд бездействия,
  // чтобы картинка на экране оставалась чистой
  useEffect(() => {
    const timeout = setTimeout(() => setControlsVisible(false), 4000);
    return () => clearTimeout(timeout);
  }, [controlsVisible]);

  return (
    <div
      className="recording-mode fixed inset-0 z-50 flex items-center justify-center bg-bg"
      onMouseMove={() => setControlsVisible(true)}
    >
      {showProgress && <ProgressBar percent={progressPercent} compact position="top" />}

      <div
        className={`flex w-full items-center justify-center px-6 ${
          orientation === "vertical" ? "aspect-[9/16] max-h-[100dvh] flex-col" : "aspect-[16/9] max-w-[100dvw]"
        } mx-auto`}
      >
        {timeLeft.isFinished ? (
          <FinalScreen />
        ) : (
          <CountdownDisplay timeLeft={timeLeft} viewMode={viewMode} large />
        )}
      </div>

      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-3 py-2 backdrop-blur cursor-auto"
            style={{ cursor: "auto" }}
          >
            <OrientationButton
              active={orientation === "horizontal"}
              onClick={() => setOrientation("horizontal")}
              label="16:9"
            />
            <OrientationButton
              active={orientation === "vertical"}
              onClick={() => setOrientation("vertical")}
              label="9:16"
            />
            <span className="mx-1 h-4 w-px bg-white/10" />
            <button
              onClick={() => setShowProgress((v) => !v)}
              className="rounded-full px-3 py-1 text-xs font-medium text-muted transition hover:text-ink"
              style={{ cursor: "pointer" }}
            >
              {showProgress ? "Скрыть %" : "Показать %"}
            </button>
            <span className="mx-1 h-4 w-px bg-white/10" />
            <button
              onClick={onExit}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent/20"
              style={{ cursor: "pointer" }}
            >
              Esc · выйти
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrientationButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        active ? "bg-accent text-bg" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
