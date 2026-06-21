"use client";
import { usePathname as useNavPathname } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Briefcase, FolderGit2, Cpu, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const pathname = useNavPathname();
  const [mounted, setMounted] = useState(false);

  // Teknik ini memastikan code hanya jalan di browser
  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Experiences", href: "/admin/experiences", icon: Briefcase },
    { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { name: "Technologies", href: "/admin/technologies", icon: Cpu },
  ];

  if (!mounted) return null; // Atau return skeleton sederhana jika mau

  return (
    <aside className="w-64 bg-[#0B1221] flex flex-col p-6 border-r border-white/5">
      <div className="mb-12 px-2">
        <h2 className="text-xl font-black text-white tracking-tighter">
          DGP<span className="text-blue-500">.</span>PORTAL
        </h2>
      </div>
      
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}