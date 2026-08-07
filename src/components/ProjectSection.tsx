"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowUpRight, ExternalLink } from "lucide-react";
import { createClient } from "@/utils/supabase-client";

function usePortfolioData<T = any>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedData } = await supabase.from(tableName).select("*");
      setData(fetchedData || []);
      setLoading(false);
    }
    fetchData();
  }, [tableName, supabase]);

  return { data, loading };
}

const getRoleBadgeStyle = (role: string) => {
  const r = (role || "").toLowerCase();
  if (r.includes("full") || r.includes("stack")) {
    return {
      dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    };
  } else if (r.includes("front") || r.includes("ui") || r.includes("designer")) {
    return {
      dot: "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]",
      text: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30",
    };
  } else if (r.includes("back") || r.includes("engineer") || r.includes("devops")) {
    return {
      dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30",
    };
  }
  return {
    dot: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30",
  };
};

export default function ProjectSection() {
  const [activeTab, setActiveTab] = useState("projects");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const { data: projects, loading: loadProjects } = usePortfolioData("projects");
  const { data: techData, loading: loadTech } = usePortfolioData("technologies");

  const nextProject = () => {
    if (projects.length > 0) setCurrentIndex((p) => (p + 1) % projects.length);
  };

  const prevProject = () => {
    if (projects.length > 0) setCurrentIndex((p) => (p - 1 + projects.length) % projects.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -40) nextProject();
    else if (info.offset.x > 40) prevProject();
  };

  const groupedTech = useMemo(() => {
    if (!techData) return [];
    const groups: any = {};
    techData.forEach((item: any) => {
      const cat = item.category || "Other Tools";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    const order = ["Frontend Development", "Backend Development", "Tools & DevOps"];
    return Object.keys(groups)
      .sort((a, b) => order.indexOf(a) - order.indexOf(b))
      .map((cat) => ({ category: cat, tools: groups[cat] }));
  }, [techData]);

  if (loadProjects || loadTech) {
    return (
      <div className="py-12 text-center text-slate-500 font-mono tracking-widest text-xs animate-pulse bg-slate-100/90 dark:bg-slate-950">
        LOADING DATA...
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="relative w-full pt-3 pb-6 md:pt-4 md:pb-8 bg-slate-100/90 dark:bg-slate-950 transition-colors duration-500 overflow-hidden font-sans selection:bg-slate-200 scroll-mt-24"
    >
      {/* BACKGROUND GRID */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M28 0v28H0' fill='none' stroke='%2394a3b8' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Main Container dengan Motion Viewport Stagger yang Sangat Lembut */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10"
      >
        
        {/* HEADER SECTION & PISTON-STYLE TAB SWITCHER */}
        <div className="flex flex-col items-center mt-2 mb-2 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white mb-2"
          >
            My Projects
          </motion.h2>

          <div className="flex justify-center mb-2.5">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 36, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="h-1 bg-slate-950 dark:bg-white rounded-full"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="inline-flex items-center p-1 bg-slate-200/80 dark:bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-300 dark:border-slate-800 shadow-inner mt-5"
          >
            {[
              { id: "projects", label: "Projects" },
              { id: "technologies", label: "Technologies" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-1.5 text-xs font-black uppercase tracking-wider transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-white dark:text-slate-950"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="piston-tab-indicator"
                      className="absolute inset-0 bg-slate-950 dark:bg-white rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

{/* CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div 
              key="carousel-5" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center -mt-2 w-full"
            >
            {/* CAROUSEL CONTAINER */}
              <div className="flex items-center justify-center h-[380px] sm:h-[420px] w-full max-w-6xl relative overflow-visible px-16 sm:px-20 perspective-[1200px] py-0">                {projects.map((project, index) => {
                  // Menghitung jarak relatif kartu dari index aktif (currentIndex)
                  // Menggunakan modulo agar siklus melingkar (looping) berjalan lancar untuk 5 data atau lebih
                  const total = projects.length;
                  let diff = (index - currentIndex + total) % total;
                  if (diff > total / 2) diff -= total; // Menjadikan rentang dari -2, -1, 0, 1, 2

                  const isCenter = diff === 0;
                  const isNearLeft = diff === -1;
                  const isNearRight = diff === 1;
                  const isFarLeft = diff === -2;
                  const isFarRight = diff === 2;

                  // Hanya render 5 kartu yang berada di jangkauan terdekat
                  if (!isCenter && !isNearLeft && !isNearRight && !isFarLeft && !isFarRight) return null;

                  const badge = getRoleBadgeStyle(project.role);

                  // Menentukan nilai animasi berdasarkan posisi kartu
                  let scaleVal = 1;
                  let opacityVal = 1;
                  let xVal = "0%";
                  let rotateYVal = 0;
                  let zIndexVal = 30;

                  if (isCenter) {
                    scaleVal = 1;
                    opacityVal = 1;
                    xVal = "0%";
                    rotateYVal = 0;
                    zIndexVal = 30;
                  } else if (isNearLeft) {
                    scaleVal = 0.85;
                    opacityVal = 0.65;
                    xVal = "-72%";
                    rotateYVal = 6;
                    zIndexVal = 20;
                  } else if (isNearRight) {
                    scaleVal = 0.85;
                    opacityVal = 0.65;
                    xVal = "72%";
                    rotateYVal = -6;
                    zIndexVal = 20;
                  } else if (isFarLeft) {
                    scaleVal = 0.72;
                    opacityVal = 0.3;
                    xVal = "-135%";
                    rotateYVal = 12;
                    zIndexVal = 10;
                  } else if (isFarRight) {
                    scaleVal = 0.72;
                    opacityVal = 0.3;
                    xVal = "135%";
                    rotateYVal = -12;
                    zIndexVal = 10;
                  }

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      style={{ position: isCenter ? "relative" : "absolute", zIndex: zIndexVal }}
                      drag={isCenter ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      animate={{
                        scale: scaleVal,
                        opacity: opacityVal,
                        x: xVal,
                        rotateY: rotateYVal,
                        zIndex: zIndexVal,
                      }}
                      // --- ANIMASI SAAT KURSOR MENYENTUH (HOVER) ---
                      whileHover={isCenter ? { 
                        scale: 1.03, 
                        y: -8,
                        transition: { type: "spring", stiffness: 400, damping: 15 }
                      } : {}}
                      // -------------------------------------------
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                      className={`w-[260px] sm:w-[310px] rounded-2xl overflow-hidden border-2 bg-white dark:bg-slate-900 flex flex-col transition-shadow duration-300 ${
                        isCenter
                          ? "cursor-grab active:cursor-grabbing border-slate-400 dark:border-slate-600 shadow-xl"
                          : "pointer-events-none border-slate-300/50 dark:border-slate-800/50 shadow-none"
                      }`}
                    >
                      {/* GAMBAR PROYEK */}
                      <div className="w-full h-[180px] sm:h-[200px] overflow-hidden relative bg-slate-200 dark:bg-slate-800 border-b-2 border-slate-400 dark:border-slate-600 flex items-center justify-center shrink-0 select-none pointer-events-none">
                        {project.image_url ? (
                          <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            src={project.image_url} 
                            alt={project.title} 
                            className="w-full h-full object-cover object-center" 
                          />
                        ) : (
                          <span className="text-slate-400 font-mono text-[10px] font-bold uppercase tracking-wider">[ No Visual ]</span>
                        )}
                      </div>

                      {/* KONTEN */}
                      <div className="p-3.5 flex flex-col gap-2.5 bg-white dark:bg-slate-900">
                        <div className="space-y-1">
                          {project.role && (
                            <div className="flex items-center gap-1.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                              <span className={`text-[10px] font-black uppercase tracking-wider ${badge.text}`}>
                                {project.role}
                              </span>
                            </div>
                          )}
                          <h3 className="text-base font-black text-slate-950 dark:text-white tracking-tight leading-snug line-clamp-1">
                            {project.title}
                          </h3>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          onClick={() => setSelectedProject(project)}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-xs font-black uppercase tracking-wider transition-colors duration-200 group shrink-0"
                        >
                          Explore Details <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

{/* NAVIGASI & INDICATORS */}
              <div className="flex items-center gap-2.5 -mt-9 mb-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevProject}
                  className="p-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all"
                >
                  <ChevronLeft size={15} />
                </motion.button>

                <div className="flex gap-1.5 items-center px-3 py-1.5 bg-white dark:bg-slate-900 rounded-full border-2 border-slate-300 dark:border-slate-700 shadow-xs">
                  {projects.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIndex ? "w-5 bg-slate-950 dark:bg-white" : "w-1.5 bg-slate-300 dark:border-slate-700 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextProject}
                  className="p-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all"
                >
                  <ChevronRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          ) : (     
      
/* TECHNOLOGIES GRID */
<motion.div 
  key="tech" 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-7"
>
  {["Web Development", "Data Analytics", "UI/UX Design", "Tools"].map((catName) => {
    const section = groupedTech.find((s: any) => s.category === catName);
    if (!section) return null;

    return (
      <motion.div 
        key={section.category}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border-[2.5px] border-slate-400 dark:border-slate-500 shadow-sm flex flex-col gap-5 backdrop-blur-sm"
      >
        <div className="flex items-center">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-200">{section.category}</h4>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
          {section.tools.map((tool: any) => (
            <div key={tool.id} className="flex flex-col items-center text-center gap-2 group cursor-default">
              <img src={tool.img_url} alt={tool.name} className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-300" />
              <h5 className="text-[10px] font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{tool.name}</h5>
            </div>
          ))}
        </div>
      </motion.div>
    );
  })}
</motion.div>
                          )}
        </AnimatePresence>
      </motion.div>

      {/* MODAL DETAIL PROYEK DENGAN ANIMASI HALUS */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-2xl relative flex flex-col md:grid md:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all z-50 border border-slate-200 dark:border-slate-700"
              >
                <X size={16} />
              </button>

              <div className="md:col-span-5 p-6 bg-slate-50 dark:bg-slate-900/50 border-b md:border-b-0 md:border-r-2 border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="w-full aspect-[16/11] rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800">
                    <img src={selectedProject.image_url || "/placeholder.jpg"} alt={selectedProject.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight leading-snug">{selectedProject.title}</h2>
                    {selectedProject.role && (() => {
                      const mBadge = getRoleBadgeStyle(selectedProject.role);
                      return (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${mBadge.bg}`}>
                          <span className={`h-2 w-2 rounded-full animate-pulse ${mBadge.dot}`} />
                          <span className={`text-[10px] font-black uppercase tracking-wider ${mBadge.text}`}>
                            {selectedProject.role}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
                  {selectedProject.live_url && (
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-black uppercase tracking-wider shadow-xs transition-colors"
                    >
                      {selectedProject.role === "UI/UX Designer" ? "View Prototype" : "Live Demo"}
                      <ExternalLink size={13} />
                    </motion.a>
                  )}
                  {selectedProject.github_url && (
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-black uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      View GitHub
                    </motion.a>
                  )}
                  {!selectedProject.live_url && !selectedProject.github_url && (
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-400 text-xs font-black uppercase tracking-wider border-2 border-dashed border-slate-300 dark:border-slate-700 cursor-not-allowed">
                      Private Project
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-7 p-6 md:p-8 space-y-6 bg-white dark:bg-slate-900">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Overview</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{selectedProviderOverview(selectedProject.overview)}</p>
                </div>

                {Array.isArray(selectedProject.features) && selectedProject.features.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((f: string, i: number) => (
                        <li key={i} className="flex gap-2.5 text-xs text-slate-600 dark:text-slate-300 items-start">
                          <span className="text-slate-950 dark:text-white font-bold text-sm leading-none">•</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(selectedProject.tech_stack) && selectedProject.tech_stack.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((t: string) => (
                        <div key={t} className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 shadow-2xs">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function selectedProviderOverview(text: string) {
  return text;
}