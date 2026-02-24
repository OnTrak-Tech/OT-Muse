import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 lg:ml-72 flex flex-col h-screen relative">
                <DashboardHeader breadcrumbItems={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Worlds" }]} />
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
