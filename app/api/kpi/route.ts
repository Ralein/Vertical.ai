import { NextResponse } from 'next/server';
import leadsData from '@/data/leads.json';
import salesData from '@/data/sales.json';

export async function GET() {
  const totalLeads = leadsData.length;
  const contactedLeads = leadsData.filter(lead => lead.status !== 'New').length;
  const salesClosed = leadsData.filter(lead => lead.status === 'Converted').length;
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);

  return NextResponse.json({
    totalLeads,
    contactedLeads,
    salesClosed,
    totalRevenue
  });
}
