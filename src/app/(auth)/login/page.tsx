"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/auth.schema";
import { useLoginAdmin } from "@/hooks/useAuth";
import { Lock, User, Loader2, Eye, EyeOff, WalletCards } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2026); // Fallback awal yang aman
  const { mutate: login, isPending, error } = useLoginAdmin();

  // Atasi pembacaan new Date() agar aman dari blocking prerender error
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const apiErrorMessage =
    (error as any)?.response?.data?.message ||
    (error ? "Gagal masuk. Periksa kembali username dan password Anda." : null);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all">
        {/* Header Banner / Branding */}
        <div className="bg-emerald-700 p-6 text-white text-center relative">
          <div className="mx-auto bg-emerald-800/60 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner">
            <WalletCards className="w-8 h-8 text-emerald-100" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Kas Masjid Al-Ihsan
          </h1>
          <p className="text-emerald-100 text-sm mt-1">
            Panel Administrasi & Keuangan Bendahara
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Masuk ke Akun
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Masukkan kredensial admin Anda untuk melanjutkan.
            </p>
          </div>

          {/* Error Alert State */}
          {apiErrorMessage && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-2.5">
              <span className="font-semibold">⚠️</span>
              <div className="flex-1">{apiErrorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Masukkan username admin"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.username
                      ? "border-rose-300 focus:ring-rose-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-100"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-rose-600 mt-1.5 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "border-rose-300 focus:ring-rose-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-600 mt-1.5 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses Masuk...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Sistem Informasi Manajemen Keuangan Masjid &copy; {currentYear}
          </p>
        </div>
      </div>
    </main>
  );
}
