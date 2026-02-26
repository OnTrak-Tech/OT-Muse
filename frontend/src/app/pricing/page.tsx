import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PricingCards from "@/components/landing/PricingCards";
import FAQSection from "@/components/landing/FAQSection";
import TrustedBy from "@/components/landing/TrustedBy";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | Nova Muse",
    description: "Choose the perfect plan for your storytelling needs. From solo creators to studio teams, we scale with your imagination.",
};

export default function PricingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
            <Navbar />

            <main className="flex-grow pt-32 lg:pt-40 relative overflow-hidden">
                {/* Background Ambient Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] pointer-events-none z-0">
                    <div className="absolute top-20 left-1/3 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-40"></div>
                    <div className="absolute top-40 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] opacity-30"></div>
                </div>

                <PricingCards />

                <TrustedBy />

                <FAQSection />
            </main>

            <Footer />
        </div>
    );
}
