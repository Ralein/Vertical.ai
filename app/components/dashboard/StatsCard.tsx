import { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatsCardProps {
  title: string;
  count: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  loading?: boolean;
}

export default function StatsCard({ title, count, icon, iconBgColor, iconColor, loading = false }: StatsCardProps) {
  return (
    <div className="chart-shell p-4 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-[#A3AED0] text-sm font-medium">{title}</span>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <span className="text-[#2B3674] text-2xl font-bold tracking-tight">{count}</span>
        )}
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
    </div>
  );
}
