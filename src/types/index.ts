// src/types/index.ts
export interface SaleRecord {
  id: string;
  date: string; // ISO date string
  customerName: string;
  productName: string;
  category: 'Electronics' | 'Clothing' | 'Books' | 'Home' | 'Sports';
  region: 'North' | 'South' | 'East' | 'West';
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  salesRep: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface MonthlyData extends ChartDataPoint {
  month: string;
  sales: number;
}

export interface CategoryData extends ChartDataPoint {
  category: string;
  revenue: number;
  orders: number;
}

export interface RegionData extends ChartDataPoint {
  region: string;
  revenue: number;
  percentage: number;
}

export interface FilterState {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  categories: string[];
  regions: string[];
  searchTerm: string;
}

export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topPerformingMonth: string;
}
