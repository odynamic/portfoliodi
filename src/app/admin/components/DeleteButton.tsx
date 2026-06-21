"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";

// Kita hanya terima satu prop 'action' yang sudah di-bind
export default function DeleteButton({ action }: { action: () => Promise<void> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Konfirmasi Hapus</h3>
            <p className="text-sm text-gray-500">Yakin ingin menghapus ini? Tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl">Batal</button>
              
              {/* Panggil action yang sudah di-bind di server */}
              <form action={action} className="flex-1">
                <button type="submit" className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl">Hapus</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}