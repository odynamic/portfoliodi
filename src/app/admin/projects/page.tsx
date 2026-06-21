import { createClient } from "@/utils/supabase-server";
import { deleteProject } from "./actions";
import Link from "next/link";
import { FolderGit2, Edit2, Plus } from "lucide-react";
import DeleteButton from "../components/DeleteButton"; // Import komponen konfirmasi

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  // Mengambil data projects, diurutkan terbaru
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Atur portofolio dan studi kasus Anda.</p>
        </div>
        <Link 
          href="/admin/projects/add" 
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg"
        >
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {/* List Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {projects && projects.length > 0 ? (
          projects.map((p: any) => (
            <div 
              key={p.id} 
              className="flex justify-between items-center p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                  <FolderGit2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.role || "Project"}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link 
                  href={`/admin/projects/edit/${p.id}`} 
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit2 size={18} />
                </Link>
                
                {/* Menggunakan komponen DeleteButton yang sudah kita buat */}
               <DeleteButton action={deleteProject.bind(null, p.id)} />
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400">
            Belum ada proyek yang ditambahkan.
          </div>
        )}
      </div>
    </div>
  );
}