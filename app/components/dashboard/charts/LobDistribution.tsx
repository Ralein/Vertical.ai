import React from 'react';

interface LobItem {
    label: string;
    value: number;
    count: string;
    color: string;
    gradient: string;
}

interface LobDistributionProps {
    data: LobItem[];
}

export default function LobDistribution({ data }: LobDistributionProps) {
    return (
        <div className="flex-1 flex flex-col justify-evenly">
            {data.map((item, idx) => (
                <div key={idx} title={`${item.label}: ${item.value}% (${item.count} policies)`} className="cursor-default">
                    {/* Label row */}
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: item.color }}></span>
                            <span className="text-xs font-bold text-[#2B3674]">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#2B3674]">{item.value}%</span>
                            <span className="text-[10px] text-[#A3AED0]">({item.count} policies)</span>
                        </div>
                    </div>
                    {/* Bar track */}
                    <div className="flex items-center gap-2">
                        <div className="lob-bar-track">
                            <div
                                className="lob-bar-fill"
                                style={{ width: `${item.value}%`, background: item.gradient }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Mini total footer */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
                <span className="text-[11px] text-[#A3AED0] font-semibold">Total Policies</span>
                <span className="text-sm font-extrabold text-[#2B3674]">4,820</span>
            </div>
        </div>
    );
}
