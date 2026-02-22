import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div data-testid="dashboard-layout" className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
