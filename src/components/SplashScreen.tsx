"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));
  const width = useTransform(count, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.2,
      ease: "easeInOut",
      onComplete,
    });

    return () => controls.stop();
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors duration-500 font-sans"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {/* BACKGROUND GRID */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M28 0v28H0' fill='none' stroke='%2394a3b8' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <h1 className="text-6xl font-black tracking-[-0.03em] text-slate-950 dark:text-white tabular-nums">
          <motion.span>{rounded}</motion.span>%
        </h1>

        <div className="w-56 h-2 rounded-full overflow-hidden border-[1.5px] border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
          <motion.div
            className="h-full bg-slate-950 dark:bg-white rounded-full"
            style={{ width }}
          />
        </div>

        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-950 dark:text-white">
            Dyah Ghaniya Putri
          </p>

          <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Initializing Portfolio...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}