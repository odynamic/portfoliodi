"use server";

import { createClient } from "@/utils/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper untuk mengambil data dari FormData
const getTechData = (formData: FormData) => ({
  name: formData.get("name") as string,
  category: formData.get("category") as string,
  desc: formData.get("desc") as string,
  img_url: formData.get("img_url") as string,
});

export async function addTechnology(formData: FormData) {
  const supabase = await createClient();
  const data = getTechData(formData);

  const { error } = await supabase.from("technologies").insert([data]);

  if (error) {
    console.error("Error adding technology:", error);
    throw new Error("Gagal menyimpan teknologi baru.");
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function updateTechnology(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = getTechData(formData);

  const { error } = await supabase
    .from("technologies")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error updating technology:", error);
    throw new Error("Gagal mengupdate data teknologi.");
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function deleteTechnology(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("technologies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting technology:", error);
    throw new Error("Gagal menghapus teknologi.");
  }

  revalidatePath("/admin/technologies");
}