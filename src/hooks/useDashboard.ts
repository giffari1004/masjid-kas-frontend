import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { DashboardSummaryResponse } from "@/types/dashboard.types";

export function useDashboardSummary(month?: string, year?: string) {
  return useQuery({
    queryKey: ["dashboard-summary", month, year],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await api.get<DashboardSummaryResponse>(
        `/dashboard/summary?${params.toString()}`,
      );
      return response.data.data;
    },
  });
}
