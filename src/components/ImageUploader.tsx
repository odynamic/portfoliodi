"use client";
import { createClient } from "@/utils/supabase-client";
import { useState } from "react";

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    // 1. Upload ke bucket 'portfoliodi' (huruf kecil)
    const { error: uploadError } = await supabase.storage
      .from("portfoliodi") 
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Gagal upload: " + uploadError.message);
    } else {
      // 2. Ambil URL dari bucket 'portfoliodi' (huruf kecil)
      const { data } = supabase.storage
        .from("portfoliodi")
        .getPublicUrl(filePath);
      
      onUpload(data.publicUrl);
    }
    setUploading(false);
  }

  return (
    <input type="file" onChange={handleUpload} disabled={uploading} className="border p-2 w-full" />
  );
}