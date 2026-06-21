"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.2, 
      ease: "easeInOut",
      onComplete: onComplete,
    });
    return () => controls.stop();
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-[#030712] overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <motion.div 
        animate={{ backgroundPosition: ["40px 0px", "0px 0px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25] bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:40px_40px]" 
      />

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-blue-500/30 dark:bg-blue-600/20 blur-[150px] rounded-full" 
      />

      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-48 h-48 bg-blue-500/40 dark:bg-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
      />

      <motion.div
        animate={{ rotate: -360, scale: [1, 1.3, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-blue-500/30 dark:bg-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div className="text-8xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter drop-shadow-md">
          <motion.span>{rounded}</motion.span>%
        </motion.div>

        <div className="w-64 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.9)]"
            style={{ width: useTransform(count, [0, 100], ["0%", "100%"]) }}
          />
        </div>

        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white">
            Dyah Ghaniya Putri
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mt-1">
            Initializing Portfolio...
          </p>
        </div>
      </div>
    </motion.div>
  );
}