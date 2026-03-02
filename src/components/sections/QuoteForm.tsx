"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function QuoteForm() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="bg-card border border-white/10 rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full"></div>
            <div className="relative z-10">
                <h3 className="text-sm font-semibold text-green-500 tracking-wider uppercase mb-2">
                    Be Part of our Business
                </h3>
                <h2 className="text-3xl font-bold text-white mb-8">Request A Quote</h2>

                <form
                    action="https://formsubmit.co/ntabisonkomo111@gmail.com"
                    method="POST"
                    onSubmit={() => setIsLoading(true)}
                    className="space-y-6"
                >
                    {/* FormSubmit Configuration */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value="http://127.0.0.1:3000/thank-you" />
                    <input type="hidden" name="_subject" value="New Quote Request" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="first_name" className="text-white/80">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                required
                                className="bg-background/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-green-500/50"
                                placeholder="John"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name" className="text-white/80">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                type="text"
                                required
                                className="bg-background/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-green-500/50"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service" className="text-white/80">Choose your Service</Label>
                        <Select name="service" required>
                            <SelectTrigger className="bg-background/50 border-white/10 text-white focus:ring-green-500/50">
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-white/10 text-white">
                                <SelectItem value="Architectural Design">Architectural Design</SelectItem>
                                <SelectItem value="Renovation">Renovation</SelectItem>
                                <SelectItem value="Interior Design">Interior Design</SelectItem>
                                <SelectItem value="Exterior Design">Exterior Design</SelectItem>
                                <SelectItem value="Website Development">Website Development</SelectItem>
                                <SelectItem value="AutoCAD Development">AutoCAD Development</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white/80">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="bg-background/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-green-500/50"
                            placeholder="+27 00 000 0000"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-white/80">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="bg-background/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-green-500/50 resize-none"
                            placeholder="Tell us about your project..."
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 h-12 text-lg"
                    >
                        {isLoading ? "Sending..." : "Request A Quote"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
