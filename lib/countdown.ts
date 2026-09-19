// Логика расчёта обратного отсчёта и прогресса подготовки.
// Вынесена отдельно от компонентов, чтобы её было легко тестировать
// и переиспользовать.

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isFinished: boolean;
}

/**
 * Считает, сколько дней/часов/минут/секунд осталось до целевой даты.
 * Если время уже прошло — возвращает нули и флаг isFinished.
 */
export function getTimeLeft(target: Date): TimeLeft {
  const now = Date.now();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isFinished: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, totalMs: diff, isFinished: false };
}

/**
 * Процент пройденного пути от START_DATE до TARGET_DATE.
 * Формула: (текущая_дата − START_DATE) / (TARGET_DATE − START_DATE) × 100,
 * округлённая до одного знака после запятой и зажатая в диапазон [0, 100].
 */
export function getProgressPercent(start: Date, target: Date): number {
  const now = Date.now();
  const total = target.getTime() - start.getTime();
  const elapsed = now - start.getTime();

  if (total <= 0) return 100;

  const raw = (elapsed / total) * 100;
  const clamped = Math.min(100, Math.max(0, raw));
  return Math.round(clamped * 10) / 10;
}

/** Разбивает число дней/часов/минут/секунд на массив цифр (для флип-анимации). */
export function toDigits(value: number, length: number): number[] {
  const str = value.toString().padStart(length, "0");
  return str.split("").map(Number);
}
