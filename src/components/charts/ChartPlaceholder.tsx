import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChartPlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  height?: string;
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  icon: Icon,
  title,
  description,
  height = 'h-full'
}) => {
  return (
    <div className={`flex items-center justify-center ${height} border-2 border-dashed border-gray-200 rounded-lg`}>
      <div className="text-center">
        <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};