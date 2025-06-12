import React from 'react';
import { Filter, X, Calendar } from 'lucide-react';
import { Card, Button, Input, Badge } from '../ui';
import { FilterState } from '../../types';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  hasActiveFilters: boolean;
  resultCount: number;
  totalCount: number;
}

const categoryOptions = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Books', label: 'Books' },
  { value: 'Home', label: 'Home' },
  { value: 'Sports', label: 'Sports' }
];

const regionOptions = [
  { value: 'North', label: 'North' },
  { value: 'South', label: 'South' },
  { value: 'East', label: 'East' },
  { value: 'West', label: 'West' }
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  hasActiveFilters,
  resultCount,
  totalCount
}) => {
  const handleClearFilters = () => {
    onFiltersChange({
      dateRange: { startDate: '', endDate: '' },
      categories: [],
      regions: [],
      searchTerm: ''
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter(r => r !== region);
    
    onFiltersChange({
      ...filters,
      regions: newRegions
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h2>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Search */}
          <Input
            label="Search"
            placeholder="Search customers, products..."
            value={filters.searchTerm}
            onChange={(e) => onFiltersChange({
              ...filters,
              searchTerm: e.target.value
            })}
          />

          {/* Date Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </label>
            <Input
              type="date"
              placeholder="Start date"
              value={filters.dateRange.startDate}
              onChange={(e) => onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, startDate: e.target.value }
              })}
            />
            <Input
              type="date"
              placeholder="End date"
              value={filters.dateRange.endDate}
              onChange={(e) => onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, endDate: e.target.value }
              })}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="space-y-2">
              {categoryOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={filters.categories.includes(option.value)}
                    onChange={(e) => handleCategoryChange(option.value, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Regions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regions
            </label>
            <div className="space-y-2">
              {regionOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={filters.regions.includes(option.value)}
                    onChange={(e) => handleRegionChange(option.value, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Card padding="sm">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {filters.searchTerm && (
              <Badge variant="info" size="sm">Search: {filters.searchTerm}</Badge>
            )}
            {filters.categories.map(category => (
              <Badge key={category} variant="default" size="sm">{category}</Badge>
            ))}
            {filters.regions.map(region => (
              <Badge key={region} variant="default" size="sm">{region}</Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Showing {resultCount} of {totalCount} records
          </p>
        </Card>
      )}
    </div>
  );
};