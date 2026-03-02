"use client";

import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const teamMembers = [
    {
        name: "Architect Member",
        role: "Lead Architect",
        image: "/images/NB_black_512px.png",
        bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    },
    {
        name: "Design Lead",
        role: "Interior Designer",
        image: "/images/profile_picture_blck.jpg",
        bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    },
    {
        name: "Drafter Pro",
        role: "AutoCAD Specialist",
        image: "/images/NB_black_512px.png",
        bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    },
    {
        name: "Creative Director",
        role: "Digital Creator",
        image: "/images/profile_picture_blck.jpg",
        bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    },
];

export function Team() {
    return (
        <section id="team" className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-green-500 font-semibold tracking-wider uppercase text-sm border border-green-500/30 bg-green-500/10 px-4 py-1.5 rounded-full">
                        The Notion Black Members
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-white">Our Team</h2>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="w-full relative"
                >
                    <CarouselContent className="-ml-4">
                        {teamMembers.map((member, index) => (
                            <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/4">
                                <div className="group bg-card border border-white/5 hover:border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2">
                                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white/5 group-hover:ring-white/10 transition-all duration-300">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <span className="text-sm font-medium tracking-wider uppercase text-green-500 mb-4 block">
                                        {member.role}
                                    </span>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                        {member.bio}
                                    </p>

                                    <div className="flex justify-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-green-600 hover:text-white transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-green-600 hover:text-white transition-colors">
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-green-600 hover:text-white transition-colors">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-green-600 hover:text-white transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-12 gap-4">
                        <CarouselPrevious className="position-relative translate-y-0 left-0 bg-white/5 border-white/10 text-white hover:bg-white/10" />
                        <CarouselNext className="position-relative translate-y-0 right-0 bg-white/5 border-white/10 text-white hover:bg-white/10" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
