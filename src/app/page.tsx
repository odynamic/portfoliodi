"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import { createClient } from "@/utils/supabase-client"; 
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectSection from "@/components/ProjectSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isSplashDone, setIsSplashDone] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
    }
    fetchProjects();
  }, []);

  if (!mounted) return null;

  return (
    <main className={`relative w-full overflow-x-hidden bg-[#FAFAFA] dark:bg-[#030712] text-[#0A0F1D] dark:text-white flex flex-col transition-colors duration-700 font-sans select-none ${!isSplashDone ? "h-screen overflow-hidden" : "min-h-screen"}`}>
      {!isSplashDone ? (
        <SplashScreen onComplete={() => {
          setIsSplashDone(true);
          window.scrollTo(0, 0);
        }} />
      ) : (
        <>
          <div id="hero" className="w-full">
            <HeroSection />
          </div>
          
          <div id="about" className="scroll-mt-12">
            <AboutSection projects={projects} />
          </div>

          <div id="projects" className="scroll-mt-12">
            <ProjectSection />
          </div>

          <div id="experience" className="scroll-mt-12">
            <ExperienceSection />
          </div>

          <div id="contact" className="scroll-mt-12">
            <ContactSection />
          </div>

          <Footer />
        </>
      )}
    </main>
  );
}