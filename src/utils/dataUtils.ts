// src/utils/dataUtils.ts
import { SaleRecord, FilterState, DashboardMetrics, MonthlyData, CategoryData, RegionData } from '../types';

export const applyFilters = (data: SaleRecord[], filters: FilterState): SaleRecord[] => {
  return data.filter(record => {
    const recordDate = new Date(record.date);
    const startDate = new Date(filters.dateRange.startDate);
    const endDate = new Date(filters.dateRange.endDate);

    // Date range filter
    if (filters.dateRange.startDate && recordDate < startDate) return false;
    if (filters.dateRange.endDate && recordDate > endDate) return false;

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(record.category)) return false;

    // Region filter
    if (filters.regions.length > 0 && !filters.regions.includes(record.region)) return false;

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        record.customerName.toLowerCase().includes(searchLower) ||
        record.productName.toLowerCase().includes(searchLower) ||
        record.salesRep.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    return true;
  });
};

export const calculateMetrics = (data: SaleRecord[]): DashboardMetrics => {
  const totalSales = data.reduce((sum, record) => sum + record.totalAmount, 0);
  const totalOrders = data.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Find top performing month
  const monthlyTotals = data.reduce((acc, record) => {
    const month = new Date(record.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
    acc[month] = (acc[month] || 0) + record.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  const topPerformingMonth = Object.entries(monthlyTotals)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  return {
    totalSales,
    totalOrders,
    averageOrderValue,
    topPerformingMonth
  };
};

export const getMonthlyData = (data: SaleRecord[]): MonthlyData[] => {
  const monthlyData = data.reduce((acc, record) => {
    const month = new Date(record.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    acc[month] = (acc[month] || 0) + record.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(monthlyData)
    .map(([month, sales]) => ({
      name: month,
      value: sales,
      month,
      sales
    }))
    .sort((a, b) => new Date(a.month + ' 1, 2024').getTime() - new Date(b.month + ' 1, 2024').getTime());
};

export const getCategoryData = (data: SaleRecord[]): CategoryData[] => {
  const categoryData = data.reduce((acc, record) => {
    if (!acc[record.category]) {
      acc[record.category] = { revenue: 0, orders: 0 };
    }
    acc[record.category].revenue += record.totalAmount;
    acc[record.category].orders += 1;
    return acc;
  }, {} as Record<string, { revenue: number; orders: number }>);

  return Object.entries(categoryData).map(([category, data]) => ({
    name: category,
    value: data.revenue,
    category,
    revenue: data.revenue,
    orders: data.orders
  }));
};

export const getRegionData = (data: SaleRecord[]): RegionData[] => {
  const totalRevenue = data.reduce((sum, record) => sum + record.totalAmount, 0);
  
  const regionData = data.reduce((acc, record) => {
    acc[record.region] = (acc[record.region] || 0) + record.totalAmount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(regionData).map(([region, revenue]) => ({
    name: region,
    value: revenue,
    region,
    revenue,
    percentage: totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0
  }));
};