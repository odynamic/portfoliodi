import { createClient } from "@/utils/supabase-server";
import EditTechForm from "../../../components/EditTechPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: tech, error } = await supabase
    .from("technologies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !tech) {
    return <div className="p-8 text-center text-gray-500">Data tidak ditemukan.</div>;
  }

  return <EditTechForm tech={tech} id={id} />;
}