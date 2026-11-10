export interface LoginResponse {
  status: string;
  message: string;
  data?: {
    token: string;
    username?: string;
  };
  token?: string; // Fallback jika struktur token langsung di root data
}
