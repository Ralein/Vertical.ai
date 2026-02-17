import { NextResponse } from 'next/server';
import leadsData from '@/data/leads.json';

export async function GET() {
  const statusCounts = leadsData.reduce((acc: Record<string, number>, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json(statusCounts);
}
