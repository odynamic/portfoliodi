"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Briefcase, Users, Layers, ArrowUpRight, ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";

export default function ExperienceSection() {
  const { data: experiences, loading } = usePortfolioData("experiences");
  const [activeExpTab, setActiveExpTab] = useState<string>('All');
  const [selectedExp, setSelectedExp] = useState<any | null>(null);
  
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const INITIAL_DISPLAY_COUNT = 2;

  const filteredExperiences = experiences 
    ? [...experiences] 
        .filter((exp: any) => {
          if (activeExpTab === 'All') return true;
          if (activeExpTab === 'Industry') {
            return exp.type === 'Work' || exp.type === 'Internship';
          }
          if (activeExpTab === 'Community') {
            return exp.type === 'Organization' || exp.type === 'Committee';
          }
          return exp.type === activeExpTab;
        })
        .sort((a: any, b: any) => {
          const getCategoryWeight = (type: string) => {
            if (type === 'Work') return 0;
            if (type === 'Internship') return 1;
            if (type === 'Organization') return 2;
            if (type === 'Committee') return 3;
            return 4;
          };

          const weightA = getCategoryWeight(a.type);
          const weightB = getCategoryWeight(b.type);

          if (weightA !== weightB) {
            return weightA - weightB;
          }

          if (a.type === 'Committee') {
            const getRoleWeight = (roleName: string) => {
              const name = roleName.toLowerCase();
              if (name.includes('manager') || name.includes('chairman') || name.includes('ketua') || name.includes('leader')) return 0; 
              if (name.includes('coordinator') || name.includes('coor') || name.includes('koordinator')) return 1; 
              if (name.includes('mentor') || name.includes('mentee') || name.includes('pendamping')) return 2; 
              if (name.includes('staff') || name.includes('staf') || name.includes('member') || name.includes('anggota')) return 3; 
              return 3; 
            };

            const roleWeightA = getRoleWeight(a.role);
            const roleWeightB = getRoleWeight(b.role);

            if (roleWeightA !== roleWeightB) {
              return roleWeightA - roleWeightB; 
            }
          }

          const yearA = a.start_date ? parseInt(a.start_date.split(" ")[1]) || 0 : 0;
          const yearB = b.start_date ? parseInt(b.start_date.split(" ")[1]) || 0 : 0;
          if (yearB !== yearA) return yearB - yearA;

          const months: { [key: string]: number } = {
            jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
            jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
          };
          const monthA = a.start_date ? months[a.start_date.toLowerCase().split(" ")[0]] || 0 : 0;
          const monthB = b.start_date ? months[b.start_date.toLowerCase().split(" ")[0]] || 0 : 0;
          
          return monthB - monthA;
        })
    : [];

  const displayedExperiences = isExpanded 
    ? filteredExperiences 
    : filteredExperiences.slice(0, INITIAL_DISPLAY_COUNT);

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500 font-mono tracking-widest text-xs animate-pulse bg-slate-100/90 dark:bg-slate-950">
        LOADING DATA...
      </div>
    );
  }

  return (
    <section 
      id="experience" 
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

      <div className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10">
        
        {/* HEADER SECTION & TAB SWITCHER */}
        <div className="flex flex-col items-center mt-2 mb-2 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white mb-2"
          >
            My Experiences
          </motion.h2>

          <div className="flex justify-center mb-2.5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 36 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="h-1 bg-slate-950 dark:bg-white rounded-full"
            />
          </div>

          <div className="inline-flex items-center p-1 bg-slate-200/80 dark:bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-300 dark:border-slate-800 shadow-inner mt-3">            {[
              { id: "All", label: "All" },
              { id: "Industry", label: "Industry" },
              { id: "Community", label: "Community" }
            ].map((tab) => {
              const isActive = activeExpTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveExpTab(tab.id);
                    setIsExpanded(false);
                  }}
                  className={`relative flex items-center gap-1.5 px-5 py-1.5 text-xs font-black uppercase tracking-wider transition-colors duration-300 z-10 ${
                    isActive
                      ? "text-white dark:text-slate-950"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${isActive ? "text-white dark:text-slate-950" : "text-slate-400 dark:text-slate-500"}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="exp-tab-indicator"
                      className="absolute inset-0 bg-slate-950 dark:bg-white rounded-full shadow-md -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative space-y-4 pt-1 min-h-0 mt-6">
          <div className="absolute left-[3.5px] md:left-1/2 w-[4px] h-full bg-slate-300 dark:bg-slate-800 md:-translate-x-1/2 z-0" />         
          <AnimatePresence mode="popLayout">
          {displayedExperiences.map((exp: any, idx: number) => {
            const badgeType = exp.type;
            const badgeColorClass = 
              badgeType === 'Internship' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
              badgeType === 'Work' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
              badgeType === 'Committee' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
              'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';

            return (
              <motion.div 
                key={exp.id} 
                layout
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} 
                className="relative group pl-9 md:pl-0"
              >
                <div className="absolute left-[4.5px] md:left-1/2 w-5 h-5 bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 rounded-full md:-translate-x-1/2 flex items-center justify-center transition-all duration-300 z-20 group-hover:scale-110 group-hover:border-slate-950 dark:group-hover:border-white shadow-xs">
                  <div className="w-1.5 h-1.5 bg-slate-950 dark:bg-white rounded-full z-10" />
                </div>
                
                <div className="md:grid md:grid-cols-2 gap-12 text-left md:text-inherit">
                  <div className={`${idx % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2 md:text-left"}`}>
                    <motion.div 
                      whileHover={{ y: -6, scale: 1.02 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="p-4 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className={`w-full flex flex-col ${idx % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                        <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border mb-2 shrink-0 w-fit ${badgeColorClass}`}>
                          {exp.type === 'Internship' ? 'Internship' : exp.type === 'Work' ? 'Full-time' : exp.type === 'Committee' ? 'Committee' : 'Organization'}
                        </span>

                        <h3 className="text-base font-black text-slate-950 dark:text-white tracking-tight">{exp.role}</h3>
                        
                        <div className={`flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-1 mb-3 ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                          <span className="font-extrabold text-slate-900 dark:text-slate-200">
                            {exp.company}
                          </span> 
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={10} className="text-slate-400" /> {exp.start_date} - {exp.end_date}</span>
                          {exp.duration && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-0.5"><Clock size={10} /> {exp.duration}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <motion.button 
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        onClick={() => setSelectedExp(exp)} 
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-2xl border-2 border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-xs font-black uppercase tracking-wider transition-colors duration-300 group/btn shrink-0"
                      >
                        Explore Details <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

          {filteredExperiences.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-10 text-xs text-slate-400"
            >
              No experiences found in this category.
            </motion.div>
          )}
        </div>

        {filteredExperiences.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center pt-6 md:pt-4 relative z-20 w-full">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs transition-colors duration-300"
            >
              {isExpanded ? (
                <>
                  Collapse Journey <ChevronUp size={15} />
                </>
              ) : (
                <>
                  Expand Journey ({filteredExperiences.length - INITIAL_DISPLAY_COUNT}) <ChevronDown size={15} />
                </>
              )}
            </motion.button>      
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedExp && (() => {
          const modalBadgeColorClass = 
            selectedExp.type === 'Internship' ? 'bg-blue-600 dark:bg-blue-500 border-blue-700/50 dark:border-blue-400/50' :
            selectedExp.type === 'Work' ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-700/50 dark:border-emerald-400/50' :
            selectedExp.type === 'Committee' ? 'bg-amber-600 dark:bg-amber-500 border-amber-700/50 dark:border-amber-400/50' :
            'bg-purple-600 dark:bg-purple-500 border-purple-700/50 dark:border-purple-400/50';

          return (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6" 
              onClick={() => setSelectedExp(null)}
            >
              <motion.div 
                initial={{ scale: 0.96, opacity: 0, y: 15 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.96, opacity: 0, y: 15 }} 
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl border border-slate-300 dark:border-slate-700 shadow-2xl relative flex flex-col md:grid md:grid-cols-12" 
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedExp(null)} 
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-colors duration-300 z-50 border border-slate-300 dark:border-slate-700"
                >
                  <X size={16}/>
                </button>
                
                <div className="md:col-span-5 p-6 bg-slate-50 dark:bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-300 dark:border-slate-700 flex flex-col justify-between gap-6">
                  <div className="space-y-4 w-full">
                    <div className="w-full aspect-[16/11] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800">
                      <img 
                        src={selectedExp.image_url || "/placeholder.jpg"} 
                        alt={selectedExp.role} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md border text-white shadow-xs ${modalBadgeColorClass}`}>
                        {selectedExp.type === 'Internship' ? 'Internship' : selectedExp.type === 'Work' ? 'Full-time' : selectedExp.type === 'Committee' ? 'Committee' : 'Organization'}
                      </span>
                    </div>
                  </div>

                  {selectedExp.location && (
                    <div className="hidden md:flex flex-col gap-2 p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 shadow-2xs w-full">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Location Details</h4>
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-slate-600 dark:text-slate-300 shrink-0" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{selectedExp.location}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 p-6 md:p-8 space-y-6 bg-white dark:bg-slate-900">
                  <div className="space-y-2">
                    <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{selectedExp.company}</h3>
                    <h2 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-snug">{selectedExp.role}</h2>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium border-b border-slate-300 dark:border-slate-700 pb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{selectedExp.start_date} - {selectedExp.end_date || "Present"}</span>
                      </div>
                      {selectedExp.duration && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <div className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" />
                            <span>{selectedExp.duration}</span>
                          </div>
                        </>
                      )}
                      {selectedExp.location && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700 md:hidden">•</span>
                          <div className="flex items-center gap-1 md:hidden">
                            <MapPin size={13} className="text-slate-400" />
                            <span>{selectedExp.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {selectedExp.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700">
                      {selectedExp.description}
                    </p>
                  )}

                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Responsibilities</h4>
                    <ul className="space-y-2">
                      {(Array.isArray(selectedExp.highlights)
                        ? selectedExp.highlights
                        : typeof selectedExp.highlights === 'string'
                        ? selectedExp.highlights.split(',')
                        : []
                      ).map((h: string, i: number) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex gap-2.5 items-start">
                          <span className="text-slate-950 dark:text-white font-bold text-sm leading-none">•</span> 
                          <span className="leading-relaxed">{h.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}