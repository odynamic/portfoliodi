import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase-client"; 

// Tipe data T di bawah artinya hook ini fleksibel (bisa untuk tabel apapun)
export function usePortfolioData<T = any>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Menggunakan useMemo agar client tidak dibuat ulang saat re-render
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Ini kuncinya: tabel yang mau diambil dikirim sebagai parameter
        const { data: fetchedData, error } = await supabase.from(tableName).select("*");
        
        if (error) {
          console.error(`Error fetching from ${tableName}:`, error);
        } else {
          setData(fetchedData || []);
        }
      } catch (err) {
        console.error("Unexpected Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName, supabase]); // Efek ini jalan setiap kali tableName ganti

  return { data, loading };
}