"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Download, ArrowRight, GraduationCap, Layout, LineChart, Code2 } from "lucide-react";

// button animation variants
const buttonVariants: Variants = {
  hover: {
    scale: 1.03,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 12 },
  },
  tap: {
    scale: 0.95,
    y: 1,
    transition: { type: "spring", stiffness: 500, damping: 10 },
  },
};

// container stagger variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// item stagger variants
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
};

type AboutProps = {
  projects?: any[];
};

export default function About({ projects = [] }: AboutProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
  };

  const specializations = [
    {
      icon: <Code2 size={18} />,
      title: "Web Development",
    },
    {
      icon: <LineChart size={18} />,
      title: "Data Analytics",
    },
    {
      icon: <Layout size={18} />,
      title: "UI/UX Design",
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full pt-10 pb-8 md:pt-14 md:pb-10 scroll-mt-24 bg-slate-100/90 dark:bg-slate-950 transition-colors duration-500 overflow-hidden font-sans selection:bg-slate-200"
    >
      {/* background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M28 0v28H0' fill='none' stroke='%2394a3b8' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        
        {/* main layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-5 items-stretch">
          
          {/* left column */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              
              {/* section header */}
              <div className="space-y-1.5 w-full">
                <motion.h2 
                  {...fadeInUp}
                  className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-[-0.03em]"
                >
                  About Me
                </motion.h2>
                
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="h-1 bg-slate-950 dark:bg-white rounded-full" 
                />
              </div>

              {/* profile image */}
              <motion.div 
                {...fadeInUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mt-4 relative w-full aspect-[4/3.5] rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800/50 shadow-sm hover:shadow-md group transition-shadow duration-300"
              >
                <Image 
                  src="/dyah.jpg" 
                  alt="Dyah Ghaniya Putri"
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>

            {/* education card */}
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center gap-3 p-3.5 w-full rounded-2xl border-2 border-slate-400 dark:border-slate-600 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-colors duration-300">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap size={18} />
                </motion.div>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-black tracking-wider text-slate-900 dark:text-slate-200">
                  Informatics
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Jenderal Soedirman University
                </p>
              </div>
            </motion.div>
          </div>

          {/* right column */}
          <div className="md:col-span-7 flex flex-col justify-between gap-4">
            
            {/* specialization cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {specializations.map((spec, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    borderColor: "rgba(148, 163, 184, 0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="p-4 sm:p-4.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-default min-h-[60px]"
                >
                  <motion.span 
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="p-2 rounded-xl bg-slate-950 dark:bg-slate-800 text-white shadow-xs shrink-0 group-hover:bg-slate-800 dark:group-hover:bg-slate-700 transition-colors"
                  >
                    {spec.icon}
                  </motion.span>
                  <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white leading-snug">
                    {spec.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* biography box */}
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 ring-1 ring-slate-900/10 dark:ring-white/10 rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 flex flex-col justify-center"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Dyah Ghaniya Putri
              </h3>

              <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <p>
                  I believe data only reaches its full potential when it powers interactive, practical systems. As a data-driven web developer, I bridge engineering, design, and analytics to build web applications that go beyond aesthetics and actively guide strategic decisions.
                </p>
                <p>
                  FFrom building intuitive interfaces and structuring database workflows to shipping data-backed dashboards, I ensure every digital product is rooted in solid logic and measurable results. By combining technical execution with user-centric design, I deliver reliable solutions that solve real business problems.
                </p>
              </div>
            </motion.div>

            {/* action buttons */}
            <motion.div 
              {...fadeInUp}
              className="flex flex-row items-center gap-3 pt-1 w-full"
            >
              {/* Tombol 1: View CV */}
              <motion.a 
                href="https://drive.google.com/file/d/1hC67zOxAIbAgidDYOYCfrSQCI9QP52ua/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
              >
                View CV <ArrowRight size={15} />
              </motion.a>
              
              {/* Tombol 2: View Projects */}
              <motion.a 
                href="#projects" 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
              >
                View Projects <ArrowRight size={15} />
              </motion.a>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}