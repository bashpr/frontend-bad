import { useState, useMemo } from 'react';
import { FilterState, SaleRecord } from '../types';
import { applyFilters } from '../utils/dataUtils';

const initialFilters: FilterState = {
  dateRange: {
    startDate: '',
    endDate: ''
  },
  categories: [],
  regions: [],
  searchTerm: ''
};

export const useFilters = (data: SaleRecord[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredData = useMemo(() => 
    applyFilters(data, filters), 
    [data, filters]
  );

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm || 
           filters.dateRange.startDate || 
           filters.dateRange.endDate ||
           filters.categories.length > 0 ||
           filters.regions.length > 0;
  }, [filters]);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters,
    filteredData,
    hasActiveFilters,
    clearFilters
  };
};