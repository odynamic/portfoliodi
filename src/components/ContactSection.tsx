"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { FiArrowUpRight as ArrowIcon } from "react-icons/fi";
import { IoSend } from "react-icons/io5";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const SOCIAL_LINKS = [
  { label: "Instagram", icon: <FaInstagram size={15} />, link: "https://instagram.com/dyahgputri" },
  { label: "LinkedIn", icon: <FaLinkedin size={15} />, link: "https://linkedin.com" },
  { label: "GitHub", icon: <FaGithub size={15} />, link: "https://github.com/dynamic" },
  { label: "Email", icon: <FaEnvelope size={15} />, link: "mailto:ghaniyaputridyah@gmail.com" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    } catch {
      setStatus("error");
    }
  };

  return (
    <section 
      id="contact" 
      className="relative w-full pt-10 pb-10 md:pt-14 md:pb-14 bg-slate-100/90 dark:bg-slate-950 transition-colors duration-500 overflow-hidden font-sans selection:bg-slate-200 scroll-mt-24"
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h28v28H0z' fill='none'/%3E%3Cpath d='M28 0v28H0' fill='none' stroke='%2394a3b8' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Main container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-4xl px-6 sm:px-8 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mt-0 mb-10 text-center">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white mb-0"
          >
            Start a Conversation
          </motion.h2>

          <div className="flex justify-center">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 36, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="h-1 bg-slate-950 dark:bg-white rounded-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-4 items-stretch">
          {/* Left column */}
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1 mb-2.5">
              Connect Platforms
            </h4>
            
            <div className="flex-1 flex flex-col justify-between space-y-2.5">
              <div className="flex flex-col space-y-2.5">
                {SOCIAL_LINKS.map((item) => (
                  <a 
                    key={item.label} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title={item.label}
                    className="flex justify-between items-center p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-slate-400 dark:border-slate-600 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-slate-950 dark:hover:border-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                      <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-colors flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                    </div>
                    <ArrowIcon size={14} className="text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                ))}
              </div>

              <a 
                href="https://maps.app.goo.gl/gwrCNMxgf17ZxW7g8"
                target="_blank"
                rel="noopener noreferrer"
                title="Kuningan, Jawa Barat"
                className="flex justify-between items-center p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-slate-400 dark:border-slate-600 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-slate-950 dark:hover:border-white transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-slate-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-colors flex items-center justify-center">
                    <FaMapMarkerAlt size={15} />
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider">Location</span>
                </div>
                <ArrowIcon size={14} className="text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div variants={itemVariants} className="md:col-span-7 flex flex-col -mt-2 md:mt-0">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1 mb-2.5">
              Send a Message
            </h4>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name" 
                  required
                  className="w-full px-4 py-3.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white outline-none focus:border-slate-950 dark:focus:border-white shadow-xs transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium" 
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email" 
                  required
                  className="w-full px-4 py-3.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white outline-none focus:border-slate-950 dark:focus:border-white shadow-xs transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium" 
                />
              </div>
              
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject" 
                required
                className="w-full px-4 py-3.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white outline-none focus:border-slate-950 dark:focus:border-white shadow-xs transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium" 
              />
              
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..." 
                required
                className="w-full flex-1 px-4 py-3.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white outline-none focus:border-slate-950 dark:focus:border-white shadow-xs transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none font-medium"
              />
              
              {status === "success" && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wide px-1">
                  ✓ Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold tracking-wide px-1">
                  ✕ Failed to send. Please try again.
                </p>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-[1.5px] border-slate-950 dark:border-white bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
              >
                <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                {status !== "loading" && <IoSend size={13} />}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}