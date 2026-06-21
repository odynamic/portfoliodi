"use client";
import { useState } from "react";
import { addProject } from "../actions";
import ImageUploader from "@/components/ImageUploader";

export default function AddProject() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Add New Project</h2>
      <form action={addProject} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Title</label><input name="title" className="w-full border border-gray-200 p-3 rounded-xl" required /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Slug</label><input name="slug" className="w-full border border-gray-200 p-3 rounded-xl" required /></div>
        </div>
        <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Role</label><input name="role" className="w-full border border-gray-200 p-3 rounded-xl" required /></div>
        
        <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Overview</label><textarea name="overview" className="w-full border border-gray-200 p-3 rounded-xl h-24" required /></div>
        
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Problem</label><textarea name="problem" className="w-full border border-gray-200 p-3 rounded-xl h-24" /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Solution</label><textarea name="solution" className="w-full border border-gray-200 p-3 rounded-xl h-24" /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Challenges</label><textarea name="challenges" className="w-full border border-gray-200 p-3 rounded-xl h-24" /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Learnings</label><textarea name="learnings" className="w-full border border-gray-200 p-3 rounded-xl h-24" /></div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Live URL</label><input name="live_url" className="w-full border border-gray-200 p-3 rounded-xl" /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">GitHub URL</label><input name="github_url" className="w-full border border-gray-200 p-3 rounded-xl" /></div>
        </div>

        <div className="border border-gray-200 p-4 rounded-xl">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Project Image</label>
          <ImageUploader onUpload={(url) => setImageUrl(url)} />
          <input type="hidden" name="image_url" value={imageUrl} />
          {imageUrl && <img src={imageUrl} className="w-24 h-16 mt-3 object-cover rounded-lg border" alt="Preview" />}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Features (1 per line)</label><textarea name="features" className="w-full border border-gray-200 p-3 rounded-xl h-24" /></div>
          <div className="space-y-1"><label className="text-xs font-bold text-gray-700 uppercase">Tech Stack (comma separated)</label><textarea name="tech_stack" className="w-full border border-gray-200 p-3 rounded-xl h-24" /></div>
        </div>
        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-xl font-bold transition-all">Save Project</button>
      </form>
    </div>
  );
}