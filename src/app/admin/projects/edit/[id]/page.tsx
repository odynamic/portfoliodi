import { createClient } from "@/utils/supabase-server";
import EditProjectForm from "../../../components/EditProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!project) return <div>Data tidak ditemukan</div>;

  return <EditProjectForm project={project} id={id} />;
}