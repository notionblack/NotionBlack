import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export const metadata = {
    title: "Thank You | Notion Black",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 border border-green-500/30 rounded-full animate-ping" />
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Request Received</h1>
                <p className="text-white/70 mb-8 leading-relaxed">
                    Thank you for reaching out to Notion Black. Our team will review your project details and get back to you shortly.
                </p>

                <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-none border border-white/20 bg-transparent px-8 text-sm font-semibold text-white transition-colors hover:bg-white/5 hover:border-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
}
