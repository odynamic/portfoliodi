"use client";
import { useState } from "react";
import { updateExperience } from "@/app/admin/experiences/actions";
import ImageUploader from "@/components/ImageUploader";

export default function EditExperienceForm({ exp, id }: { exp: any; id: string }) {
  const [imageUrl, setImageUrl] = useState(exp.image_url || "");
  const updateAction = updateExperience.bind(null, id);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">Edit Experience</h2>
        <p className="text-gray-500 text-sm">Ubah data pengalaman kerja atau pendidikan Anda.</p>
      </div>

      <form action={updateAction} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Company</label>
            <input name="company" defaultValue={exp.company} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Role</label>
            <input name="role" defaultValue={exp.role} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Type</label>
            <input name="type" defaultValue={exp.type} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Location</label>
            <input name="location" defaultValue={exp.location} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
        </div>

        {/* Date Pickers (Native browser bulan & tahun) */}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Start Date</label>
            <input 
              name="start_date" 
              type="month" 
              defaultValue={exp.start_date ? new Date(exp.start_date).toISOString().substring(0, 7) : ""} 
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">End Date</label>
            <input 
              name="end_date" 
              type="month" 
              defaultValue={exp.end_date ? new Date(exp.end_date).toISOString().substring(0, 7) : ""} 
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" 
            />
          </div>
        </div>

        {/* Media */}
        <div className="border border-gray-200 p-4 rounded-xl">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Company Logo</label>
          <ImageUploader onUpload={(url) => setImageUrl(url)} />
          <input type="hidden" name="image_url" value={imageUrl} />
          {imageUrl && <img src={imageUrl} className="w-16 h-16 mt-3 object-cover rounded-lg border border-gray-200" alt="Preview" />}
        </div>

        {/* Detailed Info */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
          <textarea name="description" defaultValue={exp.description} className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Highlights (1 per line)</label>
          <textarea name="highlights" defaultValue={exp.highlights?.join("\n")} className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Tags</label>
          <input name="tags" defaultValue={exp.tags?.join(", ")} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all mt-2">
          Update Experience
        </button>
      </form>
    </div>
  );
}