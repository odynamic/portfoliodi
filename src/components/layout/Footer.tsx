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
    <footer className="w-full py-5 bg-[#F4F4F5] dark:bg-slate-950 border-t-[1.5px] border-slate-300 dark:border-slate-800 transition-colors duration-500">

      <div className="w-full px-6 sm:px-10 lg:px-16 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
        
        <p>© {currentYear} DGP. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-950 dark:text-white">Available for work</span>
          </div>
          <span className="pl-4 border-l-[1.5px] border-slate-300 dark:border-slate-700 tabular-nums text-slate-950 dark:text-white">
            {time}
          </span>
        </div>
        
      </div>
    </footer>
  );
}