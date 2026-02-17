import { NextResponse } from 'next/server';
import salesData from '@/data/sales.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '7');

  const today = new Date('2026-02-17');
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days);

  const filteredSales = salesData.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate >= startDate && saleDate <= today;
  });

  const revenueByDate = filteredSales.reduce((acc: Record<string, number>, sale) => {
    acc[sale.date] = (acc[sale.date] || 0) + sale.amount;
    return acc;
  }, {});

  const result = Object.entries(revenueByDate)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return NextResponse.json(result);
}
