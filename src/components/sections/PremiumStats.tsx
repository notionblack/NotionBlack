"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedCounter({ from, to }: { from: number; to: number }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
            return controls.stop;
        }
    }, [count, inView, to]);

    return (
        <motion.span
            className="text-6xl sm:text-7xl font-bold font-sans text-foreground block mb-4"
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, margin: "-100px" }}
        >
            {rounded}
        </motion.span>
    );
}

export function PremiumStats() {
    return (
        <section className="py-24 bg-background border-t border-border relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">

                    {/* Stat 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-none relative overflow-hidden group hover:border-green-500/30 transition-colors z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 flex items-baseline">
                            <AnimatedCounter from={0} to={1} />
                            <span className="text-4xl sm:text-5xl font-bold text-green-500 ml-1 mb-4">+</span>
                        </div>
                        <p className="text-sm font-semibold text-muted-foreground tracking-[0.2em] uppercase text-center w-full">
                            Projects Delivered
                        </p>
                    </motion.div>

                    {/* Stat 2 - Highlighted */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center justify-center p-8 bg-card border border-green-500/50 rounded-none relative overflow-hidden group z-20 md:-mt-8 md:mb-8 shadow-[0_0_50px_-12px_rgba(34,197,94,0.15)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <AnimatedCounter from={0} to={1} />
                        </div>
                        <p className="text-sm font-semibold text-green-500 tracking-[0.2em] uppercase text-center w-full">
                            Design Awards
                        </p>
                    </motion.div>

                    {/* Stat 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-none relative overflow-hidden group hover:border-green-500/30 transition-colors z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 flex items-baseline">
                            <AnimatedCounter from={0} to={0} />
                            <span className="text-4xl sm:text-5xl font-bold text-green-500 ml-1 mb-4">+</span>
                        </div>
                        <p className="text-sm font-semibold text-muted-foreground tracking-[0.2em] uppercase text-center w-full">
                            Years Experience
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
