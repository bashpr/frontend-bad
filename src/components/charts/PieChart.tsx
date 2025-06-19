import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { RegionData } from '../../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface RegionPieChartProps {
  data: RegionData[];
}

export const RegionPieChart = ({ data }: RegionPieChartProps) => {
  // Debug: Check incoming data
  console.log('PieChart data:', data);

  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  
  // Debug: Check calculated total
  console.log('Total value:', totalValue);

  const formatTooltip = (value: number) => {
    const percentage = (value / totalValue) * 100;
    return `$${value.toLocaleString()} (${percentage.toFixed(1)}%)`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="region"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [formatTooltip(Number(value)), 'Revenue']} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};