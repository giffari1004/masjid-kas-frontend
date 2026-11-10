import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers"; // <-- Import Providers

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manajemen Kas Masjid",
  description: "Sistem Informasi Keuangan Masjid Al-Ihsan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Bungkus children dengan Providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
