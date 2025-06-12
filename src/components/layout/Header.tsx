import React from 'react';
import { TrendingUp } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-100 rounded-lg">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      {subtitle && (
        <p className="text-gray-600 ml-11">{subtitle}</p>
      )}
    </header>
  );
};