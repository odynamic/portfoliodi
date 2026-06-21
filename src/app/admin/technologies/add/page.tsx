"use client";
import { useState } from "react";
import { addTechnology } from "../actions";
import ImageUploader from "@/components/ImageUploader";

export default function AddTech() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Add New Technology</h2>
      
      <form action={addTechnology} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Name</label>
            <input name="name" className="w-full border border-gray-200 p-3 rounded-xl" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
            <input name="category" placeholder="e.g. Frontend" className="w-full border border-gray-200 p-3 rounded-xl" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
          <textarea name="desc" className="w-full border border-gray-200 p-3 rounded-xl h-24" />
        </div>

        {/* Media */}
        <div className="border border-gray-200 p-4 rounded-xl">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Technology Icon</label>
          <ImageUploader onUpload={(url) => setImageUrl(url)} />
          <input type="hidden" name="img_url" value={imageUrl} />
          {imageUrl && (
            <div className="mt-3 p-2 border border-gray-200 rounded-lg w-fit">
              <img src={imageUrl} className="w-10 h-10 object-contain" alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-xl font-bold transition-all mt-2">
          Save Technology
        </button>
      </form>
    </div>
  );
}