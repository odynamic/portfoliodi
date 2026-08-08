"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (v) => Math.round(v));
  const width = useTransform(count, [0, 100], ["0%", "100%"]);

  const scale = useMotionValue(1);
  const finished = useMotionValue(false);

  // count up animation
  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.35,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setTimeout(onComplete, 250);
      },
    });

    return () => controls.stop();
  }, [count, onComplete]);

  useMotionValueEvent(rounded, "change", (latest) => {
    if (latest >= 100 && !finished.get()) {
      finished.set(true);

      animate(scale, [1, 1.08, 1.03], {
        duration: 0.35,
        ease: "easeOut",
      });
    }
  });

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-950 font-sans"
      exit={{
        opacity: 0,
        scale: 0.98,
        transition: {
          duration: 0.45,
          ease: "easeOut",
        },
      }}
    >
      {/* background grid */}
      <div
        className="absolute inset-0 opacity-50 dark:opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M28 0v28H0' fill='none' stroke='%2394a3b8' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* glow */}
      <motion.div
        style={{ scale }}
        animate={{
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-80 h-80 rounded-full bg-slate-400/10 blur-3xl dark:bg-white/5"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* percentage */}
        <motion.h1
          style={{ scale }}
          className="text-7xl md:text-8xl font-black tracking-[-0.06em] text-slate-950 dark:text-white tabular-nums"
        >
          <motion.span>{rounded}</motion.span>%
        </motion.h1>

        {/* progress bar */}
        <motion.div
          style={{ scale }}
          className="relative mt-8 h-2 w-64 overflow-hidden rounded-full border border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-slate-950 dark:bg-white"
            style={{ width }}
          />

          {/* shimmer */}
          <motion.div
            className="absolute top-0 h-full w-12 bg-white/40 dark:bg-white/20 blur-md"
            animate={{ x: [-60, 320] }}
            transition={{
              repeat: Infinity,
              duration: 1.1,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* identity */}
        <div className="mt-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-extrabold uppercase tracking-[0.35em] text-slate-950 dark:text-white"
          >
            DYAH GHANIYA PUTRI
          </motion.p>

          <motion.p
            animate={{
              opacity: [0.45, 1, 0.45],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400"
          >
            Initializing Portfolio...
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}