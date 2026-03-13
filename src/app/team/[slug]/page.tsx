import { teamMembers } from "@/lib/teamData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Target } from "lucide-react";

export function generateStaticParams() {
    return teamMembers.map((member) => ({
        slug: member.slug,
    }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const member = teamMembers.find((m) => m.slug === resolvedParams.slug);

    if (!member) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-white pb-24 pt-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/#team"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-green-500 transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Team
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left Column: Image and Role */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0 lg:w-full lg:h-auto lg:aspect-square mb-8 rounded-full lg:rounded-3xl overflow-hidden ring-4 ring-white/5 shadow-2xl shadow-green-900/20">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent hidden lg:block" />
                            </div>

                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{member.name}</h1>
                                <span className="inline-block px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 font-semibold tracking-wider uppercase text-sm mb-6">
                                    {member.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-8 space-y-16 mt-8 lg:mt-0">
                        {/* Bio Section */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-white/90 border-b border-white/10 pb-4">
                                About
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                {member.bio}
                            </p>
                        </section>

                        {/* Responsibilities */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-white/90 border-b border-white/10 pb-4 flex items-center gap-3">
                                <Target className="w-6 h-6 text-green-500" />
                                Core Responsibilities
                            </h2>
                            <ul className="space-y-4">
                                {member.responsibilities.map((resp, index) => (
                                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="mt-1 flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        </div>
                                        <p className="text-white/80 leading-relaxed">{resp}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Technical Skills */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-white/90 border-b border-white/10 pb-4">
                                Technical Skills
                            </h2>
                            <div className="flex w-full flex-wrap gap-3">
                                {member.technicalSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-medium hover:bg-green-500/20 hover:border-green-500/40 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
