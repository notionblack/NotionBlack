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
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { teamMembers } from "@/lib/teamData";

export function Team() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section id="team" className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-green-500 font-semibold tracking-wider uppercase text-sm border border-green-500/30 bg-green-500/10 px-4 py-1.5 rounded-full">
                        The Notion Black Members
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-foreground">Our Team</h2>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[plugin.current]}
                    className="w-full relative"
                >
                    <CarouselContent className="-ml-4">
                        {teamMembers.map((member, index) => (
                            <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/4">
                                <Link href={`/team/${member.slug}`} className="block group bg-card border border-border hover:border-green-500/50 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2">
                                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-border group-hover:ring-green-500/20 transition-all duration-300">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                                    <span className="text-sm font-medium tracking-wider uppercase text-green-500 mb-4 block">
                                        {member.role}
                                    </span>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3 h-20">
                                        {member.bio}
                                    </p>
                                    <div className="text-green-500 font-medium text-sm flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        View Profile <span>&rarr;</span>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-12 gap-4">
                        <CarouselPrevious className="position-relative translate-y-0 left-0 bg-background border-border text-foreground hover:bg-muted" />
                        <CarouselNext className="position-relative translate-y-0 right-0 bg-background border-border text-foreground hover:bg-muted" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
