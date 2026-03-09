"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const disciplines = [
    {
        id: "item-1",
        title: "01. Architecture Design",
        subtitle: "Structural Precision",
        description: "We architect spaces prioritizing modern layouts, sustainable materials, and rigorous geometric precision to form functional masterpieces.",
        image: "/images/project_architecture.png"
    },
    {
        id: "item-2",
        title: "02. Interior Design",
        subtitle: "Elevated Comfort",
        description: "Creating immersive, high-end interior environments tailored to premium comfort, sensory balance, and sophisticated minimalism.",
        image: "/images/project_interior.png"
    },
    {
        id: "item-3",
        title: "03. Digital Architecture",
        subtitle: "Immersive Visualization",
        description: "Bringing architectural structure to the web space. We build hyper-performant, semantic, and visually striking technical platforms.",
        image: "/images/project_digital.png"
    }
];

export function Services() {
    return (
        <section id="services" className="py-24 bg-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Column - Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5 lg:sticky lg:top-32"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Our Disciplines</h2>
                        <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
                            We believe in a holistic approach to design. By blending rigorous architectural structure with responsive digital frameworks, we produce cohesive brand experiences.
                        </p>
                        <Link
                            href="/#services"
                            className="inline-flex h-12 items-center justify-center rounded-none border border-green-500 text-green-500 bg-transparent px-8 text-sm font-semibold transition-colors hover:bg-green-500 hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Explore Services
                        </Link>
                    </motion.div>

                    {/* Right Column - Accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-7"
                    >
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
                            {disciplines.map((item) => (
                                <AccordionItem key={item.id} value={item.id} className="border border-white/10 bg-background/50 backdrop-blur-sm rounded-none px-6">
                                    <AccordionTrigger className="text-xl sm:text-2xl font-bold text-white hover:no-underline py-6 data-[state=open]:text-green-500 transition-colors">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-8">
                                        <div className="grid sm:grid-cols-12 gap-8 items-center pt-4 border-t border-white/10">
                                            <div className="sm:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden group">
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="sm:col-span-7">
                                                <strong className="block text-white mb-3 text-lg">{item.subtitle}</strong>
                                                <p className="text-white/70 font-light leading-relaxed mb-6">
                                                    {item.description}
                                                </p>
                                                <Link
                                                    href="/#services"
                                                    className="group inline-flex items-center text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
                                                >
                                                    Learn more
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
