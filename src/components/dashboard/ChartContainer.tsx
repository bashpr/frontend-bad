import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  actions?: React.ReactNode;
  height?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  icon: Icon,
  children,
  actions,
  height = 'h-80'
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-gray-600" />}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className={height}>
        {children}
      </div>
    </Card>
  );
};
