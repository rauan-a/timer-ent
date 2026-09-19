import { motion } from "framer-motion";

export function FinalScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <div className="digit-glow font-mono text-[clamp(2.5rem,10vw,6rem)] font-bold text-accent">
        ЕНТ пройдено
      </div>
      <p className="max-w-md text-[clamp(0.9rem,2vw,1.1rem)] text-muted">
        Отсчёт завершён — время экзамена наступило. Удачи, всё получится!
      </p>
    </motion.div>
  );
}
