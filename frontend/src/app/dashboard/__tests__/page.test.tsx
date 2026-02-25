import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "../page";
import { worldsApi } from "@/lib/api";

// Mock next-auth
jest.mock("next-auth/react", () => ({
    useSession: () => ({ data: { user: { archetype: "Sci-Fi" } }, status: "authenticated" }),
}));

// Mock the API
jest.mock("@/lib/api", () => ({
    worldsApi: {
        list: jest.fn(),
    },
}));

// Mock child components
jest.mock("@/components/dashboard/StatsCards", () => {
    return function MockStatsCards() {
        return <div data-testid="mock-stats">Stats Cards</div>;
    };
});

jest.mock("@/components/dashboard/WorldFilters", () => {
    return function MockWorldFilters() {
        return <div data-testid="mock-filters">World Filters</div>;
    };
});

jest.mock("@/components/dashboard/WorldCard", () => {
    return function MockWorldCard({ title }: { title: string }) {
        return <div data-testid="world-card">{title}</div>;
    };
});

describe("DashboardPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the page with StatsCards and WorldFilters", async () => {
        (worldsApi.list as jest.Mock).mockResolvedValue({ worlds: [], totalCount: 0 });
        render(<DashboardPage />);
        expect(screen.getByTestId("mock-stats")).toBeInTheDocument();
        expect(screen.getByTestId("mock-filters")).toBeInTheDocument();
    });

    it("renders loading state initially, then a grid of WorldCards when data loads", async () => {
        (worldsApi.list as jest.Mock).mockResolvedValue({
            worlds: [
                { worldId: "1", title: "Neo-Veridia Prime", style: "Sci-Fi", collaboratorCount: 1, generationCount: 0, updatedAt: new Date().toISOString() },
                { worldId: "2", title: "The Whispering Glades", style: "Fantasy", collaboratorCount: 2, generationCount: 10, updatedAt: new Date().toISOString() },
            ],
            totalCount: 2
        });

        render(<DashboardPage />);

        // Wait for loading to finish and worlds to render
        await waitFor(() => {
            const cards = screen.queryAllByTestId("world-card");
            expect(cards).toHaveLength(2);
        });

        expect(screen.getByText("Neo-Veridia Prime")).toBeInTheDocument();
        expect(screen.getByText("The Whispering Glades")).toBeInTheDocument();
    });

    it("renders the 'Start a New World' placeholder card", async () => {
        (worldsApi.list as jest.Mock).mockResolvedValue({
            worlds: [
                { worldId: "1", title: "Test World", style: "Sci-Fi", collaboratorCount: 1, generationCount: 0, updatedAt: new Date().toISOString() },
            ],
            totalCount: 1
        });

        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByTestId("world-card")).toBeInTheDocument();
        });

        const createCard = screen.getByRole("link", { name: /create world/i });
        expect(createCard).toBeInTheDocument();
        expect(createCard).toHaveAttribute("href", "/worlds/create");
    });
});
