"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ["hero", "about", "projects", "experience", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navItems = ["About", "Projects", "Experience", "Contact"];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-14 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 flex items-center"
    >
      {/* Diubah agar melebar penuh dengan jarak pinggir (padding) konsisten */}
      <div className="w-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-black tracking-[0.18em] text-slate-950 dark:text-white hover:opacity-80 transition-opacity"
        >
          DGP
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={`relative py-4 text-[11px] font-black uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-slate-950 dark:text-white"
                    : "text-slate-400 hover:text-slate-950 dark:text-slate-500 dark:hover:text-white"
                }`}
              >
                {item}

                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-slate-950 dark:bg-white rounded-full"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Tombol Dark/Light Mode tanpa garis tepi */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            className="p-2 rounded-xl bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Tombol Menu Mobile tanpa garis tepi */}
          <button 
            className="md:hidden p-2 rounded-xl bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden absolute top-16 right-4 w-48 bg-white dark:bg-slate-900 border-[1.5px] border-slate-300 dark:border-slate-800 rounded-2xl p-2 shadow-xl flex flex-col z-[60]"
          >
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a 
                  key={item} 
                  href={`#${id}`} 
                  onClick={() => { setIsOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActiveSection(id); }} 
                  className={`px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-between rounded-xl transition-all ${
                    isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div 
                      layoutId="mobileBadge"
                      className="w-1.5 h-1.5 rounded-full bg-slate-950 dark:bg-white" 
                    />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}