"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineUser, HiArrowRight } from "react-icons/hi";

const luxuryClick = {
  whileHover: { y: -4, scale: 1.01, boxShadow: "0px 12px 30px rgba(30, 41, 59, 0.12)" },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: 0 },
  visible: (i: number) => ({ 
    opacity: [0, 1, 0], 
    scale: [0, 1, 0],
    rotate: 180,
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: i * 0.4,
      ease: "easeInOut"
    }
  })
};

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Full Stack Developer with a Product Mindset";
  const pivotIndex = 21;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 8, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-20, 20]), springConfig);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isDeleting && typedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 3000); 
    } else if (isDeleting && typedText === "") {
      timer = setTimeout(() => setIsDeleting(false), 600); 
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? fullText.substring(0, typedText.length - 1)
            : fullText.substring(0, typedText.length + 1)
        );
      }, isDeleting ? 25 : 50); 
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting]);

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center py-16 px-6 md:px-12 overflow-hidden bg-[#F4F4F5] dark:bg-[#070C19] transition-colors duration-500 font-sans">
      
      <motion.div 
        animate={{
          backgroundPosition: ["0px 0px", "-40px 40px"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_60%,transparent_100%)]" 
      />

      <div className="relative mx-auto max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center z-10">        
        <motion.div 
          className="md:col-span-7 space-y-8 -mt-6 md:-mt-14 z-10 md:pl-8" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 rounded-full bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md px-4 py-2 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Works & Full Stack Roles
          </motion.div>

          <div className="space-y-3">
            <motion.p variants={itemVariants} className="font-sans font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 tracking-tight block mb-2">
              Hey, there! I am
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Dyah</span> Ghaniya Putri
            </motion.h1>
            <motion.div variants={itemVariants} className="pt-8 flex items-center h-8 text-lg sm:text-xl font-bold tracking-tight">
              <div className="text-slate-800 dark:text-slate-200">
                {typedText.substring(0, pivotIndex)}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {typedText.substring(pivotIndex)}
                </span>
                <span className="animate-pulse ml-0.5 text-blue-500 dark:text-blue-400 font-light">|</span>
              </div>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
            Building digital solutions that solve real problems through web development, system design, and continuous learning.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <motion.a href="#about" {...luxuryClick} className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-6 py-3.5 text-sm font-bold text-white dark:text-slate-900 cursor-pointer w-full sm:w-auto shadow-md">
                About Me <HiOutlineUser size={18} />
              </motion.a>
              <motion.a href="#contact" {...luxuryClick} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer w-full sm:w-auto backdrop-blur-sm">
                Contact Me <HiArrowRight size={18} />
              </motion.a>
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-300 dark:bg-slate-800" />
            <div className="flex gap-3">
              {[
                { Icon: FaGithub, href: "https://github.com/odynamic" },
                { Icon: FaLinkedin, href: "https://linkedin.com/in/dyahgputri" },
                { Icon: FaInstagram, href: "https://instagram.com/dyahgputri" }
              ].map((item, idx) => (
                <motion.a key={idx} href={item.href} target="_blank" rel="noreferrer" whileHover={{ y: -4, scale: 1.05, borderColor: "rgb(37 99 235)", color: "rgb(37 99 235)" }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 shadow-sm transition-colors">
                  <item.Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="md:col-span-5 relative flex justify-center items-center"> 
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="relative">
            <motion.div animate={{ scale: [1, 1.06, 0.97, 1.06, 1], opacity: [0.4, 0.8, 0.5, 0.9, 0.4], rotate: [0, 90, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute -inset-8 bg-gradient-to-tr from-blue-500/25 via-indigo-400/20 to-purple-500/25 blur-2xl rounded-[3rem] pointer-events-none z-0" />

            <motion.div 
              onMouseMove={(e) => { 
                const rect = e.currentTarget.getBoundingClientRect(); 
                mouseX.set(e.clientX - (rect.left + rect.width / 2)); 
                mouseY.set(e.clientY - (rect.top + rect.height / 2)); 
              }} 
              onMouseLeave={() => { 
                mouseX.set(0); 
                mouseY.set(0); 
              }} 
              style={{ rotateX, rotateY, perspective: 800 }} 
              className="relative w-64 h-[380px] md:w-72 md:h-[440px] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900 z-10 cursor-pointer border border-slate-200/50 dark:border-slate-800/50"
            >
              <img src="/dyah.jpg" alt="Dyah G. Putri" className="w-full h-full object-cover" width={288} height={440} />
            </motion.div>

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={starVariants}
                initial="hidden"
                animate="visible"
                className="absolute w-6 h-6 bg-blue-500 z-0"
                style={{
                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  top: `${5 + (i * 18)}%`,
                  left: i % 2 === 0 ? "-20%" : "105%"
                }}
              />
            ))}

            <motion.div animate={{ y: [0, -10, 2, -10, 0], x: [0, 4, -3, 4, 0], rotate: [0, 0.8, -0.8, 0.8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800/60 z-20">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Learn • Build • Repeat
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}