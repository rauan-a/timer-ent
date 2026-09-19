import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Space Grotesk не поддерживает кириллицу, поэтому для UI-текста на русском
// используется Inter — он визуально близок и полностью поддерживает кириллицу
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЕНТ-2027 · Обратный отсчёт",
  description: "Countdown-таймер до ЕНТ-2027 для @norwiie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
