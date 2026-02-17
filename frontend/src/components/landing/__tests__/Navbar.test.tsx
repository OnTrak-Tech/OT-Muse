import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

// Mock next/link to render as a simple anchor
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

describe("Navbar", () => {
    beforeEach(() => {
        render(<Navbar />);
    });

    it("renders without crashing", () => {
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("displays OT-Muse brand name", () => {
        expect(screen.getByText("OT-Muse")).toBeInTheDocument();
    });

    it("does not contain Nova Muse", () => {
        expect(screen.queryByText(/Nova Muse/i)).not.toBeInTheDocument();
    });

    it("contains all navigation links", () => {
        expect(screen.getByText("Features")).toBeInTheDocument();
        expect(screen.getByText("Pricing")).toBeInTheDocument();
        expect(screen.getByText("Community")).toBeInTheDocument();
        expect(screen.getByText("Docs")).toBeInTheDocument();
    });

    it("has correct nav link hrefs", () => {
        expect(screen.getByText("Features").closest("a")).toHaveAttribute(
            "href",
            "#features"
        );
        expect(screen.getByText("Pricing").closest("a")).toHaveAttribute(
            "href",
            "/pricing"
        );
        expect(screen.getByText("Community").closest("a")).toHaveAttribute(
            "href",
            "/community"
        );
        expect(screen.getByText("Docs").closest("a")).toHaveAttribute(
            "href",
            "/docs"
        );
    });

    it("has Sign In and Start Building CTA buttons", () => {
        expect(screen.getByText("Sign In")).toBeInTheDocument();
        expect(screen.getByText("Start Building")).toBeInTheDocument();
    });

    it("Start Building links to /signup", () => {
        expect(screen.getByText("Start Building").closest("a")).toHaveAttribute(
            "href",
            "/signup"
        );
    });

    it("Sign In links to /login", () => {
        expect(screen.getByText("Sign In").closest("a")).toHaveAttribute(
            "href",
            "/login"
        );
    });
});
