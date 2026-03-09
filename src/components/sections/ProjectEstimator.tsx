"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Trees, BarChart, Video, X, Download, Printer } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PROJECT_TYPES = [
    { id: "residential", label: "Residential (Complexes and Gated Community)", short: "Residential", rate: 150 },
    { id: "homes", label: "Homes", short: "Homes", rate: 150 },
    { id: "commercial", label: "Commercial (Lodges, Malls, Reserves)", short: "Commercial", rate: 150 },
] as const;

type ProjectTypeId = typeof PROJECT_TYPES[number]['id'];

const INTERACTIVE_LEVELS = [
    { id: "none", label: "None", percent: 0 },
    { id: "tier1", label: "Tier 1 — Doors and Windows", percent: 0.3 },
    { id: "tier2", label: "Tier 2 — Doors, Windows, Cupboards, Shelves", percent: 0.6 },
    { id: "tier3", label: "Tier 3 — Full Interaction (TVs, Fridge, Lights, Appliances)", percent: 0.9 },
] as const;

export function ProjectEstimator() {
    const [projectType, setProjectType] = useState<ProjectTypeId>("residential");
    const [sqm, setSqm] = useState(100);
    const [addons, setAddons] = useState({
        interior: false,
        landscape: false,
        analysis: false,
        gameMode: false,
    });
    const [interactiveLevel, setInteractiveLevel] = useState<string>("none");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const calculateTotals = () => {
        const rate = PROJECT_TYPES.find(t => t.id === projectType)?.rate || 150;
        const projectDesignCost = sqm * rate;

        const interiorCost = addons.interior ? projectDesignCost * 0.30 : 0;
        const landscapingCost = addons.landscape ? projectDesignCost * 0.30 : 0;
        const analysisCost = addons.analysis ? projectDesignCost * 0.25 : 0;
        const gameModeCost = addons.gameMode ? projectDesignCost * 0.50 : 0;

        const interactivePercent = INTERACTIVE_LEVELS.find(l => l.id === interactiveLevel)?.percent || 0;
        const interactiveCost = projectDesignCost * interactivePercent;

        const total = projectDesignCost + interiorCost + landscapingCost + analysisCost + gameModeCost + interactiveCost;

        return {
            projectDesignCost,
            interiorCost,
            landscapingCost,
            analysisCost,
            gameModeCost,
            interactiveCost,
            total
        };
    };

    const costs = calculateTotals();
    const activeInteractiveLevel = INTERACTIVE_LEVELS.find(l => l.id === interactiveLevel);

    const handleDownloadRequest = () => {
        setIsModalOpen(true);
    };

    const handlePrint = () => {
        window.print();
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
                                    Project Type
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {PROJECT_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setProjectType(type.id)}
                                            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${projectType === type.id
                                                ? "bg-green-500/10 border-green-500 text-green-500"
                                                : "bg-transparent border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {type.short}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3 text-sm text-white/40">
                                    {PROJECT_TYPES.find(t => t.id === projectType)?.label}
                                </div>
                            </div>

                            {/* Project Scale */}
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4 block">
                                    Project Size (Square Metres)
                                </label>
                                <div className="flex items-center gap-4 mb-6 relative group">
                                    <input
                                        type="number"
                                        value={sqm}
                                        onChange={(e) => setSqm(Number(e.target.value) || 0)}
                                        className="w-32 bg-transparent text-5xl font-black text-white focus:outline-none placeholder:text-white/20 transition-all border-b border-transparent focus:border-green-500/50"
                                        min={1}
                                        max={10000}
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
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4 block">
                                    Additional Services
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, interior: !prev.interior }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.interior ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <Layout className="w-4 h-4" /> Interior Design
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, landscape: !prev.landscape }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.landscape ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <Trees className="w-4 h-4" /> Landscaping
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, analysis: !prev.analysis }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.analysis ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <BarChart className="w-4 h-4" /> Analysis
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, gameMode: !prev.gameMode }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.gameMode ? "bg-white text-black border-white" : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <Video className="w-4 h-4" /> Game Mode
                                    </button>
                                </div>
                            </div>

                            {/* Interactive Level Dropdown */}
                            <div>
                                <label className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4 block">
                                    Interactive Level
                                </label>
                                <Select value={interactiveLevel} onValueChange={setInteractiveLevel}>
                                    <SelectTrigger className="w-full sm:w-[350px] bg-black/50 border-white/20 text-white">
                                        <SelectValue placeholder="Select Interactive Level" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/20 text-white">
                                        {INTERACTIVE_LEVELS.map((level) => (
                                            <SelectItem key={level.id} value={level.id} className="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer data-[highlighted]:bg-white/20 data-[highlighted]:text-white">
                                                {level.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                            <div>
                                <motion.div
                                    key={costs.total} // Re-animate when total changes
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-10"
                                >
                                    <div className="text-white/50 tracking-widest uppercase text-sm font-semibold mb-2">
                                        Estimated Investment
                                    </div>
                                    <div className="flex items-start text-white font-black leading-none">
                                        <span className="text-2xl text-green-500 mt-2 mr-1">R</span>
                                        <span className="text-6xl sm:text-7xl tabular-nums tracking-tracking-tight">{costs.total.toLocaleString()}</span>
                                    </div>
                                </motion.div>

                                <div className="space-y-4 mb-10 text-sm md:text-base">
                                    <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10">
                                        <span>Project Design</span>
                                        <span className="font-mono">R {costs.projectDesignCost.toLocaleString()}</span>
                                    </div>

                                    <AnimatePresence>
                                        {addons.interior && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10 overflow-hidden">
                                                <span>Interior Design</span>
                                                <span className="font-mono text-green-400">R {costs.interiorCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {addons.landscape && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10 overflow-hidden">
                                                <span>Landscaping</span>
                                                <span className="font-mono text-green-400">R {costs.landscapingCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {costs.interactiveCost > 0 && activeInteractiveLevel && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10 overflow-hidden">
                                                <span>{activeInteractiveLevel.label.split('—')[0].trim()}</span>
                                                <span className="font-mono text-green-400">R {costs.interactiveCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {addons.analysis && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10 overflow-hidden">
                                                <span>Analysis</span>
                                                <span className="font-mono text-green-400">R {costs.analysisCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {addons.gameMode && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-white/80 pb-3 border-b border-white/10 overflow-hidden">
                                                <span className="text-white/80">Game Mode</span>
                                                <span className="font-mono text-green-400">R {costs.gameModeCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <Button
                                onClick={handleDownloadRequest}
                                size="lg"
                                className="w-full h-14 bg-white text-black hover:bg-white/90 font-bold tracking-widest uppercase text-xs transition-colors"
                            >
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white border border-zinc-200 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <div className="p-8 md:p-12" ref={pdfRef}>
                                {/* PDF Content */}
                                <div className="mb-8 flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-black mb-1">Project Quote</h2>
                                        <p className="text-zinc-500 text-sm font-mono">Notion Black Studio</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Date</p>
                                        <p className="text-black text-sm font-medium">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-zinc-100">
                                        <div>
                                            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Project Type</p>
                                            <p className="text-black font-medium">{PROJECT_TYPES.find(t => t.id === projectType)?.label}</p>
                                        </div>
                                        <div>
                                            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Project Size</p>
                                            <p className="text-black font-medium">{sqm} SQM</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-zinc-400 text-xs uppercase tracking-widest">Investment Summary</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-600">Architectural Design Base</span>
                                                <span className="text-black font-mono">R {costs.projectDesignCost.toLocaleString()}</span>
                                            </div>
                                            {addons.interior && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-zinc-600">Interior Design Extension</span>
                                                    <span className="text-black font-mono">R {costs.interiorCost.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {addons.landscape && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-zinc-600">Landscaping Extension</span>
                                                    <span className="text-black font-mono">R {costs.landscapingCost.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {costs.interactiveCost > 0 && activeInteractiveLevel && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-zinc-600">Interactive Level: {activeInteractiveLevel.label.split('—')[0]}</span>
                                                    <span className="text-black font-mono">R {costs.interactiveCost.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {addons.analysis && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-zinc-600">Statistical Analysis</span>
                                                    <span className="text-black font-mono">R {costs.analysisCost.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {addons.gameMode && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-zinc-600">Game Mode Environment</span>
                                                    <span className="text-black font-mono">R {costs.gameModeCost.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-zinc-100 mt-8">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Total Estimated Investment</p>
                                                <div className="text-3xl font-bold text-green-600">
                                                    R {costs.total.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 text-[10px] text-zinc-400 uppercase tracking-[0.2em] pt-8 text-center italic">
                                        This quote is an automated estimate and subject to final review and site conditions.
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex flex-col sm:flex-row gap-4">
                                <Button
                                    onClick={handlePrint}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-12"
                                >
                                    <Printer className="mr-2 h-4 w-4" /> Print Quote
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}

