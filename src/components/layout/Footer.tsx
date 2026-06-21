"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0') + ":" +
        now.getSeconds().toString().padStart(2, '0')
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  return (
    <footer className="w-full py-4 bg-[#F4F4F5] dark:bg-[#070C19] border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
      <div className="mx-auto max-w-5xl px-8 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
        
        <p>© {currentYear} DGP. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for work</span>
          </div>
          <span className="pl-4 border-l border-slate-300 dark:border-slate-700 tabular-nums">
            {time}
          </span>
        </div>
        
      </div>
    </footer>
  );
}