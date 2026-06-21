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
      className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full px-8 flex items-center justify-between">
        <button 
          onClick={() => { setActiveSection("hero"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
          className="text-2xl font-black tracking-[0.2em] bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          DGP
        </button>
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a 
                key={item} 
                href={`#${id}`} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
                  setActiveSection(id);
                }} 
                className="relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em]"
              >
                {isActive && <motion.div layoutId="activeTab" className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 rounded-full" />}
                <span className={`relative z-10 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>
                  {item}
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden absolute top-16 right-4 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xl flex flex-col z-[60]"
          >
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a 
                  key={item} 
                  href={`#${id}`} 
                  onClick={() => { setIsOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActiveSection(id); }} 
                  className={`px-4 py-3 text-sm font-bold flex items-center justify-between rounded-xl transition-all ${
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div 
                      layoutId="mobileBadge"
                      className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
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