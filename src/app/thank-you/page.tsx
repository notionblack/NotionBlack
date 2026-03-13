"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
    const [countdown, setCountdown] = useState(10);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-muted/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-5 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-card border border-border rounded-3xl p-8 md:p-16 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
                        {/* Decorative Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent" />

                        <div className="flex flex-col items-center text-center">
                            {/* Animated Success Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                                className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-10 relative"
                            >
                                <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tighter uppercase font-sans">
                                    Mission <span className="text-green-500">Complete</span>
                                </h1>
                                <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md mx-auto">
                                    Your request has been securely transmitted. A Notion Black specialist will contact you shortly to discuss your vision.
                                </p>
                            </motion.div>

                            {/* Countdown UI */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mb-12 flex flex-col items-center"
                            >
                                <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="transparent"
                                            className="text-muted-foreground/5"
                                        />
                                        <motion.circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="transparent"
                                            strokeDasharray="175.93"
                                            initial={{ strokeDashoffset: 0 }}
                                            animate={{ strokeDashoffset: 175.93 * (1 - countdown / 10) }}
                                            transition={{ duration: 1, ease: "linear" }}
                                            className="text-green-500"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute text-xl font-bold text-foreground font-mono">{countdown}</span>
                                </div>
                                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/30 font-semibold">
                                    Auto-returning to command post
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="w-full max-w-xs"
                            >
                                <Link
                                    href="/"
                                    className="group relative inline-flex w-full items-center justify-center overflow-hidden h-14 bg-green-500 px-8 text-sm font-bold text-background transition-all hover:bg-green-400 focus-visible:outline-none rounded-none"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        RETURN HOME <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>

                                <Link
                                    href="/#projects"
                                    className="block mt-6 text-muted-foreground/40 hover:text-foreground transition-colors text-xs font-semibold uppercase tracking-widest"
                                >
                                    View our work while you wait
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
