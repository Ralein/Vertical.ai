import React from 'react';

interface Segment {
    label: string;
    value: number;
    color: string;
    pct: number;
}

interface TppGroup {
    label: string;
    total: number;
    active: boolean;
    segments: Segment[];
}

interface TppConsentGroupProps {
    tppGroups: TppGroup[];
}

export default function TppConsentGroup({ tppGroups }: TppConsentGroupProps) {
    return (
        <div className="flex-1 flex flex-col justify-evenly gap-2">
            {tppGroups.map((group, idx) => (
                <div key={idx}>
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2">
                            <span className="tpp-label">{group.label}</span>
                            <span
                                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{
                                    background: group.active ? 'rgba(5,205,153,0.1)' : 'rgba(163,174,208,0.15)',
                                    color: group.active ? '#05CD99' : '#A3AED0'
                                }}
                            >
                                {group.active ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-[#2B3674]">{group.total}</span>
                    </div>
                    <div className="flex h-6 rounded-lg overflow-hidden gap-px">
                        {group.segments.map((seg, sIdx) => (
                            <div
                                key={sIdx}
                                className="h-full hover:brightness-110 cursor-pointer transition-all duration-200"
                                style={{
                                    width: `${seg.pct}%`,
                                    background: seg.color
                                }}
                                title={`${seg.label}: ${seg.value} requests (${seg.pct.toFixed(1)}%)`}
                            ></div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Shared legend at bottom */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 border-t border-gray-100">
                {tppGroups[0]?.segments.map((seg, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: seg.color }}></span>
                        <span className="text-[10px] text-[#A3AED0]">{seg.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
