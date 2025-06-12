// src/App.tsx - WORKING SIMPLIFIED VERSION
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Search,
  Filter,
  Calendar,
  X,
  LineChart,
  BarChart3,
  PieChart
} from 'lucide-react';

// Import your data and types
import { mockSalesData } from './data/mockSalesData';
import { FilterState } from './types';
import { applyFilters, calculateMetrics } from './utils/dataUtils';

const initialFilters: FilterState = {
  dateRange: { startDate: '', endDate: '' },
  categories: [],
  regions: [],
  searchTerm: ''
};

const categoryOptions = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
const regionOptions = ['North', 'South', 'East', 'West'];

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  const filteredData = useMemo(() => 
    applyFilters(mockSalesData, filters), 
    [filters]
  );
  
  const metrics = useMemo(() => 
    calculateMetrics(filteredData), 
    [filteredData]
  );

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm || 
           filters.dateRange.startDate || 
           filters.dateRange.endDate ||
           filters.categories.length > 0 ||
           filters.regions.length > 0;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    setFilters(prev => ({ ...prev, categories: newCategories }));
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter(r => r !== region);
    
    setFilters(prev => ({ ...prev, regions: newRegions }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600 ml-11">
            Monitor your sales performance with interactive charts and real-time data
          </p>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.totalSales)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.averageOrderValue)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Top Month */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Top Month</p>
                <p className="text-lg font-bold text-gray-900">{metrics.topPerformingMonth}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button 
                    onClick={handleClearFilters}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Search customers, products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      searchTerm: e.target.value 
                    }))}
                  />
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date Range
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.dateRange.startDate}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, startDate: e.target.value }
                    }))}
                  />
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.dateRange.endDate}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, endDate: e.target.value }
                    }))}
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categoryOptions.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={filters.categories.includes(category)}
                          onChange={(e) => handleCategoryChange(category, e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
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
                    {regionOptions.map(region => (
                      <label key={region} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={filters.regions.includes(region)}
                          onChange={(e) => handleRegionChange(region, e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button 
                    onClick={handleClearFilters}
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {filters.searchTerm && (
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Search: {filters.searchTerm}
                    </span>
                  )}
                  {filters.categories.map(category => (
                    <span key={category} className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {category}
                    </span>
                  ))}
                  {filters.regions.map(region => (
                    <span key={region} className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {region}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Showing {filteredData.length} of {mockSalesData.length} records
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Monthly Sales Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <LineChart className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Sales Trend</h3>
                </div>
                <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Line Chart Implementation</p>
                    <p className="text-sm text-gray-400">Use Recharts LineChart component</p>
                  </div>
                </div>
              </div>

              {/* Secondary Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
                  </div>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Bar Chart</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChart className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Revenue by Region</h3>
                  </div>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <PieChart className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Pie Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Records</h3>
                <p className="text-sm text-gray-500">
                  {filteredData.length} records {hasActiveFilters && `(filtered from ${mockSalesData.length})`}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.slice(0, 10).map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                        record.category === 'Electronics' ? 'bg-blue-100 text-blue-800' :
                        record.category === 'Clothing' ? 'bg-yellow-100 text-yellow-800' :
                        record.category === 'Books' ? 'bg-green-100 text-green-800' :
                        record.category === 'Sports' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {record.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(record.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or clearing some filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {filteredData.length > 10 && (
            <div className="px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
              Showing first 10 of {filteredData.length} records
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}

export default App;