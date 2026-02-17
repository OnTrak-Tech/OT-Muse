import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../page";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useSearchParams: () => new URLSearchParams(),
}));

describe("LoginPage", () => {
    it("renders without crashing", () => {
        render(<LoginPage />);
    });

    it("displays the hero image with correct alt text", () => {
        render(<LoginPage />);
        const heroImage = screen.getByAltText(/Futuristic glowing AI city landscape/i);
        expect(heroImage).toBeInTheDocument();
    });

    it("displays OT-Muse branding", () => {
        render(<LoginPage />);
        const brandingElements = screen.getAllByText(/OT-Muse/i);
        expect(brandingElements.length).toBeGreaterThan(0);
    });

    it("displays the quote", () => {
        render(<LoginPage />);
        expect(screen.getByText(/The universe is not made of atoms/i)).toBeInTheDocument();
        expect(screen.getByText(/The Architect/i)).toBeInTheDocument();
    });

    it("displays the login form header", () => {
        render(<LoginPage />);
        expect(screen.getByRole("heading", { name: /Enter the Nexus/i })).toBeInTheDocument();
    });

    it("displays email and password inputs", () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it("displays Forgot Password link", () => {
        render(<LoginPage />);
        const link = screen.getByText(/Forgot Password\?/i);
        expect(link).toBeInTheDocument();
        expect(link.closest("a")).toHaveAttribute("href", "/forgot-password");
    });

    it("displays Log In button", () => {
        render(<LoginPage />);
        expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
    });

    it("displays Sign Up link in footer", () => {
        render(<LoginPage />);
        const link = screen.getByRole("link", { name: /Sign Up/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/signup");
    });

    it("renders social auth buttons", () => {
        render(<LoginPage />);
        expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
        expect(screen.getByText(/Continue with GitHub/i)).toBeInTheDocument();
        expect(screen.getByText(/Continue with Discord/i)).toBeInTheDocument();
    });

    // Validation tests
    it("shows error when submitting with empty email", () => {
        render(<LoginPage />);
        fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    it("shows error for invalid email format", () => {
        render(<LoginPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        fireEvent.change(emailInput, { target: { value: "not-an-email" } });
        fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    it("shows error when submitting with empty password", () => {
        render(<LoginPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    it("clears errors when user starts typing", () => {
        render(<LoginPage />);
        fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();

        const emailInput = screen.getByLabelText(/Email Address/i);
        fireEvent.change(emailInput, { target: { value: "a" } });
        expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
    });
});
