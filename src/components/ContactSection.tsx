"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { FiArrowUpRight as ArrowIcon } from "react-icons/fi";
import { IoSend } from "react-icons/io5";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full pt-8 pb-8 bg-[#F4F4F5] dark:bg-[#070C19] overflow-hidden transition-colors duration-500 border-t border-gray-200/30 dark:border-gray-900/40 scroll-mt-24">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0) 70%)"
        }}
      />

      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "-40px 40px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_60%,transparent_100%)]" 
      />

      <div className="mx-auto max-w-4xl px-8 relative z-10">
        <div className="text-center mb-4 space-y-2 -mt-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
            <p className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[8px] uppercase">Contact Me</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Let's Start a Conversation</h2>
          <div className="flex justify-center pt-1">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} viewport={{ once: true }} className="h-1 bg-blue-600 rounded-full mt-1 mb-2 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 flex flex-col">
            <h4 className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1 mb-3">Connect Platforms</h4>
            
            <div className="flex-1 flex flex-col justify-between space-y-3">
              {[
                { label: "Instagram", icon: <FaInstagram size={13} />, link: "https://instagram.com/dyahgputri" },
                { label: "LinkedIn", icon: <FaLinkedin size={13} />, link: "https://linkedin.com" },
                { label: "GitHub", icon: <FaGithub size={13} />, link: "https://github.com/dynamic" },
                { label: "Email", icon: <FaEnvelope size={13} />, link: "mailto:ghaniyaputridyah@gmail.com" },
              ].map((item) => (
                <a 
                  key={item.label} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-1 justify-between items-center p-4 rounded-xl bg-white/60 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-900/80 hover:border-blue-500/30 dark:hover:border-blue-500/20 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 transition-colors flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                  <ArrowIcon size={13} className="text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              ))}

              <div className="flex flex-1 justify-between items-center p-4 rounded-xl bg-white/60 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-900/80 shadow-sm text-[11px]">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt size={13} />
                  </span>
                  <span className="font-bold uppercase tracking-wider">Location</span>
                </div>
                <span className="text-slate-500/80 dark:text-slate-400/80 font-medium tracking-wide text-right">Kuningan, Jawa Barat</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name" 
                  required
                  className="w-full px-5 py-4 text-xs rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-900/80 text-slate-900 dark:text-white outline-none focus:border-blue-500/40 dark:focus:border-blue-500/30 shadow-inner transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email" 
                  required
                  className="w-full px-5 py-4 text-xs rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-900/80 text-slate-900 dark:text-white outline-none focus:border-blue-500/40 dark:focus:border-blue-500/30 shadow-inner transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                />
              </div>
              
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject" 
                required
                className="w-full px-5 py-4 text-xs rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-900/80 text-slate-900 dark:text-white outline-none focus:border-blue-500/40 dark:focus:border-blue-500/30 shadow-inner transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" 
              />
              
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..." 
                required
                className="w-full flex-1 px-5 py-4 text-xs rounded-xl bg-white/60 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-900/80 text-slate-900 dark:text-white outline-none focus:border-blue-500/40 dark:focus:border-blue-500/30 shadow-inner transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
              ></textarea>
              
              {status === "success" && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wide px-1">✓ Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-[10px] text-rose-600 dark:text-rose-400 font-bold tracking-wide px-1">✕ Failed to send. Please try again.</p>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                {status !== "loading" && <IoSend size={11} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}