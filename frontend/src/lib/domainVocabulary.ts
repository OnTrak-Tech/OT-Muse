/**
 * Domain-adaptive vocabulary configuration.
 *
 * The user's onboarding archetype changes all user-facing labels
 * while the underlying data model stays the same ("worlds" internally).
 */

export interface DomainVocabulary {
    /** What a "world" is called (e.g. "Project", "Campaign") */
    world: string;
    /** Plural form */
    worlds: string;
    /** CTA for creating a new world */
    createWorld: string;
    /** Page title for the create page */
    createPageTitle: string;
    /** Page subtitle */
    createPageSubtitle: string;
    /** What a graph "node" is called */
    node: string;
    /** What "lore" is called */
    lore: string;
    /** What "factions" are called */
    factions: string;
    /** Placeholder prompt text */
    promptHint: string;
    /** CTA on the generate button */
    generateCta: string;
    /** Accepted file extensions for uploads */
    uploadExtensions: string[];
    /** Icon for the Material Symbols set */
    icon: string;
}

const vocabularies: Record<string, DomainVocabulary> = {
    "Architecture": {
        world: "Project",
        worlds: "Projects",
        createWorld: "New Design",
        createPageTitle: "Design Your Vision",
        createPageSubtitle: "Describe the building, site, or space you want to explore. The Nova Engine will generate concept art, layouts, and spatial data.",
        node: "Zone",
        lore: "Design Brief",
        factions: "Stakeholders",
        promptHint: "A sustainable mixed-use waterfront district with terraced green rooftops, pedestrian bridges, and a central market pavilion bathed in golden-hour light...",
        generateCta: "GENERATE DESIGN",
        uploadExtensions: [".dwg", ".dxf", ".pdf", ".ifc", ".jpg", ".png"],
        icon: "location_city",
    },
    "Game Dev": {
        world: "World",
        worlds: "Worlds",
        createWorld: "Create World",
        createPageTitle: "Architect Your Reality",
        createPageSubtitle: "Describe the foundations of your universe. The Nova Engine will extrapolate the history, geography, and inhabitants.",
        node: "Location",
        lore: "Lore & History",
        factions: "Factions",
        promptHint: "A floating city above the clouds with crystal bridges and wind-powered engines, where rival sky-pirate guilds clash over ancient relics...",
        generateCta: "GENERATE WORLD",
        uploadExtensions: [".fbx", ".obj", ".png", ".psd", ".jpg"],
        icon: "sports_esports",
    },
    "Tabletop & Creative Writing": {
        world: "Campaign",
        worlds: "Campaigns",
        createWorld: "Start Campaign",
        createPageTitle: "Forge Your Campaign",
        createPageSubtitle: "Describe your story's setting. The Nova Engine will create the geography, factions, NPCs, and backstory.",
        node: "Region",
        lore: "Backstory & NPCs",
        factions: "Factions & Guilds",
        promptHint: "A cursed mountain range where dwarven tunnels have breached into a forgotten underworld of sentient crystal entities and fungal forests...",
        generateCta: "FORGE CAMPAIGN",
        uploadExtensions: [".pdf", ".png", ".jpg"],
        icon: "menu_book",
    },
    "Urban Planning": {
        world: "District Plan",
        worlds: "District Plans",
        createWorld: "New Plan",
        createPageTitle: "Plan Your District",
        createPageSubtitle: "Describe the urban environment you want to design. The Nova Engine will generate zoning layouts, infrastructure, and demographic data.",
        node: "Block",
        lore: "Zoning Data",
        factions: "Agencies",
        promptHint: "A 15-minute city centered on a light-rail hub with mixed-income housing, a community park, and a pedestrian-first commercial corridor...",
        generateCta: "GENERATE PLAN",
        uploadExtensions: [".shp", ".geojson", ".pdf", ".kml", ".jpg", ".png"],
        icon: "alt_route",
    },
    "Other": {
        world: "Project",
        worlds: "Projects",
        createWorld: "New Project",
        createPageTitle: "Build Your Project",
        createPageSubtitle: "Describe what you want to create. The Nova Engine will generate content, visuals, and structure.",
        node: "Element",
        lore: "Description",
        factions: "Groups",
        promptHint: "Describe your project in detail...",
        generateCta: "GENERATE",
        uploadExtensions: [".pdf", ".png", ".jpg"],
        icon: "dashboard_customize",
    },
};

// Default fallback if archetype is not recognized
const DEFAULT_ARCHETYPE = "Game Dev";

/**
 * Get the vocabulary for a given archetype.
 * Falls back to "Game Dev" if archetype is not recognized.
 */
export function getVocabulary(archetype?: string | null): DomainVocabulary {
    if (!archetype) return vocabularies[DEFAULT_ARCHETYPE];
    return vocabularies[archetype] ?? vocabularies[DEFAULT_ARCHETYPE];
}

/**
 * Get all available archetypes (for onboarding or switcher UI).
 */
export function getArchetypes(): { key: string; label: string; icon: string }[] {
    return Object.entries(vocabularies).map(([key, vocab]) => ({
        key,
        label: key,
        icon: vocab.icon,
    }));
}

export default vocabularies;
