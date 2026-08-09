"use server";
import { createClient } from "@/utils/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getProjectData = (formData: FormData, isUpdate = false) => {
  const featuresRaw = formData.get("features") as string;
  const techStackRaw = formData.get("tech_stack") as string;

  const data: any = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    role: formData.get("role"),
    overview: formData.get("overview"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    challenges: formData.get("challenges"),
    learnings: formData.get("learnings"),
    live_url: formData.get("live_url"),
    github_url: formData.get("github_url"),
    image_url: formData.get("image_url"),
    features: featuresRaw ? featuresRaw.split("\n").map(f => f.trim()).filter(Boolean) : [],
    tech_stack: techStackRaw ? techStackRaw.split(",").map(t => t.trim()).filter(Boolean) : [],
  };

  // Jika ini adalah proses update, masukkan waktu saat ini ke updated_at
  if (isUpdate) {
    data.updated_at = new Date().toISOString();
  }

  return data;
};

export async function addProject(formData: FormData) {
  const supabase = await createClient();
  // Mengirim data tanpa update_at khusus (biar default database / created_at yang handle)
  const { error } = await supabase.from("projects").insert([getProjectData(formData, false)]);
  
  if (error) {
    console.error("Error adding project:", error);
    throw new Error("Gagal menambah project");
  }
  
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  // Mengirim data dengan parameter true agar updated_at terisi waktu sekarang
  const { error } = await supabase.from("projects").update(getProjectData(formData, true)).eq("id", id);
  
  if (error) {
    console.error("Error updating project:", error);
    throw new Error("Gagal mengupdate project");
  }
  
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting project:", error);
    throw new Error("Gagal menghapus project");
  }
  
  revalidatePath("/admin/projects");
}