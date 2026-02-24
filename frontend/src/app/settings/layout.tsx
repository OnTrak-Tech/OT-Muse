import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen flex overflow-hidden">
            {/* We reuse the DashboardHeader, but we don't need the main Sidebar here.
                Instead, we have our own SettingsSidebar and a flex layout. */}

            <div className="flex flex-col w-full h-screen">
                <DashboardHeader
                    breadcrumbItems={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Settings" }
                    ]}
                />

                <div className="flex flex-1 overflow-hidden h-full">
                    <SettingsSidebar />
                    {/* The specific settings page content goes here */}
                    {children}
                </div>
            </div>
        </div>
    );
}
