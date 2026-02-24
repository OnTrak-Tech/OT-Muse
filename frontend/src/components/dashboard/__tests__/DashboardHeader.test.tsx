import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardHeader from "../DashboardHeader";

describe("DashboardHeader", () => {
    it("renders custom breadcrumb items securely", () => {
        render(
            <DashboardHeader
                breadcrumbItems={[
                    { label: "Home", href: "/" },
                    { label: "Current Page" }
                ]}
            />
        );

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("renders the 'Create New World' button correctly", () => {
        render(<DashboardHeader breadcrumbItems={[]} />);
        const createBtn = screen.getByRole("link", { name: /create new world/i });
        expect(createBtn).toBeInTheDocument();
        expect(createBtn).toHaveAttribute("href", "/worlds/create");
    });

    it("renders the search input field with correct placeholder", () => {
        render(<DashboardHeader breadcrumbItems={[]} />);
        const searchInput = screen.getByPlaceholderText("Search worlds...");
        expect(searchInput).toBeInTheDocument();
    });

    it("renders the notification button", () => {
        render(<DashboardHeader breadcrumbItems={[]} />);
        // Checking for the material icon text 'notifications'
        const notificationIcon = screen.getByText("notifications");
        expect(notificationIcon).toBeInTheDocument();
        // The button itself
        const button = notificationIcon.closest("button");
        expect(button).toBeInTheDocument();
    });
});
