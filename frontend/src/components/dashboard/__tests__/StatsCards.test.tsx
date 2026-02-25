import React from "react";
import { render, screen } from "@testing-library/react";
import StatsCards from "../StatsCards";

describe("StatsCards", () => {
    it("renders the Total Worlds stat card", () => {
        render(<StatsCards totalWorlds={12} />);
        expect(screen.getByText("Total Worlds")).toBeInTheDocument();
        expect(screen.getByText("12")).toBeInTheDocument();
        // Since there are multiple trends, just finding the exact text
        expect(screen.getByText("12 created")).toBeInTheDocument();
    });

    it("renders the Generations stat card", () => {
        render(<StatsCards totalGenerations={8402} />);
        expect(screen.getByText("Generations")).toBeInTheDocument();
        expect(screen.getByText("8,402")).toBeInTheDocument();
        expect(screen.getByText("Assets created across all worlds")).toBeInTheDocument();
    });
});
