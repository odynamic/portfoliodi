import { createClient } from "@/utils/supabase-server";
import { deleteExperience } from "./actions";
import Link from "next/link";
import { Briefcase, Edit2, Plus } from "lucide-react";
import DeleteButton from "../components/DeleteButton"; // Import komponen konfirmasi

export default async function ExpPage() {
  const supabase = await createClient();
  
  // Mengambil data dari Supabase
  const { data: exps } = await supabase
    .from("experiences")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Experiences</h1>
          <p className="text-gray-500 mt-1">Kelola riwayat kerja & pendidikan Anda.</p>
        </div>
        <Link 
          href="/admin/experiences/add" 
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg"
        >
          <Plus size={16} /> Add Exp
        </Link>
      </div>

      {/* List Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {exps && exps.length > 0 ? (
          exps.map((e: any) => (
            <div 
              key={e.id} 
              className="flex justify-between items-center p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{e.role}</p>
                  <p className="text-sm text-gray-500">
                    {e.company} • {e.start_date} s/d {e.end_date || "Present"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link 
                  href={`/admin/experiences/edit/${e.id}`} 
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit2 size={18} />
                </Link>
                
                {/* Tombol Hapus dengan Konfirmasi */}
                <DeleteButton action={deleteExperience.bind(null, e.id)} />
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400">
            Belum ada data pengalaman yang ditambahkan.
          </div>
        )}
      </div>
    </div>
  );
}