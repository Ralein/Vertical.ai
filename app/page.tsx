'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  FileX,
  AlertTriangle,
  PauseCircle,
  FileText,
  ChevronDown,
  Layout
} from 'lucide-react';
import StatsCard from './components/dashboard/StatsCard';
import ConsentDonutChart from './components/dashboard/charts/ConsentDonutChart';
import TppConsentGroup from './components/dashboard/charts/TppConsentGroup';
import QuoteLineChart from './components/dashboard/charts/QuoteLineChart';
import LobDistribution from './components/dashboard/charts/LobDistribution';
import ApiSuccessGauge from './components/dashboard/charts/ApiSuccessGauge';
import LeadTable from '@/components/LeadTable';

interface KPIData {
  totalLeads: number;
  contactedLeads: number;
  salesClosed: number;
  totalRevenue: number;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<number>(7);

  // Real Data States
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [leadData, setLeadData] = useState<Record<string, number>>({});
  const [salesData, setSalesData] = useState<Array<{ date: string; revenue: number }>>([]);

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

  // ── Transform Lead Data for Legend ──────────────────────────────────
  // We need to map the Record<string, number> to the array format expected by the legend
  const leadLegend = Object.entries(leadData).map(([label, value], idx) => {
    const total = Object.values(leadData).reduce((a, b) => a + b, 0);
    const pct = total > 0 ? (value / total) * 100 : 0;

    const colorMap: Record<string, string> = {
      'New': '#4318FF',           // Primary Blue
      'Contacted': '#05CD99',     // Accent Green
      'Follow Up': '#FF8F0C',     // Warning Orange
      'Appointment Booked': '#2B3674', // Navy
      'Converted': '#FFCA28',     // Yellow
      'Lost': '#FF5252'           // Danger Red
    };

    return {
      label,
      value,
      color: colorMap[label] || '#A3AED0',
      pct
    };
  });


  // ── Static/Mock Data for visual completeness (as originally requested) ──
  // These parts did not have a backend source in the original code, so we keep them static or mock for now
  // to maintain the requested "Neon" aesthetic layout.

  // ── LOB Distribution Data (Static for now)
  const lobData = [
    { label: 'MOTOR', value: 65, count: '3,133', color: '#4318FF', gradient: 'linear-gradient(90deg, #4318FF, #6AD2FF)' },
    { label: 'TRAVEL', value: 20, count: '964', color: '#05CD99', gradient: 'linear-gradient(90deg, #05CD99, #00E5B4)' },
    { label: 'MEDICAL', value: 10, count: '482', color: '#FF8F0C', gradient: 'linear-gradient(90deg, #FF8F0C, #FFCA28)' },
    { label: 'HOME', value: 10, count: '241', color: '#2B3674', gradient: 'linear-gradient(90deg, #2B3674, #4318FF)' },
  ];

