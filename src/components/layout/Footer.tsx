"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    if (pathname === "/quote") return null;

    return (
        <footer className="bg-background pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-tight text-white">Notion Black</h3>
                        <p className="text-white/70 leading-relaxed text-sm">
                            A creative design studio dedicated to bringing modern, meaningful, and timeless solutions to individuals and businesses. Built on creativity, guided by precision.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-green-600 hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-green-600 hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-green-600 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/notion-black-archviz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-green-600 hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6 lg:ml-8">
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/#home" className="text-white/70 hover:text-white text-sm transition-colors">Home</Link></li>
                            <li><Link href="/#about" className="text-white/70 hover:text-white text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="text-white/70 hover:text-white text-sm transition-colors">Services</Link></li>
                            <li><Link href="/#projects" className="text-white/70 hover:text-white text-sm transition-colors">Projects</Link></li>
                            <li><Link href="/#team" className="text-white/70 hover:text-white text-sm transition-colors">Our Team</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Our Services</h3>
                        <ul className="space-y-3">
                            <li className="text-white/70 text-sm">Architectural Design</li>
                            <li className="text-white/70 text-sm">Renovation Planning</li>
                            <li className="text-white/70 text-sm">Interior Design Concepts</li>
                            <li className="text-white/70 text-sm">Exterior Visuals</li>
                            <li className="text-white/70 text-sm">Website Development</li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-white/70 text-sm">Kathu, Northern Cape, South Africa</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-white/70 text-sm">083 899 8618</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-white/70 text-sm">notionblack@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Notion Black Design Studio. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-white/50 hover:text-white text-xs transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-white/50 hover:text-white text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
