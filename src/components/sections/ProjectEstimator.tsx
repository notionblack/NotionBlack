"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout, Trees, RefreshCw, Zap } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const CONFIG = {
    basePrices: {
        residential: 5000,
        commercial: 12000,
        rendering: 3000,
        fullPackage: 20000,
    } as Record<string, number>,
    rates: {
        sqmRate: 15,
        interior: 2500,
        landscape: 1800,
        revisions: 500,
        express: 0.25,
    },
};

type ServiceType = keyof typeof CONFIG.basePrices;

export function ProjectEstimator() {
    const [type, setType] = useState<ServiceType>("residential");
    const [sqm, setSqm] = useState(100);
    const [addons, setAddons] = useState({
        interior: false,
        landscape: false,
        revisions: false,
        express: false,
    });

    const [isClient, setIsClient] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const calculateTotals = () => {
        const base = CONFIG.basePrices[type];
        const areaCost = sqm * CONFIG.rates.sqmRate;
        let extras = 0;

        if (addons.interior) extras += CONFIG.rates.interior;
        if (addons.landscape) extras += CONFIG.rates.landscape;
        if (addons.revisions) extras += CONFIG.rates.revisions;

        const subtotal = base + areaCost + extras;
        const expressCost = addons.express ? subtotal * CONFIG.rates.express : 0;
        const total = subtotal + expressCost;

        return { base, areaCost, extras, expressCost, total };
    };

    const { base, areaCost, expressCost, total } = calculateTotals();

    const handleExportPDF = async () => {
        if (!isClient) return;

        // Dynamically import html2pdf only when needed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const html2pdf = (await import("html2pdf.js" as any)).default;

        const element = contentRef.current;
        if (!element) return;

        const opt = {
            margin: 1,
            filename: `NotionBlack_Estimate_${new Date().toISOString().split("T")[0]}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <section id="estimator" className="py-24 bg-background relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="row align-items-center mb-12">
                    <div className="col-lg-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Project Estimator
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl font-light">
                            Explore project investment variables with immediate calculation accuracy directly on our platform.
                        </p>
                    </div>
                </div>

                <div className="relative border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/images/dot-grid.svg')] bg-center bg-repeat opacity-5 pointer-events-none" />

                    <div className="grid lg:grid-cols-12 relative z-10">
                        {/* Input Section */}
                        <div className="lg:col-span-7 p-8 md:p-12 lg:pr-16 border-b lg:border-b-0 lg:border-r border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-8">Configure Parameters</h3>

                            {/* Service Type */}
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4 block">
                                    Service Type
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {(Object.keys(CONFIG.basePrices) as ServiceType[]).map((serviceType) => (
                                        <button
                                            key={serviceType}
                                            onClick={() => setType(serviceType)}
                                            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${type === serviceType
                                                ? "bg-green-500/10 border-green-500 text-green-500"
                                                : "bg-transparent border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {serviceType.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Project Scale */}
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4 block">
                                    Project Scale
                                </label>
                                <div className="flex items-center gap-4 mb-6 relative group">
                                    <input
                                        type="number"
                                        value={sqm}
                                        onChange={(e) => setSqm(Number(e.target.value) || 0)}
                                        className="w-32 bg-transparent text-5xl font-black text-white focus:outline-none placeholder:text-white/20 transition-all border-b border-transparent focus:border-green-500/50"
                                        min={10}
                                        max={5000}
                                    />
                                    <span className="text-white/40 font-bold uppercase tracking-widest self-end pb-2">
                                        SQM
                                    </span>
                                </div>
                                <Slider
                                    value={[sqm]}
                                    onValueChange={(val) => setSqm(val[0])}
                                    max={5000}
                                    min={10}
                                    step={10}
                                    className="mb-3"
                                />
                                <div className="flex justify-between text-white/40 text-xs font-mono">
                                    <span>10 SQM</span>
                                    <span>5000 SQM</span>
                                </div>
                            </div>

                            {/* Operational Extensions (Addons) */}
                            <div>
                                <label className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4 block">
                                    Operational Extensions
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, interior: !prev.interior }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.interior ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <Layout className="w-4 h-4" /> Interior
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, landscape: !prev.landscape }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.landscape ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <Trees className="w-4 h-4" /> Landscape
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, revisions: !prev.revisions }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.revisions ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <RefreshCw className="w-4 h-4" /> Analysis
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, express: !prev.express }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.express ? "bg-green-500 text-black border-green-500" : "bg-transparent text-green-500 border-green-500/30 hover:bg-green-500/10"
                                            }`}
                                    >
                                        <Zap className="w-4 h-4" /> Priority
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <motion.div
                                    key={total} // Re-animate when total changes
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-10"
                                >
                                    <div className="text-white/50 tracking-widest uppercase text-sm font-semibold mb-2">
                                        Estimated Investment
                                    </div>
                                    <div className="flex items-start text-white font-black leading-none">
                                        <span className="text-2xl text-green-500 mt-2 mr-1">R</span>
                                        <span className="text-6xl sm:text-7xl tabular-nums tracking-tracking-tight">{total.toLocaleString()}</span>
                                    </div>
                                </motion.div>

                                <div className="space-y-4 mb-10 text-sm md:text-base">
                                    <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10">
                                        <span>Core Service Base</span>
                                        <span className="font-mono">R {base.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10">
                                        <span>Spatial Scaling Factor</span>
                                        <span className="font-mono">R {areaCost.toLocaleString()}</span>
                                    </div>

                                    {addons.interior && (
                                        <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10">
                                            <span>Interior Integration</span>
                                            <span className="font-mono text-green-400">+R {CONFIG.rates.interior.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {addons.landscape && (
                                        <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10">
                                            <span>Landscape Systems</span>
                                            <span className="font-mono text-green-400">+R {CONFIG.rates.landscape.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {addons.revisions && (
                                        <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10">
                                            <span>Extended Analysis</span>
                                            <span className="font-mono text-green-400">+R {CONFIG.rates.revisions.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {addons.express && (
                                        <div className="flex justify-between items-center text-white/80 pb-3 border-b border-green-500/20">
                                            <span className="text-green-500 font-semibold">Priority Delivery (+25%)</span>
                                            <span className="font-mono text-green-500">+R {expressCost.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                onClick={handleExportPDF}
                                size="lg"
                                className="w-full h-14 bg-white text-black hover:bg-white/90 font-bold tracking-widest uppercase text-xs"
                            >
                                Export PDF Estimate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden PDF Export Structure */}
            <div className="hidden">
                <div ref={contentRef} className="p-8 bg-white text-black w-[800px] font-sans">
                    <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-widest text-black/90">Investment Estimate</h2>
                            <p className="text-black/50 text-sm font-semibold uppercase tracking-wider mt-1">Confidential Financial Projection</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg leading-tight uppercase">Notion Black Studio</p>
                            <p className="text-black/50 text-sm">Scientific Design & Digital Engineering</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-black/40 font-semibold mb-1">Project Reference</p>
                            <p className="font-bold text-lg">{type.charAt(0).toUpperCase() + type.slice(1)} Infrastructure</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase tracking-widest text-black/40 font-semibold mb-1">Date of Calculation</p>
                            <p className="font-bold text-lg">{new Date().toISOString().split("T")[0]}</p>
                        </div>
                    </div>

                    <table className="w-full text-left mb-12 border-collapse">
                        <thead>
                            <tr className="border-b border-black/20">
                                <th className="py-4 text-sm uppercase tracking-widest w-2/3">Description</th>
                                <th className="py-4 text-sm uppercase tracking-widest text-right">Amount (ZAR)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10">
                            <tr>
                                <td className="py-4">Base Service: {type}</td>
                                <td className="py-4 text-right font-mono">R {base.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td className="py-4">Spatial Scaling: {sqm} SQM</td>
                                <td className="py-4 text-right font-mono">R {areaCost.toLocaleString()}</td>
                            </tr>
                            {addons.interior && (
                                <tr><td className="py-4 text-black/70">Interior Integration</td><td className="py-4 text-right font-mono text-black/70">R {CONFIG.rates.interior.toLocaleString()}</td></tr>
                            )}
                            {addons.landscape && (
                                <tr><td className="py-4 text-black/70">Landscape Systems</td><td className="py-4 text-right font-mono text-black/70">R {CONFIG.rates.landscape.toLocaleString()}</td></tr>
                            )}
                            {addons.revisions && (
                                <tr><td className="py-4 text-black/70">Extended Analysis</td><td className="py-4 text-right font-mono text-black/70">R {CONFIG.rates.revisions.toLocaleString()}</td></tr>
                            )}
                            {addons.express && (
                                <tr><td className="py-4 font-semibold">Priority Processing (+25%)</td><td className="py-4 text-right font-mono font-semibold">R {expressCost.toLocaleString()}</td></tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-black">
                                <td className="py-6 font-bold uppercase tracking-widest">Total Estimated Investment</td>
                                <td className="py-6 text-right text-2xl font-black font-mono">R {total.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="text-xs text-black/50 leading-relaxed border-t border-black/10 pt-4 mt-auto">
                        <strong>Disclaimer:</strong> This calculation is a preliminary digital estimate based on standardized rates. Final architectural contracts and detailed engineering plans may result in variable cost adjustments. Valid for 30 days from the date of transmission.
                    </div>
                </div>
            </div>

        </section>
    );
}
