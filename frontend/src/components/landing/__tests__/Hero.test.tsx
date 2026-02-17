import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

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

jest.mock("next/image", () => {
    return function MockImage(props: Record<string, unknown>) {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />;
    };
});

describe("Hero", () => {
    beforeEach(() => {
        render(<Hero />);
    });

    it("renders without crashing", () => {
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("displays the headline", () => {
        expect(screen.getByText(/Your Imagination,/)).toBeInTheDocument();
        expect(screen.getByText("Architected.")).toBeInTheDocument();
    });

    it("contains Enter the Editor CTA linking to /signup", () => {
        const cta = screen.getByText("Enter the Editor");
        expect(cta).toBeInTheDocument();
        expect(cta.closest("a")).toHaveAttribute("href", "/signup");
    });

    it("contains Watch Demo button", () => {
        expect(screen.getByText("Watch Demo")).toBeInTheDocument();
    });

    it("renders the editor mockup with Capital City node", () => {
        expect(screen.getByText("Capital City")).toBeInTheDocument();
    });

    it("renders sidebar with Assets label", () => {
        expect(screen.getByText("Assets")).toBeInTheDocument();
    });

    it("renders the Properties inspector panel", () => {
        expect(screen.getByText("Properties")).toBeInTheDocument();
    });

    it("renders linked nodes", () => {
        expect(screen.getByText("Iron District")).toBeInTheDocument();
        expect(screen.getByText("Cloud Gardens")).toBeInTheDocument();
    });

    it("renders AI Suggestion node", () => {
        expect(screen.getByText("AI Suggestion")).toBeInTheDocument();
    });
});
