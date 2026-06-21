"use server";
import { createClient } from "@/utils/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper untuk mengambil data dari form
const getExpData = (formData: FormData) => ({
  company: formData.get("company"),
  role: formData.get("role"),
  type: formData.get("type"),
  location: formData.get("location"),
  start_date: formData.get("start_date"),
  end_date: formData.get("end_date"),
  description: formData.get("description"),
  image_url: formData.get("image_url"), // URL Gambar disimpan di sini
  highlights: (formData.get("highlights") as string)?.split("\n").filter(Boolean),
  tags: (formData.get("tags") as string)?.split(",").map(t => t.trim()).filter(Boolean),
});

export async function addExperience(formData: FormData) {
  const supabase = await createClient();
  
  // Menggunakan helper getExpData yang sama agar konsisten
  const { error } = await supabase
    .from("experiences")
    .insert([getExpData(formData)]);

  if (!error) {
    revalidatePath("/admin/experiences"); // Refresh halaman list admin
    revalidatePath("/experience");       // Refresh halaman user agar data baru muncul
    redirect("/admin/experiences");
  } else {
    console.error("Gagal menambah data:", error);
  }
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("experiences")
    .update(getExpData(formData))
    .eq("id", id);

  if (!error) {
    // Revalidate kedua halaman agar data baru langsung muncul
    revalidatePath("/admin/experiences"); 
    revalidatePath("/experience"); // <-- Ganti dengan path halaman user Anda
    revalidatePath("/");          // <-- Tambahkan jika pengalaman muncul di homepage
    
    redirect("/admin/experiences");
  } else {
    console.error("Update error:", error);
  }
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/admin/experiences");
  revalidatePath("/experience");
}