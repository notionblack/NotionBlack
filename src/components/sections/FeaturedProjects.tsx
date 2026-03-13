"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const featuredProjects = [
    {
        title: "Zenith Pavilion",
        category: "Architecture",
        image: "/images/project_architecture.png",
        link: "/projects",
    },
    {
        title: "Neo Corporate",
        category: "Interior Design",
        image: "/images/project_interior.png",
        link: "/projects",
    },
    {
        title: "Vanguard Web Development",
        category: "Web Design/Development",
        image: "/images/project_digital.png",
        link: "/projects",
    },
];

export function FeaturedProjects() {
    return (
        <section id="projects" className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                            Featured Work
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:text-right max-w-sm"
                    >
                        <p className="text-muted-foreground font-light leading-relaxed">
                            A selection of recent architectural and digital achievements that showcase our structured approach.
                        </p>
                    </motion.div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                        >
                            <Link href={project.link} className="block group relative overflow-hidden aspect-[4/5] bg-card">
                                {/* Background Image */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-green-500 text-sm font-semibold tracking-wider uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                                    <div className="w-0 h-0.5 bg-green-500 group-hover:w-16 transition-all duration-500 delay-200 mt-4" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Action Bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/#projects"
                        className="inline-flex h-14 items-center justify-center rounded-none bg-green-500 px-8 text-sm font-semibold text-background transition-colors hover:bg-green-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        View Full Portfolio
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
