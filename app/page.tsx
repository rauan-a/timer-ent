"use client";

import { useState } from "react";
import { useCountdown } from "@/lib/useCountdown";
import { CountdownDisplay, ViewMode } from "@/components/CountdownDisplay";
import { ViewToggle } from "@/components/ViewToggle";
import { ProgressBar } from "@/components/ProgressBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Watermark } from "@/components/Watermark";
import { FinalScreen } from "@/components/FinalScreen";
import { RecordingModeOverlay } from "@/components/RecordingModeOverlay";

export default function Home() {
  const state = useCountdown();
  const [viewMode, setViewMode] = useState<ViewMode>("days");
  const [recordingMode, setRecordingMode] = useState(false);

  // До монтирования на клиенте ничего не считаем, чтобы избежать
  // расхождения между сервером и клиентом
  if (!state) {
    return <div className="min-h-dvh bg-bg" />;
  }

  const { timeLeft, progressPercent } = state;

  if (recordingMode) {
    return (
      <RecordingModeOverlay
        timeLeft={timeLeft}
        viewMode={viewMode}
        progressPercent={progressPercent}
        onExit={() => setRecordingMode(false)}
      />
    );
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-4 py-16">
      <ProgressBar percent={progressPercent} />

      <header className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-[clamp(1rem,2.5vw,1.4rem)] font-medium tracking-tight text-muted">
          Обратный отсчёт до
        </h1>
        <p className="text-[clamp(1.3rem,3.5vw,2rem)] font-semibold text-ink">
          ЕНТ&nbsp;2027
        </p>
      </header>

      {timeLeft.isFinished ? (
        <FinalScreen />
      ) : (
        <CountdownDisplay timeLeft={timeLeft} viewMode={viewMode} />
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        <ThemeToggle />
        <button
          onClick={() => setRecordingMode(true)}
          className="rounded-full border border-white/10 bg-surface px-4 py-1.5 text-sm font-medium text-muted transition hover:border-accent/60 hover:text-accent"
        >
          Режим записи
        </button>
      </div>

      <Watermark />
    </main>
  );
}
