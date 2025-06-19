// src/components/charts/BarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CategoryData } from '../../types';

interface CategoryBarChartProps {
  data: CategoryData[];
}

interface CustomBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

export const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data }) => {
  // Custom colors for each category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Electronics': return '#3b82f6'; // blue
      case 'Clothing': return '#f59e0b'; // amber
      case 'Books': return '#10b981'; // emerald
      case 'Home': return '#8b5cf6'; // violet
      case 'Sports': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  // Custom bar shape with proper TypeScript typing
  const renderCustomBar = (props: any) => {
    const { x, y, width, height, name } = props as CustomBarProps;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={getCategoryColor(name)}
        rx={4} // border radius
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6b7280' }}
          tickLine={{ stroke: '#6b7280' }}
        />
        <YAxis 
          tick={{ fill: '#6b7280' }}
          tickLine={{ stroke: '#6b7280' }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
          labelFormatter={(label) => `Category: ${label}`}
        />
        <Bar 
          dataKey="value"
          name="Revenue"
          shape={renderCustomBar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};