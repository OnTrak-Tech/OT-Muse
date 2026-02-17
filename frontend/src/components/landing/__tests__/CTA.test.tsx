import { render, screen } from "@testing-library/react";
import CTA from "../CTA";

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

describe("CTA", () => {
    beforeEach(() => {
        render(<CTA />);
    });

    it("renders without crashing", () => {
        expect(
            screen.getByText("Start building your universe today.")
        ).toBeInTheDocument();
    });

    it("contains OT-Muse in body text", () => {
        expect(screen.getByText(/OT-Muse/)).toBeInTheDocument();
    });

    it("does not contain Nova Muse", () => {
        expect(screen.queryByText(/Nova Muse/i)).not.toBeInTheDocument();
    });

    it("has Get Started for Free link to /signup", () => {
        const link = screen.getByText("Get Started for Free");
        expect(link).toBeInTheDocument();
        expect(link.closest("a")).toHaveAttribute("href", "/signup");
    });

    it("has View Enterprise Plans link to /pricing", () => {
        const link = screen.getByText("View Enterprise Plans");
        expect(link).toBeInTheDocument();
        expect(link.closest("a")).toHaveAttribute("href", "/pricing");
    });
});
