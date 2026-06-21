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

  if (loading) return <div className="py-20 text-center text-gray-500 font-bold animate-pulse">Loading experience engine...</div>;

  return (
    <section 
      id="experience" 
      className="relative w-full min-h-screen pt-12 pb-6 bg-[#F4F4F5] dark:bg-[#070C19] overflow-hidden transition-colors duration-500 border-t border-gray-200/30 dark:border-gray-900/40 scroll-mt-24"
    >        
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)"
        }}
      />

      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "-40px 40px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]" 
      />

      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/[0.06] dark:bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="mx-auto max-w-4xl px-8 relative z-10">
        
        <div className="text-center mb-6 space-y-3">
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 shadow-sm">
              Professional Journey
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              Experiences & Roles
            </h2>
            
            <div className="flex justify-center">
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: "60px" }} 
                viewport={{ once: true }} 
                className="h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center -mt-2 mb-3">
          <div className="relative flex p-1 bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm group">
            {[
              { id: "All", label: "All", icon: <Layers size={11} /> },
              { id: "Industry", label: "Industry", icon: <Briefcase size={11} /> },
              { id: "Community", label: "Community", icon: <Users size={11} /> }
            ].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => {
                  setActiveExpTab(tab.id);
                  setIsExpanded(false);
                }} 
                className={`relative flex items-center gap-2 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest z-10 transition-all duration-300 ${
                  activeExpTab === tab.id ? "text-white font-black scale-105" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <span className={`transition-colors duration-300 flex items-center justify-center ${activeExpTab === tab.id ? "text-white" : "text-slate-400 dark:text-slate-500"}`}>
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
                {activeExpTab === tab.id && (
                  <motion.div 
                    layoutId="activeExpIndicator" 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-lg shadow-[0_2px_10px_rgba(37,99,235,0.2)] -z-10" 
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative space-y-3 pt-1 min-h-0">
          <div className="absolute left-[3.5px] md:left-1/2 w-[4px] h-full bg-gradient-to-b from-blue-600/80 via-blue-500/60 to-transparent md:-translate-x-1/2 z-0" />          
          
          <AnimatePresence mode="popLayout">
            {displayedExperiences.map((exp: any, idx: number) => (
              <motion.div 
                key={exp.id} 
                layout
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }} 
                className="relative group pl-9 md:pl-0"
              >
                <div className="absolute left-[4.5px] md:left-1/2 w-5 h-5 bg-white dark:bg-[#070C19] border-2 border-blue-600 rounded-full md:-translate-x-1/2 flex items-center justify-center transition-all duration-300 z-20 group-hover:scale-110 group-hover:border-indigo-500 shadow-[0_0_10px_rgba(37,99,235,0.15)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                  <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-indigo-400 rounded-full group-hover:animate-ping absolute inset-0 m-auto opacity-0 group-hover:opacity-100 bg-indigo-500" />
                  <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-indigo-400 rounded-full z-10" />
                </div>
                
                <div className="md:grid md:grid-cols-2 gap-12 text-left md:text-inherit">
                  <div className={`${idx % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2 md:text-left"}`}>
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.01 }} 
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      className="p-4 rounded-2xl bg-white/90 dark:bg-slate-950/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className={`absolute inset-y-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-purple-500 ${
                        idx % 2 === 0 ? "right-0 left-auto md:right-0 md:left-auto" : "left-0 right-auto md:left-0 md:right-auto"
                      }`} />

                      <div className={`w-full flex flex-col ${idx % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                        <span className={`inline-flex items-center text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-md border mb-2 shrink-0 w-fit ${
                          exp.type === 'Memory' || exp.type === 'Internship'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                            : exp.type === 'Work'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : exp.type === 'Committee'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                            : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                        }`}>
                          {exp.type === 'Internship' ? 'Internship' : exp.type === 'Work' ? 'Full-time' : exp.type === 'Committee' ? 'Committee' : 'Organization'}
                        </span>

                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{exp.role}</h3>
                        
                        <div className={`flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide mt-1 mb-3 ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                          <span className="font-extrabold text-slate-700 dark:text-slate-300">
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

                      <button 
                        onClick={() => setSelectedExp(exp)} 
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/80 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900/80 text-slate-700 dark:text-slate-300 text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 group/btn shadow-sm"
                      >
                        <span className="flex items-center gap-1.5 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-100 bg-clip-text text-transparent group-hover/btn:from-blue-600 group-hover/btn:to-indigo-600 dark:group-hover/btn:from-blue-400 dark:group-hover/btn:to-purple-400 font-black">
                          Explore Details 
                          <ArrowUpRight size={11} className="text-slate-400 group-hover/btn:text-blue-500 dark:group-hover/btn:text-indigo-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredExperiences.length === 0 && (
            <div className="text-center py-10 text-xs text-slate-400">No experiences found in this category.</div>
          )}
        </div>

        {filteredExperiences.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center pt-6 md:pt-4 relative z-20 w-full">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200/60 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/60 backdrop-blur-md text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-[9px] uppercase tracking-widest shadow-sm hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-0.5"
            >
              {isExpanded ? (
                <>
                  Collapse Journey <ChevronUp size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  Expand Journey ({filteredExperiences.length - INITIAL_DISPLAY_COUNT}) <ChevronDown size={11} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </>
              )}
            </button>        
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedExp && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto" 
            onClick={() => setSelectedExp(null)}
          >
            <motion.div 
              initial={{ scale: 0.97, y: 10, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.97, y: 10, opacity: 0 }} 
              className="bg-white dark:bg-slate-950 w-full max-w-5xl rounded-[2rem] border border-slate-200 dark:border-slate-900 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 relative my-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedExp(null)} className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-red-500 transition-colors rounded-full shadow-sm z-50">
                <X size={12}/>
              </button>
              
              <div className="md:col-span-5 bg-slate-50/50 dark:bg-slate-900/10 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-900/60 p-6 flex flex-col justify-between gap-6">
                <div className="space-y-4 w-full">
                  <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                    <img 
                      src={selectedExp.image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"} 
                      alt={selectedExp.role} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const badgeStyles = {
                        Memory: 'bg-blue-600 dark:bg-blue-500 border-blue-700/50 dark:border-blue-400/50',
                        Internship: 'bg-blue-600 dark:bg-blue-500 border-blue-700/50 dark:border-blue-400/50',
                        Work: 'bg-emerald-600 dark:bg-emerald-500 border-emerald-700/50 dark:border-emerald-400/50',
                        Committee: 'bg-amber-600 dark:bg-amber-500 border-amber-700/50 dark:border-amber-400/50',
                        Organization: 'bg-purple-600 dark:bg-purple-500 border-purple-700/50 dark:border-purple-400/50',
                        default: 'bg-slate-600 dark:bg-slate-500 border-slate-700/50 dark:border-slate-400/50'
                      };

                      const currentStyle = typeof selectedExp.type === 'string' && selectedExp.type in badgeStyles
                        ? badgeStyles[selectedExp.type as keyof typeof badgeStyles]
                        : badgeStyles.default;

                      return (
                        <span className={`inline-flex items-center text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-md border text-white shadow-sm shrink-0 ${currentStyle}`}>
                          {selectedExp.type === 'Internship' ? 'Internship' : selectedExp.type === 'Work' ? 'Full-time' : selectedExp.type === 'Committee' ? 'Committee' : 'Organization'}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {selectedExp.location && (
                  <div className="hidden md:flex flex-col gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-900/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)] w-full">
                    <h4 className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.15em] mb-0.5">Location Details</h4>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <MapPin size={11} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate">{selectedExp.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-[85vh]">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{selectedExp.company}</h3>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1 leading-tight tracking-tight">{selectedExp.role}</h2>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 text-[10px] text-slate-500 dark:text-slate-400 font-medium border-b border-slate-100 dark:border-slate-900 pb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={11} className="text-slate-400" />
                        <span>{selectedExp.start_date} - {selectedExp.end_date || "Present"}</span>
                      </div>
                      {selectedExp.duration && (
                        <>
                          <span className="text-slate-300 dark:text-slate-800">•</span>
                          <div className="flex items-center gap-1">
                            <Clock size={11} className="text-slate-400" />
                            <span>{selectedExp.duration}</span>
                          </div>
                        </>
                      )}
                      {selectedExp.location && (
                        <>
                          <span className="text-slate-300 dark:text-slate-800 md:hidden">•</span>
                          <div className="flex items-center gap-1 md:hidden">
                            <MapPin size={11} className="text-slate-400" />
                            <span>{selectedExp.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {selectedExp.description && (
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 italic leading-relaxed bg-slate-50 dark:bg-slate-900/20 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-900/50">
                      "{selectedExp.description}"
                    </p>
                  )}

                  <div>
                    <h4 className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2.5 tracking-widest">Key Accomplishments & Responsibilities</h4>
                    <ul className="space-y-2.5">
                      {(Array.isArray(selectedExp.highlights)
                        ? selectedExp.highlights
                        : typeof selectedExp.highlights === 'string'
                        ? selectedExp.highlights.split(',')
                        : []
                      ).map((h: string, i: number) => (
                        <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 flex gap-2.5 leading-relaxed">
                          <span className="text-blue-500 mt-0.5 shrink-0">✦</span> 
                          <span>{h.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedExp.tags && selectedExp.tags.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-900 mt-4">
                    <h4 className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 mb-2 tracking-widest">Skills & Tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExp.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 transition-colors hover:bg-blue-500/10 hover:text-blue-500">
                          {tag}
                        </span>
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