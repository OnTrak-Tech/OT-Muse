import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateWorldPage from "../page";

// Mock next-auth
jest.mock("next-auth/react", () => ({
    useSession: () => ({ data: { user: { archetype: "Sci-Fi" } }, status: "authenticated" }),
}));

// Mock child components
jest.mock("@/components/dashboard/Sidebar", () => {
    return function MockSidebar() {
        return <div data-testid="mock-sidebar">Sidebar</div>;
    };
});

jest.mock("@/components/dashboard/DashboardHeader", () => {
    return function MockDashboardHeader() {
        return <div data-testid="mock-header">Header</div>;
    };
});

describe("CreateWorldPage", () => {
    it("renders layout containing sidebar and header", () => {
        render(<CreateWorldPage />);
        expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("renders the page title and description", () => {
        render(<CreateWorldPage />);
        expect(screen.getByRole("heading", { name: "Architect Your Reality" })).toBeInTheDocument();
        expect(screen.getByText(/Describe the foundations of your universe/i)).toBeInTheDocument();
    });

    it("updates prompt state when typing in the textarea", () => {
        render(<CreateWorldPage />);
        const textarea = screen.getByPlaceholderText(/In a realm where gravity is optional/i) as HTMLTextAreaElement;

        fireEvent.change(textarea, { target: { value: "A futuristic city under a dome." } });
        expect(textarea.value).toBe("A futuristic city under a dome.");
    });

    it("displays the default archetype and a change button", () => {
        render(<CreateWorldPage />);

        // Verify the default "Sci-Fi" archetype card is visible
        const scifiText = screen.getByText("Sci-Fi");
        const scifiCard = scifiText.closest("button");
        expect(scifiCard).toBeInTheDocument();
        expect(scifiCard).toHaveClass("border-primary");

        // Verify the "Change" button is present
        const changeText = screen.getByText("Change");
        const changeBtn = changeText.closest("button");
        expect(changeBtn).toBeInTheDocument();
    });

    it("toggles the advanced configuration accordion", () => {
        render(<CreateWorldPage />);

        const advancedBtn = screen.getByRole("button", { name: /Advanced Configuration/i });
        expect(screen.queryByText(/Advanced settings parameters will be available/i)).not.toBeInTheDocument();

        // Open accordion
        fireEvent.click(advancedBtn);
        expect(screen.getByText(/Advanced settings parameters will be available/i)).toBeInTheDocument();

        // Close accordion
        fireEvent.click(advancedBtn);
        expect(screen.queryByText(/Advanced settings parameters will be available/i)).not.toBeInTheDocument();
    });

    it("renders the primary generate button", () => {
        render(<CreateWorldPage />);
        const generateBtn = screen.getByRole("button", { name: /auto_awesome GENERATE WORLD/i });
        expect(generateBtn).toBeInTheDocument();
    });
});
