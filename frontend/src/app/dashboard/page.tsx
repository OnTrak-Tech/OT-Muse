import React from "react";
import StatsCards from "@/components/dashboard/StatsCards";
import WorldFilters from "@/components/dashboard/WorldFilters";
import WorldCard from "@/components/dashboard/WorldCard";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Worlds | OT-Muse",
    description: "Manage your AI-generated worlds in OT-Muse",
};

export default function DashboardPage() {
    // Mock data based on the original HTML mockups
    const worlds = [
        {
            id: "w-1",
            title: "Neo-Veridia Prime",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7kTTiFi9oB6z06zCGXUDgDnf5GXlP6jlUz1GB7ciqWW8re16ICT3x1K_ZxctsBWg51P7oMZut3q1kdpWkhNQgUE4jYy9wqA6DWP3w4t4fCczknd-pdDS7v1aqaamSMDHoU7aW-ECTVVe_nyTOMkI9ytf8ZvsUjLJ4IQl0Yh-Sm6_A-no_gHKYedGiMX-szSBvNC2unRQsyrEnh6E1xS6Z1ORMoIX1_KKpNmqV2uvuhmtgcqr3KszoWGTXml6rbC5AfPP-7GHSclM",
            theme: "Sci-Fi",
            lastEdited: "Edited 2 hours ago",
            collaboratorCount: 3,
            generationCount: 142
        },
        {
            id: "w-2",
            title: "The Whispering Glades",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL-Yc_1vrzdKX5Mb3h5bC7_StsauWC3eYJdrEHySqoXrdvd9kZJULHdkd-zydl3ILem7-l30H3ACyjji6KTNdXP3ow_kw6AQ5WJvTMiezJY0bzKQrz0qlshmTTQmUt1IVlsUkaOj4reOdF4AKpkC0RpUJFiPEPFhDub0wKhsc7MYYbAZPlCehB1hN8LPsR9ERKXucqnR_DxAigbD_E0lZ_KUT9yvCNJ2Tq593m2AgcECDjTioZUlK7yIrJ_Y17BVTRwpGoumcgYxw",
            theme: "Fantasy",
            lastEdited: "Edited 1 day ago",
            collaboratorCount: 1,
            generationCount: 45
        },
        {
            id: "w-3",
            title: "Outpost 7: Mars",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIK3vUS8BrmhS5Z7NIVTzjQUAASWLD5HDC8YN5AosZil7FOH0a_tBxRGI9axZ0DSQiCW2V57WlLNDvVbBDT7uL4wfxlRH4ckATRDojEu322i36DtPRf0QRz3itctwR-LBgmxt0leWEOOfC66uRD4u-C1lVsr8olKOU2G-EtilUcsDU7n22uuWSHpUVGVUx7oltMB4vG1B6a00rzKnPE6XXEc8Eu4gdbtunQ6DACmWLFW0j683_PEHx_gnsPFfG00mL9TNzUEAwfRs",
            theme: "Space Opera",
            lastEdited: "Edited 3 days ago",
            collaboratorCount: 5,
            generationCount: 312
        },
        {
            id: "w-4",
            title: "Gearheart City",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0UuB2x9k0khjjjeJcz1uL1r8HVDLm9QVJGhGpA-T2Kn3wrz-sZoMn06PuxGU3_TbE54qi3ju7PblD-7_Ke5QggMPp42Rxs-QqbbwqutqU4axBLfpTH70CDVH4ELUg0aZ-d6fkRzgGjJF9u0wO9qU_P6B28NLbC-dMTlwqhwSIQQ1Du3HG_K_humHo2-r207LImLB-UZ2DEvHONhSIeq-xP8NdlCfwrx2aOpJgW7zDtqPAmzpwMY0RwtRMQibHOXc3pphYu8w-ID8",
            theme: "Steampunk",
            lastEdited: "Edited last week",
            collaboratorCount: 2,
            generationCount: 89
        }
    ];

    return (
        <div className="pb-10">
            <StatsCards />
            <WorldFilters />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {worlds.map((world) => (
                    <WorldCard key={world.id} {...world} />
                ))}

                {/* Create New Card (Placeholder) */}
                <Link
                    href="/worlds/create"
                    className="group bg-transparent rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center h-full min-h-[340px]"
                >
                    <div className="w-16 h-16 rounded-full bg-surface-elevated group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-text-muted group-hover:text-primary">add</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Start a New World</h3>
                    <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors text-center px-8">
                        Generate a setting from scratch or use a template
                    </p>
                </Link>
            </div>
        </div>
    );
}
