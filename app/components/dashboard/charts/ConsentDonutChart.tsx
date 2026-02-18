'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React, { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// ─── Custom Plugin: Neon Glow Shadow ───────────────────────────────────────
const neonGlowPlugin: Plugin<'doughnut'> = {
    id: 'neonGlow',
    beforeDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        ctx.shadowBlur = 0;
        ctx.restore();
    }
};

// ─── Custom Plugin: Donut Center Text ─────────────────────────────────────
const donutCenterTextPlugin: Plugin<'doughnut'> = {
    id: 'donutCenterText',
    afterDraw(chart, args, options) {
        // @ts-ignore
        const text = options?.text || '';
        // @ts-ignore
        const sub = options?.sub || '';

        if (!text) return;
        const { ctx, chartArea: { top, bottom, left, right } } = chart;
        const cx = (left + right) / 2;
        const cy = (top + bottom) / 2;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `700 28px "DM Sans", sans-serif`;
        ctx.fillStyle = '#2B3674';
        ctx.fillText(text, cx, cy - 10);
        ctx.font = `500 11px "DM Sans", sans-serif`;
        ctx.fillStyle = '#A3AED0';
        ctx.fillText(sub, cx, cy + 14);
        ctx.restore();
    }
};

const optionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
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
            callbacks: { label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}` }
        },
        neonGlow: {},
        donutCenterText: { text: '0', sub: 'total' }
    },
    animation: { duration: 900, easing: 'easeOutQuart' as const }
};

interface ConsentDonutChartProps {
    data: Record<string, number>;
}

export default function ConsentDonutChart({ data }: ConsentDonutChartProps) {
    const { chartData, total } = useMemo(() => {
        const labels = Object.keys(data);
        const values = Object.values(data);
        const totalCount = values.reduce((a, b) => a + b, 0);

        // Map statuses to specific colors, fallback to a palette if needed
        const colorMap: Record<string, string> = {
            'New': '#4318FF',           // Primary Blue
            'Contacted': '#05CD99',     // Accent Green
            'Follow Up': '#FF8F0C',     // Warning Orange
            'Appointment Booked': '#2B3674', // Navy
            'Converted': '#FFCA28',     // Yellow
            'Lost': '#FF5252'           // Danger Red
        };

        const backgroundColors = labels.map(label => colorMap[label] || '#A3AED0');

        return {
            chartData: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 3,
                    hoverBorderWidth: 0,
                    hoverOffset: 8,
                }]
            },
            total: totalCount
        };
    }, [data]);

    const options = {
        ...optionsBase,
        plugins: {
            ...optionsBase.plugins,
            donutCenterText: { text: total.toString(), sub: 'Leads' }
        }
    };

    // @ts-ignore
    return <Doughnut data={chartData} options={options} plugins={[neonGlowPlugin, donutCenterTextPlugin]} />;
}
