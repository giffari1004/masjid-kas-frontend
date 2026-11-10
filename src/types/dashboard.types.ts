export interface DashboardSummaryData {
  totalBalance: number;
  totalIncomeMonth: number;
  totalExpenseMonth: number;
  recentTransactions?: {
    id: string;
    date: string;
    type: "IN" | "OUT";
    category: string;
    amount: number;
    description: string;
  }[];
}

export interface DashboardSummaryResponse {
  status: string;
  message: string;
  data: DashboardSummaryData;
}
