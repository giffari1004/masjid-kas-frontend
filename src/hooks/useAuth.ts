import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types/auth.types";

export function useLoginAdmin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials,
      );
      return response.data;
    },
    onSuccess: (response) => {
      // Ambil token dari respons backend (sesuaikan dengan struktur endpoint /api/auth/login)
      const token = response.data?.token || response.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      // Redirect ke halaman dashboard utama setelah sukses
      router.push("/dashboard");
    },
  });
}
