"use client";
import { useState } from "react";
import { updateExperience } from "@/app/admin/experiences/actions";
import ImageUploader from "@/components/ImageUploader";

export default function EditExperienceForm({ exp, id }: { exp: any; id: string }) {
  const [imageUrl, setImageUrl] = useState(exp.image_url || "");
  
  // Mengambil data awal dari kolom "documentation_images" di database
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    Array.isArray(exp.documentation_images) ? exp.documentation_images : []
  );

  const updateAction = updateExperience.bind(null, id);

  // Fungsi untuk menambah foto baru ke galeri
  const handleAddGalleryImage = (url: string) => {
    if (url && !galleryUrls.includes(url)) {
      setGalleryUrls((prev) => [...prev, url]);
    }
  };

  // Fungsi untuk menghapus foto dari galeri
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

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
            <input name="type" defaultValue={exp.type} placeholder="e.g. Full-time / Internship" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Location</label>
            <input name="location" defaultValue={exp.location} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">Start Date</label>
            <input 
              name="start_date" 
              type="text" 
              defaultValue={exp.start_date || ""} 
              placeholder="e.g. Jan 2023"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase">End Date</label>
            <input 
              name="end_date" 
              type="text" 
              defaultValue={exp.end_date || ""} 
              placeholder="e.g. Present / Dec 2024"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Duration</label>
          <input name="duration" defaultValue={exp.duration} placeholder="e.g. 1 yr 6 mos" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        {/* Media (Company Logo) */}
        <div className="border border-gray-200 p-4 rounded-xl">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Company Logo</label>
          <ImageUploader onUpload={(url) => setImageUrl(url)} />
          <input type="hidden" name="image_url" value={imageUrl} />
          {imageUrl && <img src={imageUrl} className="w-16 h-16 mt-3 object-cover rounded-lg border border-gray-200" alt="Preview" />}
        </div>

        {/* DOCUMENTATION GALLERY UPLOADER */}
        <div className="border border-gray-200 p-4 rounded-xl space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase">Documentation Gallery (Multiple Photos)</label>
          
          <ImageUploader onUpload={handleAddGalleryImage} />
          
          <input type="hidden" name="documentation_images" value={JSON.stringify(galleryUrls)} />

          {galleryUrls.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-gray-100">
              {galleryUrls.map((url, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={url} alt={`Doc ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Info */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
          <textarea name="description" defaultValue={exp.description} className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Highlights (1 per line)</label>
          <textarea name="highlights" defaultValue={Array.isArray(exp.highlights) ? exp.highlights.join("\n") : exp.highlights} className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase">Tags (comma separated)</label>
          <input name="tags" defaultValue={Array.isArray(exp.tags) ? exp.tags.join(", ") : exp.tags} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all mt-2">
          Update Experience
        </button>
      </form>
    </div>
  );
}