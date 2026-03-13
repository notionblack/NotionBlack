"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
            {/* Dynamic Geometric Background Shapes */}
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-muted/5 rounded-full blur-[120px] pointer-events-none" />
            {/* Hero Content */}
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
                        >
                            <span className="block text-foreground">We engineer</span>
                            <span className="block text-foreground">architecture &</span>
                            <span className="block text-green-500">digital experiences.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative pl-6 border-l-2 border-green-500/50 mb-10"
                        >
                            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light">
                                A multidisciplinary design studio bridging the physical and digital worlds—crafting stunning environments and seamless technical platforms that elevate your brand.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                        >
                            <Link
                                href="/#projects"
                                className="inline-flex h-14 items-center justify-center rounded-none bg-green-500 px-8 text-sm font-semibold text-background transition-colors hover:bg-green-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                View Projects
                            </Link>
                            <Link
                                href="/#contact"
                                className="group inline-flex items-center text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors"
                            >
                                Let&apos;s Talk
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 text-green-500" />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="relative hidden lg:block aspect-square"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-[80px]" />
                        <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border shadow-2xl">
                            <Image
                                src="/images/home.jpg"
                                alt="Modern architectural structure"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
