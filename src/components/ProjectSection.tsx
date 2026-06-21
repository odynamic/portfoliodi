"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowUpRight, ExternalLink, FolderGit2, Cpu } from "lucide-react";
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

  const getRoleBadgeColor = (role: string) => {
    const normalized = role.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normalized.includes("dashboard") || normalized.includes("data") || normalized.includes("analytics")) {
      return "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    }
    if (normalized.includes("fullstack")) {
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    }
    if (normalized.includes("uiux") || normalized.includes("design")) {
      return "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20";
    }
    if (normalized.includes("frontend")) {
      return "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
    if (normalized.includes("backend")) {
      return "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20";
    }
    if (normalized.includes("mobile") || normalized.includes("android") || normalized.includes("ios")) {
      return "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
    }
    return "text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/20";
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
    return <div className="py-20 text-center text-slate-400 font-mono tracking-widest text-[11px] animate-pulse">LOADING SUITE...</div>;
  }

  return (
    <section
      id="projects"
      className="relative w-full pt-6 pb-16 bg-[#F4F4F5] dark:bg-[#070C19] overflow-hidden transition-colors duration-500 border-t border-gray-200/30 dark:border-gray-900/40 scroll-mt-24"
    >
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "-40px 40px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="mx-auto max-w-6xl px-8 relative z-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-3"
          >
            <span className="px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 shadow-sm">
              Portfolios
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            Projects & Technologies
          </h2>

          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.3)]"
            />
          </div>

          <div className="inline-flex p-1 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            {[
              { id: "projects", label: "Projects", icon: <FolderGit2 size={11} /> },
              { id: "technologies", label: "Technologies", icon: <Cpu size={11} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-1.5 text-[10px] font-bold uppercase tracking-widest z-10 transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white font-black scale-105"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span className={`transition-colors duration-300 flex items-center justify-center ${activeTab === tab.id ? "text-white" : "text-slate-400 dark:text-slate-500"}`}>
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="luxury-tab-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-lg shadow-[0_2px_10px_rgba(37,99,235,0.2)] -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div key="carousel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative flex flex-col items-center -mt-4">
              <div className="flex items-center justify-center h-[360px] w-full max-w-5xl relative overflow-hidden perspective-[1200px]">
                {projects.map((project, index) => {
                  const isCenter = index === currentIndex;
                  const isLeft = index === (currentIndex - 1 + projects.length) % projects.length;
                  const isRight = index === (currentIndex + 1) % projects.length;
                  if (!isCenter && !isLeft && !isRight) return null;

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      style={{ position: isCenter ? "relative" : "absolute" }}
                      drag={isCenter ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      animate={{
                        scale: isCenter ? 1 : 0.85,
                        opacity: isCenter ? 1 : 0.35,
                        x: isLeft ? "-104%" : isRight ? "104%" : "0%",
                        rotateY: isLeft ? 8 : isRight ? -8 : 0,
                        zIndex: isCenter ? 30 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 26 }}
                      className={`w-[280px] md:w-[300px] h-auto rounded-2xl overflow-hidden border bg-white dark:bg-slate-950 flex flex-col justify-start transition-shadow duration-300 ${
                        isCenter
                          ? "cursor-grab active:cursor-grabbing border-slate-300 dark:border-slate-800 shadow-xl ring-1 ring-slate-200/30"
                          : "pointer-events-none border-slate-200/50 dark:border-slate-900/50 shadow-none"
                      }`}
                    >
                      <div className="w-full h-[180px] overflow-hidden relative bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-900/60 flex items-center justify-center text-slate-400 font-mono text-[9px] shrink-0 select-none pointer-events-none">
                        {project.image_url ? (
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover object-center" />
                        ) : (
                          <span className="opacity-50 tracking-widest uppercase">[ No Visual Attached ]</span>
                        )}
                      </div>

                      <div className="p-5 flex flex-col justify-start bg-white dark:bg-slate-950">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1 items-center min-h-[18px]">
                            {project.category && (
                              <span className="text-[7.5px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                                {project.category}
                              </span>
                            )}
                            {project.role && (
                              <span className={`text-[7.5px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${getRoleBadgeColor(project.role)}`}>
                                {project.role}
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                            {project.overview}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 mt-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-indigo-500 bg-slate-50/50 hover:bg-blue-50/20 dark:bg-slate-900/30 dark:hover:bg-indigo-950/20 text-slate-800 dark:text-slate-200 text-[10px] font-extrabold uppercase tracking-widest shadow-sm transition-all duration-300 group shrink-0"
                        >
                          Explore Details <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-500 dark:text-indigo-400" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={prevProject}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 shadow-md hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all active:scale-90"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-2.5 items-center px-4 py-2 bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-800 shadow-inner">
                  {projects.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIndex ? "w-8 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextProject}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 shadow-md hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all active:scale-90"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="tech" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 w-full max-w-4xl mx-auto pt-2">
              {groupedTech.map((section: any) => (
                <div key={section.category} className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/50 shadow-sm flex flex-col gap-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-4 rounded-full bg-blue-600" />
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{section.category}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
                    {section.tools.map((tool: any) => (
                      <div key={tool.id} className="p-3 rounded-xl bg-white dark:bg-[#090D1A] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2 group transition-all hover:border-blue-500/30">
                        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center">
                          <img src={tool.img_url} alt="" className="h-6 w-6 object-contain scale-100 group-hover:scale-105 transition-all duration-300" />
                        </div>
                        <h5 className="text-[10px] font-black text-slate-900 dark:text-white tracking-tight">{tool.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-950 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-900 shadow-2xl relative flex flex-col md:grid md:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-red-500 transition-all z-50"
              >
                <X size={16} />
              </button>

              <div className="md:col-span-4 p-6 bg-slate-50 dark:bg-slate-900/10 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-100">
                    <img src={selectedProject.image_url || "/placeholder.jpg"} alt={selectedProject.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">{selectedProject.title}</h2>
                    <div className="mt-2 inline-block px-2.5 py-1 rounded-md bg-blue-100/50 dark:bg-blue-900/30 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                      {selectedProject.role}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:bg-slate-800 dark:hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {selectedProject.role === "UI/UX Designer" ? "View Prototype" : "Live Demo"}
                      <ExternalLink size={11} />
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      View GitHub
                    </a>
                  )}
                  {!selectedProject.live_url && !selectedProject.github_url && (
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-dashed border-slate-300 dark:border-slate-700 cursor-not-allowed">
                      Private Project
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-8 p-6 md:p-8 space-y-8 bg-slate-100/50 dark:bg-slate-950/50">
                <div className="space-y-2">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Project Overview</h4>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{selectedProject.overview}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-red-500/[0.03] border border-red-500/[0.08] space-y-1.5">
                    <h5 className="text-[9px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">Challenge</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/[0.08] space-y-1.5">
                    <h5 className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Solution</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                {Array.isArray(selectedProject.features) && selectedProject.features.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((f: string, i: number) => (
                        <li key={i} className="flex gap-2.5 text-[11px] text-slate-600 dark:text-slate-400 items-center">
                          <span className="text-blue-500 flex items-center justify-center leading-none text-[12px]">★</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(selectedProject.tech_stack) && selectedProject.tech_stack.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((t: string) => (
                        <div key={t} className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm">
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