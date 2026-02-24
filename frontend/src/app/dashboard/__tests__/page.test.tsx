import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../page";

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
    it("renders the page with StatsCards and WorldFilters", () => {
        render(<DashboardPage />);
        expect(screen.getByTestId("mock-stats")).toBeInTheDocument();
        expect(screen.getByTestId("mock-filters")).toBeInTheDocument();
    });

    it("renders a grid of WorldCards with mock data", () => {
        render(<DashboardPage />);
        const cards = screen.getAllByTestId("world-card");
        expect(cards).toHaveLength(4);

        expect(screen.getByText("Neo-Veridia Prime")).toBeInTheDocument();
        expect(screen.getByText("The Whispering Glades")).toBeInTheDocument();
        expect(screen.getByText("Outpost 7: Mars")).toBeInTheDocument();
        expect(screen.getByText("Gearheart City")).toBeInTheDocument();
    });

    it("renders the 'Start a New World' placeholder card", () => {
        render(<DashboardPage />);
        const createCard = screen.getByRole("link", { name: /start a new world/i });
        expect(createCard).toBeInTheDocument();
        expect(createCard).toHaveAttribute("href", "/worlds/create");
    });
});
