import { createClient } from "@/utils/supabase-server";
import EditExperienceForm from "@/app/admin/components/EditExperienceForm";

// 1. Ubah tipe params menjadi Promise
export default async function EditExperiencePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const supabase = await createClient();
  
  // 2. Await params sebelum mengakses id
  const { id } = await params;

  const { data: exp, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !exp) {
    return <div>Experience not found</div>;
  }

  return <EditExperienceForm exp={exp} id={id} />;
}