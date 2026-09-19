"use client";

import { useEffect, useState } from "react";
import { TARGET_DATE, START_DATE } from "./config";
import { getTimeLeft, getProgressPercent, TimeLeft } from "./countdown";

interface CountdownState {
  timeLeft: TimeLeft;
  progressPercent: number;
}

/**
 * Хук держит состояние обратного отсчёта и процента прогресса,
 * обновляя их раз в секунду. На сервере (при первом рендере) отдаёт
 * null, чтобы избежать расхождения SSR/CSR — реальные значения
 * появляются сразу после монтирования на клиенте.
 */
export function useCountdown(): CountdownState | null {
  const [state, setState] = useState<CountdownState | null>(null);

  useEffect(() => {
    const tick = () => {
      setState({
        timeLeft: getTimeLeft(TARGET_DATE),
        progressPercent: getProgressPercent(START_DATE, TARGET_DATE),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
