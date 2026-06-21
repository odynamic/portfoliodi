import { createClient } from "@/utils/supabase-server";
import { deleteTechnology } from "./actions";
import Link from "next/link";
import { Code2, Edit2, Plus } from "lucide-react";
import DeleteButton from "../components/DeleteButton";

export default async function TechnologiesPage() {
  const supabase = await createClient();
  
  // Mengambil data technologies, diurutkan berdasarkan kategori atau nama
  const { data: techs } = await supabase
    .from("technologies")
    .select("*")
    .order("category", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Technologies</h1>
          <p className="text-gray-500 mt-1">Kelola daftar stack teknologi Anda.</p>
        </div>
        <Link 
          href="/admin/technologies/add" 
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg"
        >
          <Plus size={16} /> Add Tech
        </Link>
      </div>

      {/* List Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {techs && techs.length > 0 ? (
          techs.map((t: any) => (
            <div 
              key={t.id} 
              className="flex justify-between items-center p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                  {t.img_url ? (
                    <img src={t.img_url} alt={t.name} className="w-5 h-5 object-contain" />
                  ) : (
                    <Code2 size={20} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{t.category}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link 
                  href={`/admin/technologies/edit/${t.id}`} 
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit2 size={18} />
                </Link>
                
                {/* Menggunakan DeleteButton dengan popup modal */}
                <DeleteButton action={deleteTechnology.bind(null, t.id)} />
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400">
            Belum ada teknologi yang ditambahkan.
          </div>
        )}
      </div>
    </div>
  );
}