  // ── TPP Groups Data (Static for now)
  const tppGroups = [
    {
      label: 'TPP Client Test', total: 510, active: true,
      segments: [
        { label: 'Authorized', value: 360, color: '#4318FF', pct: (360 / 510) * 100 },
        { label: 'Revoked', value: 50, color: '#FA9E93', pct: (50 / 510) * 100 },
        { label: 'Rejected', value: 40, color: '#EE5D50', pct: (40 / 510) * 100 },
        { label: 'Awaiting', value: 30, color: '#2B3674', pct: (30 / 510) * 100 },
        { label: 'Expired', value: 20, color: '#FFCA28', pct: (20 / 510) * 100 },
        { label: 'Suspended', value: 10, color: '#E2E8F0', pct: (10 / 510) * 100 },
      ]
    },
    {
      label: 'Open Finance Corp', total: 318, active: true,
      segments: [
        { label: 'Authorized', value: 210, color: '#4318FF', pct: (210 / 318) * 100 },
        { label: 'Revoked', value: 30, color: '#FA9E93', pct: (30 / 318) * 100 },
        { label: 'Rejected', value: 28, color: '#EE5D50', pct: (28 / 318) * 100 },
        { label: 'Awaiting', value: 25, color: '#2B3674', pct: (25 / 318) * 100 },
        { label: 'Expired', value: 15, color: '#FFCA28', pct: (15 / 318) * 100 },
        { label: 'Suspended', value: 10, color: '#E2E8F0', pct: (10 / 318) * 100 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent p-5">
      <div className="flex flex-col gap-5 max-w-[1600px] mx-auto">

        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-[#2B3674] tracking-tight">Sales Dashboard</h1>
            <p className="text-[#A3AED0] text-sm font-medium">Track your leads and sales performance</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm">
            <div className="relative group">
              <select
                className="glass-input pl-3 pr-8 py-1.5 cursor-pointer hover:bg-gray-50 appearance-none"
                value={dateRange}
                onChange={(e) => setDateRange(Number(e.target.value))}
              >
                <option value={7}>Last 7 Days</option>
                <option value={30}>Last 30 Days</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mapped to Real KPI Data */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Leads"
            count={kpiData?.totalLeads || 0}
            icon={<Users size={24} />}
            iconBgColor="bg-[#F4F7FE]"
            iconColor="text-[#4318FF]"
            loading={loading}
          />
          <StatsCard
            title="Contacted Leads"
            count={kpiData?.contactedLeads || 0}
            icon={<FileText size={24} />}
            iconBgColor="bg-[#FFF8F1]"
            iconColor="text-[#FF8F0C]"
            loading={loading}
          />
          <StatsCard
            title="Sales Closed"
            count={kpiData?.salesClosed || 0}
            icon={<AlertTriangle size={24} />} // Using alert icon but green for success, or user might prefer check
            iconBgColor="bg-[#E6FFFA]"
            iconColor="text-[#05CD99]"
            loading={loading}
          />
          <StatsCard
            title="Total Revenue"
            count={`$${(kpiData?.totalRevenue || 0).toLocaleString()}`}
            icon={<PauseCircle size={24} />} // Placeholder icon
            iconBgColor="bg-[#F3E8FF]"
            iconColor="text-[#A020F0]"
            loading={loading}
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">

          {/* 1. Lead/Consent Analysis (Mapped to Real Lead Data) */}
          <div className="chart-shell p-5 col-span-1 lg:col-span-2 flex flex-col h-[360px] animate-fade-slide-up" style={{ animationDelay: '0s' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-[#2B3674] leading-tight">Lead Distribution</h3>
                <p className="text-xs text-[#A3AED0] font-medium mt-0.5">Breakdown by current status</p>
              </div>
              <span className="live-badge">Live</span>
            </div>
            <div className="flex-1 relative flex items-center">
              <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
                <ConsentDonutChart data={leadData} />
              </div>
              <div className="flex flex-col gap-2 ml-6 flex-1 overflow-y-auto max-h-[250px] pr-2">
                {leadLegend.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between cursor-default">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: item.color }}></span>
                      <span className="text-xs font-semibold text-[#2B3674]">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2B3674]">{item.value}</span>
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.pct}%`, background: item.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Quote/Sales Trend (Mapped to Real Sales Data) */}
          <div className="chart-shell accent-green p-5 col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col h-[360px] animate-fade-slide-up" style={{ animationDelay: '0.16s' }}>
            <div className="flex justify-between items-center mb-1">
              <div>
                <h3 className="text-base font-bold text-[#2B3674] leading-tight">Sales Trend</h3>
                <p className="text-xs text-[#A3AED0] font-medium mt-0.5">Revenue over time</p>
              </div>
            </div>

            <div className="flex-1 relative w-full min-h-0">
              <QuoteLineChart data={salesData} />
            </div>
          </div>

          {/* 3. TPP / Extra Placeholder (Static) */}
          <div className="chart-shell accent-navy p-5 col-span-1 lg:col-span-2 flex flex-col h-[360px] animate-fade-slide-up" style={{ animationDelay: '0.08s' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-[#2B3674] leading-tight">Details</h3>
                <p className="text-xs text-[#A3AED0] font-medium mt-0.5">Detailed Breakdown</p>
              </div>
            </div>
            <LeadTable data={leadData} />
          </div>

          {/* 5. API Success (Static Visual Placeholder) */}
          <div
            className="chart-shell p-5 col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col h-[360px] animate-fade-slide-up"
            style={{
              background: 'linear-gradient(160deg,#0F1232 0%,#1A1D3A 100%)',
              animationDelay: '0.32s'
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-base font-bold text-white leading-tight">API Success</h3>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Real-time · SLA 99.9%</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(66,205,126,0.12)', border: '1px solid rgba(66,205,126,0.25)' }}>
                <span className="api-pulse-dot"></span>
                <span className="text-[10px] font-bold tracking-wider" style={{ color: '#42CD7E' }}>HEALTHY</span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <ApiSuccessGauge />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
