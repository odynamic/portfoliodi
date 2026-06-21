import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("DEBUG SUPABASE:", { url, key }); // <--- CEK CONSOLE BROWSER ANDA!

  if (!url || !key) {
    console.error("URGENT: URL atau KEY kosong!");
  }

  return createBrowserClient(url!, key!);
};