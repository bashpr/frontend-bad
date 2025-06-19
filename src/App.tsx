import { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Search,
  LineChart as LineChartIcon,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { mockSalesData } from './data/mockSalesData';
import type { FilterState } from './types';
import { applyFilters, calculateMetrics, getMonthlyData, getCategoryData, getRegionData } from './utils/dataUtils';
import { SalesLineChart } from './components/charts/LineChart';
import { CategoryBarChart } from './components/charts/BarChart';
import { RegionPieChart } from './components/charts/PieChart';
import { FilterPanel } from './components/filters/FilterPanel';

const initialFilters: FilterState = {
  dateRange: { startDate: '', endDate: '' },
  categories: [],
  regions: [],
  searchTerm: ''
};


interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  formatValue?: (value: number) => string;
}

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
    return !!filters.searchTerm || 
           !!filters.dateRange.startDate || 
           !!filters.dateRange.endDate ||
           filters.categories.length > 0 ||
           filters.regions.length > 0;
  }, [filters]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const MetricCard = ({ title, value, icon: Icon, formatValue }: MetricCardProps) => {
    const displayValue = formatValue && typeof value === 'number' 
      ? formatValue(value) 
      : value;
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Sales" 
            value={metrics.totalSales} 
            icon={DollarSign}
            formatValue={formatCurrency}
          />
          <MetricCard 
            title="Total Orders" 
            value={metrics.totalOrders}
            icon={ShoppingCart}
          />
          <MetricCard 
            title="Avg Order Value" 
            value={metrics.averageOrderValue}
            icon={Package}
            formatValue={formatCurrency}
          />
          <MetricCard 
            title="Top Month" 
            value={metrics.topPerformingMonth}
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={filteredData.length}
              totalCount={mockSalesData.length}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <LineChartIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Sales Trend</h3>
                </div>
                <div className="h-80">
                  <SalesLineChart data={getMonthlyData(filteredData)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
                  </div>
                  <div className="h-64">
                    <CategoryBarChart data={getCategoryData(filteredData)} />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChartIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Revenue by Region</h3>
                  </div>
                  <div className="h-64">
                    <RegionPieChart data={getRegionData(filteredData)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                onClick={() => setFilters(initialFilters)}
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
