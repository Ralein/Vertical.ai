'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartData, ChartArea } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useRef, useEffect, useState, useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface QuoteLineChartProps {
    data: Array<{ date: string; revenue: number }>;
}

export default function QuoteLineChart({ data }: QuoteLineChartProps) {
    const chartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: []
    });

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart || !data || data.length === 0) return;

        const labels = data.map(item => item.date);
        const revenues = data.map(item => item.revenue);

        const newChartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenues,
                    backgroundColor: (context: any) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return '#4318FF';
                        return getGradient(ctx, chartArea, '#4318FF', 'rgba(67,24,255,0.35)');
                    },
                    borderRadius: { topLeft: 7, topRight: 7 },
                    borderSkipped: false,
                    barPercentage: 0.55,
                    categoryPercentage: 0.65,
                }
            ]
        };

        setChartData(newChartData);
    }, [data]);

    function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea, colorStart: string, colorEnd: string) {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: '#1A1D3A',
                titleColor: '#ffffff',
                bodyColor: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 10,
                displayColors: true,
                usePointStyle: true,
                titleFont: { family: 'DM Sans', size: 13, weight: 700 },
                bodyFont: { family: 'DM Sans', size: 12, weight: 500 },
                boxPadding: 4,
                callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                    color: '#A3AED0',
                    font: { family: 'DM Sans', size: 11, weight: 600 }
                }
            },
            y: {
                beginAtZero: true,
                border: { display: false },
                grid: { color: 'rgba(163,174,208,0.1)' },
                ticks: {
                    color: '#A3AED0',
                    padding: 10,
                    font: { family: 'DM Sans', size: 10, weight: 500 },
                    callback: function (value: any) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        },
        animation: { duration: 1000, easing: 'easeOutQuart' as const }
    };

    // @ts-ignore
    return <Bar ref={chartRef} data={chartData} options={options} />;
}
