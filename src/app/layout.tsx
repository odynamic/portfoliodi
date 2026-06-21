// app/layout.tsx

import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import NavbarWrapper from "@/components/layout/NavbarWrapper"; 
// @ts-ignore
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} antialiased bg-white dark:bg-[#0A0F1D] transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NavbarWrapper /> 
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}