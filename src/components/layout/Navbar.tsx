"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Team", href: "/#team" },
    { name: "Contact", href: "/#contact" },
];

import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname === "/quote") return null;

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 no-print ${isScrolled
                ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-sm"
                : "bg-black/40 backdrop-blur-sm"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/images/logo_final.png"
                                alt="Notion Black logo"
                                width={64}
                                height={64}
                                className="w-16 h-16 object-contain"
                            />
                            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                                Notion Black
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                            <Link href="/#contact">Request a quote</Link>
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="p-2 text-white/80 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-white/10">
                    <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6 flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-4 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 px-3">
                            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                                <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                                    Request a quote
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
