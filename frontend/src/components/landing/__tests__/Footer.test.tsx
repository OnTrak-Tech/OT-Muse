import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

jest.mock("next/link", () => {
    return function MockLink({
        children,
        href,
        ...rest
    }: {
        children: React.ReactNode;
        href: string;
        [key: string]: unknown;
    }) {
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        );
    };
});

describe("Footer", () => {
    beforeEach(() => {
        render(<Footer />);
    });

    it("renders without crashing", () => {
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("displays OT-Muse brand name", () => {
        expect(screen.getByText("OT-Muse")).toBeInTheDocument();
    });

    it("does not contain Nova Muse", () => {
        expect(screen.queryByText(/Nova Muse/i)).not.toBeInTheDocument();
    });

    it("contains copyright text with current year", () => {
        expect(
            screen.getByText(/© 2026 OT-Muse\. All rights reserved\./)
        ).toBeInTheDocument();
    });

    it("has all footer column headings", () => {
        expect(screen.getByText("Product")).toBeInTheDocument();
        expect(screen.getByText("Resources")).toBeInTheDocument();
        expect(screen.getByText("Company")).toBeInTheDocument();
    });

    it("has social media links with aria-labels", () => {
        expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
        expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
        expect(screen.getByLabelText("Discord")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("has Privacy Policy and Terms of Service links", () => {
        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
        expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    });

    it("Privacy Policy links to /privacy", () => {
        expect(
            screen.getByText("Privacy Policy").closest("a")
        ).toHaveAttribute("href", "/privacy");
    });

    it("Terms of Service links to /terms", () => {
        expect(
            screen.getByText("Terms of Service").closest("a")
        ).toHaveAttribute("href", "/terms");
    });
});
