import { createClient } from "@/utils/supabase-server";
import { Briefcase, FolderGit2, Cpu } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const menuItems = [
    { title: 'Experiences', desc: 'Kelola riwayat kerja & pendidikan', href: '/admin/experiences', icon: Briefcase },
    { title: 'Projects', desc: 'Atur portofolio & studi kasus', href: '/admin/projects', icon: FolderGit2 },
    { title: 'Technologies', desc: 'Update daftar skill & stack', href: '/admin/technologies', icon: Cpu },
  ];

  return (
    // Grid background halus untuk memberikan identitas visual DGP Portal
    <div className="min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="max-w-4xl mx-auto p-8 pt-12">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">Dashboard Admin</h1>
          <p className="mt-2 text-gray-500">
            Selamat datang kembali, <span className="font-semibold text-gray-800">{user?.email}</span>
          </p>
        </div>
        
        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.title}
                href={item.href}
                className="group relative p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-gray-900">{item.title}</h2>
                    <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
                  </div>
                  {/* Ikon ukuran 16 agar terlihat lebih rapi dan kecil */}
                  <div className="p-2 bg-slate-50 rounded-lg text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <Icon size={16} />
                  </div>
                </div>
                
                <div className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  Buka panel <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}