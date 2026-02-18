'use client';

import React, { useRef, useEffect } from 'react';

export default function ApiSuccessGauge() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const size = 220;

        // Set display size
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = size * dpr;
        canvas.height = size * dpr;

        // Normalize coordinate system to use css pixels.
        ctx.scale(dpr, dpr);

        const cx = size / 2, cy = size / 2, r = 80, trackW = 14;
        const startAngle = Math.PI * 0.75, fullSweep = Math.PI * 1.5;
        const targetPct = 0.942, failPct = 1 - targetPct;
        const duration = 1400, startTime = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const ticks = [0, 0.25, 0.5, 0.75, 1];

        let animationFrameId: number;

        const draw = (now: number) => {
            const progress = Math.min(ease((now - startTime) / duration), 1);
            const sp = progress * targetPct;
            ctx.clearRect(0, 0, size, size);

            // Glow ring
            const glowGrad = ctx.createRadialGradient(cx, cy, r - 20, cx, cy, r + 20);
            glowGrad.addColorStop(0, 'rgba(66,205,126,0.0)');
            glowGrad.addColorStop(0.5, 'rgba(66,205,126,0.06)');
            glowGrad.addColorStop(1, 'rgba(66,205,126,0.0)');
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = glowGrad; ctx.lineWidth = 30; ctx.stroke();

            // Track
            ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, startAngle + fullSweep);
            ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

            // Failure arc
            const failEnd = startAngle + fullSweep;
            ctx.beginPath(); ctx.arc(cx, cy, r, failEnd - failPct * fullSweep, failEnd);
            ctx.strokeStyle = 'rgba(238,93,80,0.55)'; ctx.lineWidth = trackW; ctx.lineCap = 'round'; ctx.stroke();

            // Success arc + glow
            const successEnd = startAngle + sp * fullSweep;
            const ag = ctx.createLinearGradient(
                cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle),
                cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd)
            );
            ag.addColorStop(0, '#4318FF'); ag.addColorStop(0.5, '#42CD7E'); ag.addColorStop(1, '#00F5A0');
            ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, successEnd);
            ctx.strokeStyle = ag; ctx.lineWidth = trackW; ctx.lineCap = 'round';
            ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 18; ctx.stroke(); ctx.shadowBlur = 0;

            // Tip dot
            ctx.beginPath();
            ctx.arc(cx + r * Math.cos(successEnd), cy + r * Math.sin(successEnd), 6, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.shadowColor = '#42CD7E'; ctx.shadowBlur = 16;
            ctx.fill(); ctx.shadowBlur = 0;

            // Tick marks
            ticks.forEach(t => {
                const a = startAngle + t * fullSweep;
                ctx.beginPath();
                ctx.moveTo(cx + (r - trackW / 2 - 6) * Math.cos(a), cy + (r - trackW / 2 - 6) * Math.sin(a));
                ctx.lineTo(cx + (r + trackW / 2 + 6) * Math.cos(a), cy + (r + trackW / 2 + 6) * Math.sin(a));
                ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.lineCap = 'butt'; ctx.stroke();
            });

            // Center text
            const tg = ctx.createLinearGradient(cx - 40, cy - 20, cx + 40, cy + 20);
            tg.addColorStop(0, '#ffffff'); tg.addColorStop(1, '#42CD7E');
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = `800 36px "DM Sans", sans-serif`;
            ctx.fillStyle = tg;
            ctx.fillText((Math.round(sp * 942) / 10).toFixed(1) + '%', cx, cy - 8);
            ctx.font = `500 11px "DM Sans", sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.fillText('SUCCESS RATE', cx, cy + 16);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <canvas ref={canvasRef} />;
}
