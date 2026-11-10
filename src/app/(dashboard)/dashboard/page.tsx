"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useDashboardSummary } from "@/hooks/useDashboard";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const [selectedMonth] = useState<string>("");
  const [selectedYear] = useState<string>("");

  const {
    data: summary,
    isLoading,
    error,
  } = useDashboardSummary(selectedMonth, selectedYear);

  // Format ke Rupiah standar Indonesia
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard Keuangan
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Ringkasan total saldo dan rekapitulasi kas masjid.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm text-sm text-slate-600">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>
              Periode:{" "}
              <strong className="text-slate-800">Bulan Berjalan</strong>
            </span>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
            Gagal memuat data ringkasan dashboard. Pastikan backend aktif.
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat Cards Grid (Responsive 1 to 3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Saldo Keseluruhan */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Saldo Kas
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">
                    {formatRupiah(summary?.totalBalance ?? 0)}
                  </h3>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-2 inline-block">
                    Real-time Balance
                  </span>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>

              {/* Total Pemasukan Bulan Ini */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pemasukan Bulan Ini
                  </p>
                  <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                    {formatRupiah(summary?.totalIncomeMonth ?? 0)}
                  </h3>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-2 flex items-center gap-1 w-fit">
                    <TrendingUp className="w-3.5 h-3.5" /> Kas Masuk (IN)
                  </span>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <ArrowDownLeft className="w-6 h-6" />
                </div>
              </div>

              {/* Total Pengeluaran Bulan Ini */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pengeluaran Bulan Ini
                  </p>
                  <h3 className="text-2xl font-bold text-rose-600 mt-1">
                    {formatRupiah(summary?.totalExpenseMonth ?? 0)}
                  </h3>
                  <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md mt-2 flex items-center gap-1 w-fit">
                    <TrendingDown className="w-3.5 h-3.5" /> Kas Keluar (OUT)
                  </span>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-6">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">
                  Aktivitas Transaksi Terbaru
                </h3>
              </div>

              {!summary?.recentTransactions ||
              summary.recentTransactions.length === 0 ? (
                /* Empty State */
                <div className="p-12 text-center">
                  <p className="text-sm text-slate-500">
                    Belum ada data transaksi tercatat pada periode ini.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-semibold uppercase text-xs">
                        <th className="p-4">Tanggal</th>
                        <th className="p-4">Tipe</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Keterangan</th>
                        <th className="p-4 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {summary.recentTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-4 font-medium">{tx.date}</td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                tx.type === "IN"
                                  ? "text-emerald-600 bg-emerald-50"
                                  : "text-rose-600 bg-rose-50"
                              }`}
                            >
                              {tx.type === "IN" ? "Pemasukan" : "Pengeluaran"}
                            </span>
                          </td>
                          <td className="p-4 font-medium">{tx.category}</td>
                          <td className="p-4 text-slate-500">
                            {tx.description}
                          </td>
                          <td
                            className={`p-4 text-right font-bold ${
                              tx.type === "IN"
                                ? "text-emerald-600"
                                : "text-rose-600"
                            }`}
                          >
                            {tx.type === "IN" ? "+" : "-"}{" "}
                            {formatRupiah(tx.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
