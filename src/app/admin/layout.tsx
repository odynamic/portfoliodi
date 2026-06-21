// app/admin/layout.tsx
import { Sidebar } from "./components/Sidebar";

// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tambahkan 'fixed inset-0' untuk memastikan dia menempel ke seluruh layar
    <div className="fixed inset-0 flex h-full w-full bg-[#F8FAFC] dark:bg-[#0f172a]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}