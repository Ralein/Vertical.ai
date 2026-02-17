'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import KPICard from '@/components/KPICard';
import LeadTable from '@/components/LeadTable';
import SalesTrendChart from '@/components/SalesTrendChart';
import LeadDistributionChart from '@/components/LeadDistributionChart';

interface KPIData {
  totalLeads: number;
  contactedLeads: number;
  salesClosed: number;
  totalRevenue: number;
}

export default function Home() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [leadData, setLeadData] = useState<Record<string, number>>({});
  const [salesData, setSalesData] = useState<Array<{ date: string; revenue: number }>>([]);
  const [dateRange, setDateRange] = useState<number>(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [kpiRes, leadRes, salesRes] = await Promise.all([
        axios.get('/api/kpi'),
        axios.get('/api/leads'),
        axios.get(`/api/sales?days=${dateRange}`)
      ]);

      setKpiData(kpiRes.data);
      setLeadData(leadRes.data);
      setSalesData(salesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your leads and sales performance</p>
        </div>

        <div className="mb-6 flex justify-end">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard title="Total Leads" value={kpiData?.totalLeads || 0} icon="👥" />
          <KPICard title="Contacted Leads" value={kpiData?.contactedLeads || 0} icon="📞" />
          <KPICard title="Sales Closed" value={kpiData?.salesClosed || 0} icon="✅" />
          <KPICard 
            title="Total Revenue" 
            value={`$${(kpiData?.totalRevenue || 0).toLocaleString()}`} 
            icon="💰" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesTrendChart data={salesData} />
          <LeadDistributionChart data={leadData} />
        </div>

        <div className="mb-8">
          <LeadTable data={leadData} />
        </div>
      </div>
    </div>
  );
}
