import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OnboardingClient from "../OnboardingClient";

// Mock the router
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock the server action
jest.mock("@/app/actions/user", () => ({
    saveUserArchetype: jest.fn().mockResolvedValue({ success: true }),
}));

describe("OnboardingClient", () => {
    it("renders all archetype options", () => {
        render(<OnboardingClient />);

        expect(screen.getByText("Architecture & Real Estate")).toBeInTheDocument();
        expect(screen.getByText("Game Studios & Indie Devs")).toBeInTheDocument();
        expect(screen.getByText("Urban Planning & Civil")).toBeInTheDocument();
        expect(screen.getByText("Creatives, Authors & Tabletop")).toBeInTheDocument();
        expect(screen.getByText("Other / Custom")).toBeInTheDocument();
    });

    it("button is disabled initially", () => {
        render(<OnboardingClient />);
        const button = screen.getByRole("button", { name: /Continue to Dashboard/i });
        expect(button).toBeDisabled();
    });

    it("enables button when an archetype is selected", () => {
        render(<OnboardingClient />);

        // Click Architecture
        const archCard = screen.getByText("Architecture & Real Estate").closest("button")!;
        fireEvent.click(archCard);

        const button = screen.getByRole("button", { name: /Continue to Dashboard/i });
        expect(button).not.toBeDisabled();
    });

    it("applies selected styling to the clicked archetype", () => {
        render(<OnboardingClient />);

        const archCard = screen.getByText("Architecture & Real Estate").closest("button")!;
        const gameCard = screen.getByText("Game Studios & Indie Devs").closest("button")!;

        // Click Game Dev
        fireEvent.click(gameCard);

        expect(gameCard).toHaveClass("border-primary");
        expect(archCard).not.toHaveClass("border-primary");
    });
});
