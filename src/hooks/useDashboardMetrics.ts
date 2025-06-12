import { useMemo } from 'react';
import { SaleRecord, DashboardMetrics } from '../types';
import { calculateMetrics } from '../utils/dataUtils';

export const useDashboardMetrics = (data: SaleRecord[]): DashboardMetrics => {
  return useMemo(() => calculateMetrics(data), [data]);
};