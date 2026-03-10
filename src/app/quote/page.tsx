"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const PROJECT_TYPES = [
    { id: "homes", label: "Personal Home", rate: 200 },
    { id: "residential", label: "Property Development (Residential Estates and Complexes)", rate: 250 },
    { id: "commercial", label: "Commercial Projects", rate: 300 },
];

const INTERACTIVE_LEVELS = [
    { id: "none", label: "None", percent: 0 },
    { id: "tier1", label: "Tier 1 (Doors and Windows)", percent: 0.3 },
    { id: "tier2", label: "Tier 2 (+ Cupboards and Shelves)", percent: 0.6 },
    { id: "tier3", label: "Tier 3 (+Appliances and Full interactivity)", percent: 0.9 },
];

function QuoteContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const type = searchParams.get("type") || "homes";
    const sqm = parseInt(searchParams.get("sqm") || "100", 10);
    const interior = searchParams.get("interior") === "true";
    const landscape = searchParams.get("landscape") === "true";
    const gameMode = searchParams.get("gameMode") === "true";
    const interactive = searchParams.get("interactive") || "none";

    const calculateTotals = () => {
        const rate = PROJECT_TYPES.find(t => t.id === type)?.rate || 200;
        const projectDesignCost = sqm * rate;

        const interiorCost = interior ? projectDesignCost * 0.30 : 0;
        const gameModeCost = gameMode ? projectDesignCost * 0.30 : 0; // 30% as midpoint
        const landscapeCost = landscape ? sqm * 40 : 0;

        const interactivePercent = INTERACTIVE_LEVELS.find(l => l.id === interactive)?.percent || 0;
        const interactiveCost = projectDesignCost * interactivePercent;

        const total = projectDesignCost + interiorCost + gameModeCost + landscapeCost + interactiveCost;

        return {
            projectDesignCost,
            interiorCost,
            gameModeCost,
            landscapeCost,
            interactiveCost,
            total
        };
    };

    const costs = calculateTotals();
    const activeInteractiveLevel = INTERACTIVE_LEVELS.find(l => l.id === interactive);
    const projectTypeLabel = PROJECT_TYPES.find(t => t.id === type)?.label;

    const handlePrint = () => {
        window.print();
    };

    const handleBack = () => {
        router.push("/#estimator");
    };

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-12 no-print">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-zinc-500 hover:text-black transition-colors font-bold uppercase text-xs tracking-widest"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Estimator
                    </button>
                    <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-none font-bold uppercase text-xs tracking-widest h-12 px-8">
                        <Printer className="mr-2 h-4 w-4" /> Print PDF
                    </Button>
                </div>

                {/* Quote Document */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-200"
                    id="printable-quote"
                >
                    <div className="p-5 md:p-10">
                        {/* Quote Header */}
                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 pb-6 border-b border-zinc-100">
                            <div>
                                <h1 className="text-2xl font-black text-black mb-1 tracking-tight">PROJECT QUOTE</h1>
                                <p className="text-zinc-500 font-mono text-[9px] tracking-wider uppercase">NOTION BLACK DESIGN STUDIO</p>
                            </div>
                            <div className="md:text-right">
                                <p className="text-zinc-400 text-[8px] uppercase tracking-widest mb-1">Generated On</p>
                                <p className="text-black font-bold text-sm">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h3 className="text-zinc-400 text-[8px] uppercase tracking-widest mb-3 font-bold">Project Configuration</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-zinc-500 text-[8px] mb-1">Property Type</p>
                                        <p className="text-black font-bold uppercase text-xs">{projectTypeLabel}</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-[8px] mb-1">Development Area</p>
                                        <p className="text-black font-bold text-sm uppercase">{sqm} Square Metres</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 flex flex-col justify-center">
                                <h3 className="text-zinc-400 text-[8px] uppercase tracking-widest mb-2 font-bold text-center">Interactive Fidelity</h3>
                                <p className="text-black text-center font-medium leading-relaxed text-xs">
                                    {activeInteractiveLevel?.label}
                                </p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-zinc-400 text-[8px] uppercase tracking-widest mb-4 font-bold">Investment Breakdown</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center py-2 border-b border-zinc-50">
                                    <span className="text-zinc-600 text-[11px]">Architectural Design Base</span>
                                    <span className="font-mono text-black font-bold text-[11px]">R {costs.projectDesignCost.toLocaleString()}</span>
                                </div>

                                {interior && (
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-50">
                                        <span className="text-zinc-600 text-[11px]">Interior Detailing</span>
                                        <span className="font-mono text-black text-[11px]">R {costs.interiorCost.toLocaleString()}</span>
                                    </div>
                                )}

                                {landscape && (
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-50">
                                        <span className="text-zinc-600 text-[11px]">Landscaping</span>
                                        <span className="font-mono text-black text-[11px]">R {costs.landscapeCost.toLocaleString()}</span>
                                    </div>
                                )}

                                {costs.interactiveCost > 0 && (
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-50">
                                        <span className="text-zinc-600 text-[11px]">{activeInteractiveLevel?.label}</span>
                                        <span className="font-mono text-black text-[11px]">R {costs.interactiveCost.toLocaleString()}</span>
                                    </div>
                                )}

                                {gameMode && (
                                    <div className="flex justify-between items-center py-2 border-b border-zinc-50">
                                        <span className="text-zinc-600 text-[11px]">VR Game Mode Implementation</span>
                                        <span className="font-mono text-black text-[11px]">R {costs.gameModeCost.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-zinc-950 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                            <div>
                                <p className="text-white/40 text-[8px] uppercase tracking-[0.2em] mb-1 font-bold">Total Estimated Investment</p>
                                <div className="text-2xl md:text-[42px] font-black text-green-500 tabular-nums leading-none">
                                    R {costs.total.toLocaleString()}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white/20 text-[8px] leading-relaxed max-w-[150px] uppercase">
                                    Verified automated simulation based on current market coefficients.
                                </p>
                            </div>
                        </div>

                        <div className="text-center pt-6 border-t border-zinc-100">
                            <p className="text-[8px] text-zinc-400 uppercase tracking-[0.2em] leading-relaxed">
                                This document is an automated estimation and is subject to final technical review and specific site conditions.
                                <br />© {new Date().getFullYear()} Notion Black Studio. All rights reserved.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Print Tip */}
                <div className="mt-8 text-center no-print">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest">
                        Tip: You can save this as a PDF by selecting &apos;Save as PDF&apos; in the print destination.
                    </p>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    #printable-quote { 
                        box-shadow: none !important; 
                        border: none !important;
                        margin: 0 !important;
                        width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default function QuotePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <div className="animate-pulse text-zinc-400 font-mono tracking-widest uppercase">Initializing Quote Simulation...</div>
            </div>
        }>
            <QuoteContent />
        </Suspense>
    );
}
