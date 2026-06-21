"use client";
import { useState } from "react";
import { addExperience } from "../actions";
import ImageUploader from "@/components/ImageUploader";

export default function AddExp() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">Add New Experience</h2>
        <p className="text-gray-500 text-sm">Tambahkan riwayat pekerjaan atau pendidikan baru.</p>
      </div>
      
      <form action={addExperience} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Company</label>
            <input name="company" placeholder="e.g. Google" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Role</label>
            <input name="role" placeholder="e.g. Software Engineer" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Type</label>
            <input name="type" placeholder="e.g. Full-time" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Location</label>
            <input name="location" placeholder="e.g. Jakarta, ID" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
        </div>

        {/* Date Pickers */}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Start Date</label>
            <input name="start_date" type="date" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">End Date</label>
            <input name="end_date" type="date" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
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
          <textarea name="description" placeholder="Brief description..." className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Highlights (1 per line)</label>
          <textarea name="highlights" placeholder="Bullet points..." className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Tags</label>
          <input name="tags" placeholder="e.g. React, Next.js, Design" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
        </div>
        
        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-xl font-bold transition-all mt-2">
          Save Experience
        </button>
      </form>
    </div>
  );
}