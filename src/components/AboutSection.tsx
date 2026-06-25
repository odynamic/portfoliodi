"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, Briefcase, Globe, Download, ArrowRight, GraduationCap } from "lucide-react";

const buttonVariants: Variants = {
  hover: { 
    scale: 1.05, 
    y: -2,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
};

type AboutProps = {
  projects?: any[];
};

export default function About({ projects = [] }: AboutProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  };

  return (
    <section 
      id="about" 
      className="relative w-full py-16 md:py-20 scroll-mt-24 bg-[#F4F4F5] dark:bg-[#070C19] transition-colors duration-500 border-t border-gray-200/30 dark:border-gray-900/40 overflow-hidden"
    >
      <motion.div 
        animate={{
          backgroundPosition: ["0px 0px", "-40px 40px"]
        }}
        transition={{
          duration: 3, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]" 
      />

      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/[0.07] dark:bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 9, delay: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/[0.07] dark:bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="mx-auto max-w-5xl px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 -mt-12">
          {[
            { 
              icon: <Calendar />, 
              label: "3 Years+", 
              sub: "Coding Experience", 
              color: "from-blue-500 to-indigo-500" 
            },
            { 
              icon: <Briefcase />, 
              label: `${projects?.length || 0} Projects`, 
              sub: "Successfully Completed", 
              color: "from-cyan-500 to-blue-500" 
            },
            { 
              icon: <Globe />, 
              label: "Open to Work", 
              sub: "Available for Hire", 
              color: "from-emerald-500 to-teal-500", 
              isGreen: true 
            },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp} 
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/30 bg-white/95 dark:bg-slate-950/40 backdrop-blur-sm flex items-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className={`p-2.5 rounded-xl text-white bg-gradient-to-br ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <h4 className={`text-base font-black ${stat.isGreen ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>
                  {stat.label}
                </h4>
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 items-start mt-0">
          <div className="md:col-span-4 flex flex-col items-start gap-7">
            <div className="space-y-3 w-full">
              <p className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 rounded-md inline-block backdrop-blur-md">
                Background
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">About Me</h2>
              
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_2px_8px_rgba(37,99,235,0.3)]" 
              />
            </div>

            <motion.div 
              {...fadeInUp}
              className="flex items-start gap-3.5 text-gray-400 dark:text-gray-500 group select-none"
            >
              <div className="mt-0.5 text-blue-600 dark:text-blue-400/80 group-hover:text-cyan-500 transition-colors duration-300">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap size={19} />
                </motion.div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black tracking-[0.18em] uppercase text-gray-900 dark:text-gray-300">
                  Informatics
                </p>
                <p className="text-[13px] font-semibold tracking-wide text-gray-600 dark:text-gray-400 leading-relaxed">
                  Jenderal Soedirman University
                </p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-8 space-y-5 text-[14px] md:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-black tracking-tight leading-snug text-gray-900 dark:text-white"
            >
              Translating operational needs into practical,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                functional web applications
              </span>.
            </motion.h3>
            
            <p>
              Hi, I'm Dyah. I focus on developing web applications through structural problem solving, starting from initial requirement analysis and database design to feature implementation. For me, coding is a practical process of turning manual workflows into systematic digital solutions that make tasks run more effectively.
            </p>
            <p>
              During my IT Operations internship, I applied this mindset by building an internal asset tracking application from scratch to solve actual inventory problems. Outside of development work, my experience managing communications in campus student committees helped me build reliable coordination habits and a clear approach to working within a team.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a 
                href="https://drive.google.com/file/d/1hC67zOxAIbAgidDYOYCfrSQCI9QP52ua/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center gap-2 bg-gray-950 dark:bg-white text-white dark:text-gray-950 px-6 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-wider shadow-sm"
              >
                Download CV <Download size={13} />
              </motion.a>
              
              <motion.a 
                href="#projects" 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"              >
                View Projects <ArrowRight size={13} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}