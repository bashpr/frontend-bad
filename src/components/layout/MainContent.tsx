import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({ children, className = '' }) => {
  return (
    <main className={`space-y-6 ${className}`}>
      {children}
    </main>
  );
};

