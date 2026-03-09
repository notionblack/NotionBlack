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
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl mx-auto bg-card border border-white/10 p-12 rounded-2xl shadow-2xl backdrop-blur-xl"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
                    <p className="text-white/70 text-lg mb-8">
                        Your request has been submitted successfully. Our team will review your details and get back to you shortly.
                    </p>

                    <div className="space-y-6">
                        <div className="text-sm text-white/40 font-mono">
                            Redirecting to home in <span className="text-green-500 font-bold">{countdown}</span> seconds...
                        </div>

                        <Link
                            href="/"
                            className="inline-flex h-12 items-center justify-center rounded-none bg-green-500 px-8 text-sm font-semibold text-background transition-colors hover:bg-green-400"
                        >
                            Return Home Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
