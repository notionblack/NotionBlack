"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Trees, BarChart, Video, Download } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PROJECT_TYPES = [
    { id: "homes", label: "Personal Home", short: "Home", rate: 200 },
    { id: "residential", label: "Property Development (Residential Estates and Complexes)", short: "Estates", rate: 250 },
    { id: "commercial", label: "Commercial Projects", short: "Commercial", rate: 300 },
] as const;

type ProjectTypeId = typeof PROJECT_TYPES[number]['id'];

const INTERACTIVE_LEVELS = [
    { id: "none", label: "None", percent: 0 },
    { id: "tier1", label: "Tier 1 (Doors and Windows)", percent: 0.3 },
    { id: "tier2", label: "Tier 2 (+ Cupboards and Shelves)", percent: 0.6 },
    { id: "tier3", label: "Tier 3 (+Appliances and Full interactivity)", percent: 0.9 },
] as const;

export function ProjectEstimator() {
    const router = useRouter();
    const [projectType, setProjectType] = useState<ProjectTypeId>("homes");
    const [sqm, setSqm] = useState(100);
    const [addons, setAddons] = useState({
        interior: false,
        gameMode: false,
        landscape: false,
    });
    const [interactiveLevel, setInteractiveLevel] = useState<string>("none");

    const calculateTotals = () => {
        const rate = PROJECT_TYPES.find(t => t.id === projectType)?.rate || 200;
        const projectDesignCost = sqm * rate;

        const interiorCost = addons.interior ? projectDesignCost * 0.30 : 0;
        const gameModeCost = addons.gameMode ? projectDesignCost * 0.30 : 0;
        const landscapeCost = addons.landscape ? sqm * 40 : 0;

        const interactivePercent = INTERACTIVE_LEVELS.find(l => l.id === interactiveLevel)?.percent || 0;
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
    const activeInteractiveLevel = INTERACTIVE_LEVELS.find(l => l.id === interactiveLevel);

    const handleDownloadRequest = () => {
        const params = new URLSearchParams({
            type: projectType,
            sqm: sqm.toString(),
            interior: addons.interior.toString(),
            gameMode: addons.gameMode.toString(),
            landscape: addons.landscape.toString(),
            interactive: interactiveLevel,
        });

        router.push(`/quote?${params.toString()}`);
    };

    return (
        <section id="estimator" className="py-24 bg-background relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="row align-items-center mb-12">
                    <div className="col-lg-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Project Estimator
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl font-light">
                            Explore project investment variables with immediate calculation accuracy directly on our platform.
                        </p>
                    </div>
                </div>

                <div className="relative border border-border rounded-2xl bg-card/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-dot-grid bg-center bg-repeat opacity-5 pointer-events-none" />

                    <div className="grid lg:grid-cols-12 relative z-10">
                        {/* Input Section */}
                        <div className="lg:col-span-7 p-8 md:p-12 lg:pr-16 border-b lg:border-b-0 lg:border-r border-border">
                            <h3 className="text-xl font-semibold text-foreground mb-8">Configure Parameters</h3>

                            {/* Service Type */}
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-4 block">
                                    Project Type
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {PROJECT_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setProjectType(type.id)}
                                            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${projectType === type.id
                                                ? "bg-green-500/10 border-green-500 text-green-500"
                                                : "bg-transparent border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                                                }`}
                                        >
                                            {type.short}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3 text-sm text-muted-foreground/40">
                                    {PROJECT_TYPES.find(t => t.id === projectType)?.label}
                                </div>
                            </div>

                            {/* Project Scale */}
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-4 block">
                                    Project Size (Square Metres)
                                </label>
                                <div className="flex items-center gap-4 mb-6 relative group">
                                    <input
                                        type="number"
                                        value={sqm}
                                        onChange={(e) => setSqm(Number(e.target.value) || 0)}
                                        className="w-32 bg-transparent text-5xl font-black text-foreground focus:outline-none placeholder:text-muted-foreground/20 transition-all border-b border-transparent focus:border-green-500/50"
                                        min={1}
                                        max={10000}
                                    />
                                    <span className="text-muted-foreground/40 font-bold uppercase tracking-widest self-end pb-2">
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
                                <div className="flex justify-between text-muted-foreground/40 text-xs font-mono">
                                    <span>10 SQM</span>
                                    <span>5000 SQM</span>
                                </div>
                            </div>

                            {/* Operational Extensions (Addons) */}
                            <div className="mb-10">
                                <label className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-4 block">
                                    Additional Services
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, interior: !prev.interior }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.interior ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                                            }`}
                                    >
                                        <Layout className="w-4 h-4" /> Interior Detailing
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, landscape: !prev.landscape }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.landscape ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                                            }`}
                                    >
                                        <Trees className="w-4 h-4" /> Landscaping
                                    </button>
                                    <button
                                        onClick={() => setAddons((prev) => ({ ...prev, gameMode: !prev.gameMode }))}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${addons.gameMode ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                                            }`}
                                    >
                                        <Video className="w-4 h-4" /> VR Game Mode
                                    </button>
                                </div>
                            </div>

                            {/* Interactive Level Dropdown */}
                            <div>
                                <label className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-4 block">
                                    Interactive Level
                                </label>
                                <Select value={interactiveLevel} onValueChange={setInteractiveLevel}>
                                    <SelectTrigger className="w-full sm:w-[350px] bg-background/50 border-border text-foreground">
                                        <SelectValue placeholder="Select Interactive Level" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border text-foreground">
                                        {INTERACTIVE_LEVELS.map((level) => (
                                            <SelectItem key={level.id} value={level.id} className="cursor-pointer">
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
                                    <div className="text-muted-foreground/50 tracking-widest uppercase text-sm font-semibold mb-2">
                                        Estimated Investment
                                    </div>
                                    <div className="flex items-start text-foreground font-black leading-none">
                                        <span className="text-2xl text-green-500 mt-2 mr-1">R</span>
                                        <span className="text-6xl sm:text-[70px] tabular-nums tracking-tight">{costs.total.toLocaleString()}</span>
                                    </div>
                                </motion.div>

                                <div className="space-y-4 mb-10 text-sm md:text-base">
                                    <div className="flex justify-between items-center text-muted-foreground pb-3 border-b border-border">
                                        <span>Project Design</span>
                                        <span className="font-mono">R {costs.projectDesignCost.toLocaleString()}</span>
                                    </div>

                                    <AnimatePresence>
                                        {addons.interior && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-muted-foreground pb-3 border-b border-border overflow-hidden">
                                                <span>Interior Detailing</span>
                                                <span className="font-mono text-green-400">R {costs.interiorCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {addons.landscape && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-muted-foreground pb-3 border-b border-border overflow-hidden">
                                                <span>Landscaping</span>
                                                <span className="font-mono text-green-400">R {costs.landscapeCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {costs.interactiveCost > 0 && activeInteractiveLevel && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-muted-foreground pb-3 border-b border-border overflow-hidden">
                                                <span>{activeInteractiveLevel.label}</span>
                                                <span className="font-mono text-green-400">R {costs.interactiveCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                        {addons.gameMode && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between items-center text-muted-foreground pb-3 border-b border-border overflow-hidden">
                                                <span className="text-muted-foreground">VR Game Mode</span>
                                                <span className="font-mono text-green-400">R {costs.gameModeCost.toLocaleString()}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <Button
                                onClick={handleDownloadRequest}
                                size="lg"
                                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-widest uppercase text-xs transition-colors"
                            >
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

