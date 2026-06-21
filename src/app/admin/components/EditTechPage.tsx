"use client";
import { useState } from "react";
import { updateTechnology } from "@/app/admin/technologies/actions";
import ImageUploader from "@/components/ImageUploader";

export default function EditTechForm({ tech, id }: { tech: any; id: string }) {
  const [imageUrl, setImageUrl] = useState(tech.img_url || "");
  const updateAction = updateTechnology.bind(null, id);

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Edit Tech: {tech.name}</h2>
      
      <form action={updateAction} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Name</label>
            <input name="name" defaultValue={tech.name} className="w-full border border-gray-200 p-3 rounded-xl" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
            <input name="category" defaultValue={tech.category} className="w-full border border-gray-200 p-3 rounded-xl" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
          <textarea name="desc" defaultValue={tech.desc} className="w-full border border-gray-200 p-3 rounded-xl h-24" />
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

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all">
          Update Technology
        </button>
      </form>
    </div>
  );
}