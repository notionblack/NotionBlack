"use client";

import { QuoteForm } from "@/components/sections/QuoteForm";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedCounter({ from, to }: { from: number; to: number }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration: 2, ease: "easeOut" });
            return controls.stop;
        }
    }, [count, inView, to]);

    return (
        <motion.span
            className="text-4xl md:text-5xl font-bold text-green-500 mb-2"
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, margin: "-50px" }}
        >
            {rounded}
        </motion.span>
    );
}

export function AboutStats() {
    return (
        <section id="about" className="py-24 bg-background border-t border-white/5 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

                    {/* Quote Form Section on the Left */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <QuoteForm />
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center space-y-12">

                        {/* About Text Section */}
                        <div className="space-y-6">
                            <div className="inline-block">
                                <span className="text-green-500 font-semibold tracking-wider uppercase text-sm border border-green-500/30 bg-green-500/10 px-4 py-1.5 rounded-full">
                                    Welcome
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                                Since we started work in <span className="text-green-500">2025</span>
                            </h2>
                            <div className="space-y-4 text-white/70 text-lg leading-relaxed font-light">
                                <p>
                                    Notion Black is a creative design studio made up of a team of 7 designers,
                                    drafters, and digital creators dedicated to bringing modern design solutions
                                    to individuals and businesses.
                                </p>
                                <p>
                                    Although we are a young company, our team brings a mix of architectural
                                    knowledge, digital design skills, and creative energy. We focus on delivering
                                    high-quality, affordable design services with a personal touch.
                                </p>
                            </div>
                        </div>

                        {/* Mobile Form View */}
                        <div className="block lg:hidden w-full max-w-xl mx-auto py-8">
                            <QuoteForm />
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                            <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                <AnimatedCounter from={0} to={1} />
                                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                    Years of<br />experience
                                </span>
                            </div>
                            <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                <AnimatedCounter from={0} to={15} />
                                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                    Projects<br />Done
                                </span>
                            </div>
                            <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                <AnimatedCounter from={0} to={7} />
                                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                    Our<br />Team
                                </span>
                            </div>
                            <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                <AnimatedCounter from={0} to={10} />
                                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                    Happy<br />Customers
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
