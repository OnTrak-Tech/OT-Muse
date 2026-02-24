import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WorldFilters from "../WorldFilters";

describe("WorldFilters", () => {
    it("renders the filter buttons", () => {
        render(<WorldFilters />);

        expect(screen.getByRole("button", { name: "All Worlds" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Favorites" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Shared with Me" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Archived" })).toBeInTheDocument();
    });

    it("changes active state when clicking a filter button", () => {
        render(<WorldFilters />);

        const allWorldsBtn = screen.getByRole("button", { name: "All Worlds" });
        const favoritesBtn = screen.getByRole("button", { name: "Favorites" });

        // Initial state
        expect(allWorldsBtn).toHaveClass("bg-primary");
        expect(favoritesBtn).not.toHaveClass("bg-primary");

        // Click favorites
        fireEvent.click(favoritesBtn);

        // New state
        expect(allWorldsBtn).not.toHaveClass("bg-primary");
        expect(favoritesBtn).toHaveClass("bg-primary");
    });

    it("renders sort and view controls", () => {
        render(<WorldFilters />);
        expect(screen.getByText("Sort by:")).toBeInTheDocument();
        expect(screen.getByText("Last Modified")).toBeInTheDocument();

        // View toggles
        expect(screen.getByTitle("Grid View")).toBeInTheDocument();
        expect(screen.getByTitle("List View")).toBeInTheDocument();
    });
});
