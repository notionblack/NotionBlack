"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
    {
        title: "Architectural & AutoCAD Design",
        description: "Our team provides accurate drafting, building concepts, 3D visuals, and layout designs using professional tools like AutoCAD and SketchUp.",
        image: "/images/project-1.jpg",
    },
    {
        title: "Interior & Exterior Concepts",
        description: "We create modern visual concepts that help you picture your new space before building or renovating.",
        image: "/images/project-2.jpg",
    },
    {
        title: "Renovation Planning",
        description: "From small home improvements to full redesigns, we help shape your ideas into practical renovation plans.",
        image: "/images/project-3.jpg",
    },
    {
        title: "Website Design",
        description: "We build clean, user-friendly websites that are ideal for small businesses, start-ups, and personal brands.",
        image: "/images/project-4.jpg",
    },
];

export function Projects() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section id="projects" className="py-24 bg-background/50 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-green-500 font-semibold tracking-wider uppercase text-sm border border-green-500/30 bg-green-500/10 px-4 py-1.5 rounded-full">
                        What we offer
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-white">Our Services in Action</h2>
                    <p className="mt-4 text-white/70 max-w-2xl mx-auto">
                        Explore our diverse portfolio of architectural designs, interior concepts, and digital creations.
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[plugin.current]}
                    className="w-full relative"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {projects.map((project, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="group relative overflow-hidden rounded-2xl bg-card border border-white/10 h-[400px]">
                                    {/* Image Background */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                            {project.description}
                                        </p>
                                        <Link
                                            href="/#contact"
                                            className="inline-flex items-center text-green-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:text-green-300"
                                        >
                                            Discuss project <MoveRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:flex justify-end gap-2 mt-8">
                        <CarouselPrevious className="position-relative translate-y-0 left-0 bg-white/5 border-white/10 text-white hover:bg-white/10" />
                        <CarouselNext className="position-relative translate-y-0 right-0 bg-white/5 border-white/10 text-white hover:bg-white/10" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
