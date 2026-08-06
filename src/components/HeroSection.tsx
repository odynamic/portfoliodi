"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaCode, FaDatabase, FaServer, FaLaptopCode, FaTerminal, FaCut } from "react-icons/fa";
import { HiOutlineUser, HiArrowRight } from "react-icons/hi";

// Animasi Card Entrance & Hover
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  hover: {
    y: -4,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  }
};

// Animasi Button Taktil
const buttonVariants: Variants = {
  hover: {
    scale: 1.04,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  },
  tap: {
    scale: 0.93,
    y: 1,
    transition: { type: "spring", stiffness: 500, damping: 10 },
  },
};

// Data Icon Mengambang di Sekitar Container (FaCpu diganti menjadi FaCut)
const floatingIcons = [
  { Icon: FaCode, position: "-top-5 left-2 sm:-left-12 sm:top-10" },
  { Icon: FaDatabase, position: "-top-5 right-2 sm:-right-12 sm:top-14" },
  { Icon: FaServer, position: "bottom-24 left-2 sm:-left-14 sm:bottom-20" },
  { Icon: FaLaptopCode, position: "bottom-12 right-2 sm:-right-14 sm:bottom-16" },
  { Icon: FaTerminal, position: "top-1/2 -left-4 sm:-left-20 -translate-y-1/2 hidden sm:flex" },
  { Icon: FaCut, position: "top-1/2 -right-4 sm:-right-16 -translate-y-1/2 hidden sm:flex" },
];

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-12 overflow-hidden bg-slate-100/90 dark:bg-slate-950 font-sans selection:bg-slate-200">
      
      {/* 1. BACKGROUND GRID */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M28 0v28H0' fill='none' stroke='%2394a3b8' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* 2. CARD CONTAINER WIDE */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="relative mx-3 sm:mx-auto max-w-3xl w-full z-10"
      >
        
        {/* ELEMEN ICON DI SEKITAR CONTAINER */}
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -10, 0],
              rotate: [0, idx % 2 === 0 ? 5 : -5, 0]
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.2 + idx * 0.1 },
              scale: { duration: 0.5, delay: 0.2 + idx * 0.1 },
              y: { duration: 2.5 + (idx * 0.4), repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 3 + (idx * 0.5), repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.25, 
              rotate: 10,
              transition: { type: "spring", stiffness: 400, damping: 10 } 
            }}
            whileTap={{ scale: 0.9 }}
            className={`absolute ${item.position} z-25 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-slate-300 dark:border-slate-700 rounded-2xl shadow-md cursor-pointer text-slate-950 dark:text-white`}
          >
            <item.Icon size={16} className="sm:text-lg" />
          </motion.div>
        ))}

        {/* KOTAK CONTAINER */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 ring-1 ring-slate-900/10 dark:ring-white/10 rounded-3xl p-6 sm:p-12 shadow-lg flex flex-col items-center text-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3.5 py-1 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-slate-800 dark:text-slate-200 mb-6 sm:mb-8">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            AVAILABLE FOR WORK
          </div>

          {/* Typography Nama */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.1]">
            Dyah Ghaniya Putri
          </h1>

          {/* Title: Software Developer */}
          <p className="mt-6 sm:mt-8 text-[11px] sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-700 dark:text-slate-300 mb-3 sm:mb-4">
            Software Developer
          </p>
          
          {/* Copywriting */}
          <p className="text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-6 sm:mb-8">
            Building business applications that simplify operations and empower decisions.
          </p>

          {/* Garis Pemisah Samar Pertama */}
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800 mb-6 sm:mb-8" />

          {/* Tombol-Tombol, Garis Pemisah, & Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center">
              {/* Primary Button */}
              <motion.a 
                href="#about" 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
              >
                About Me <HiOutlineUser size={15} />
              </motion.a>
              
              {/* Secondary Button */}
              <motion.a 
                href="#contact" 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
              >
                Contact <HiArrowRight size={15} />
              </motion.a>
            </div>

            {/* Garis Pemisah */}
            <div className="hidden sm:block w-[1px] h-8 bg-slate-300 dark:bg-slate-700 mx-2" />
            <div className="block sm:hidden w-16 h-[1px] bg-slate-200 dark:bg-slate-800 my-1" />

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-1 sm:mt-0">
              {[
                { Icon: FaGithub, href: "https://github.com/odynamic" },
                { Icon: FaLinkedin, href: "https://linkedin.com/in/dyahgputri" },
                { Icon: FaInstagram, href: "https://instagram.com/dyahgputri" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white shadow-sm transition-colors"
                >
                  <item.Icon size={15} />
                </motion.a>
              ))}
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}