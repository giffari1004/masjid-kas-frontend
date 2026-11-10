"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptText,
  FileBarChart,
  LogOut,
  WalletCards,
  Loader2,
} from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Periksa apakah token JWT ada di localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika tidak ada, arahkan paksa ke halaman login
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  // Tampilkan loading sebentar saat memeriksa autentikasi untuk mencegah konten berkedip
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manajemen Transaksi", href: "/transactions", icon: ReceiptText },
    { name: "Laporan & Rekap", href: "/reports/monthly", icon: FileBarChart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigasi Kiri */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-emerald-700 p-2.5 rounded-xl text-white">
            <WalletCards className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-sm">Kas Masjid</h1>
            <p className="text-xs text-slate-400">Panel Bendahara</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-slate-400"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3 md:hidden">
            <div className="bg-emerald-700 p-2 rounded-lg text-white">
              <WalletCards className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-800 text-sm">
              Kas Masjid Al-Ihsan
            </span>
          </div>
          <div className="hidden md:block">
            <h2 className="text-sm font-semibold text-slate-700">
              Sistem Informasi Keuangan Masjid
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-600">
              Admin Bendahara
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
