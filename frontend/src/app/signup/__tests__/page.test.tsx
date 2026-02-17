import { render, screen, fireEvent } from "@testing-library/react";
import SignupPage from "../page";

jest.mock("next/image", () => ({
    __esModule: true,
    // eslint-disable-next-line @next/next/no-img-element
    default: (props: React.ComponentProps<'img'>) => <img alt="" {...props} />,
}));

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

describe("SignupPage", () => {
    it("renders without crashing", () => {
        render(<SignupPage />);
    });

    it("displays the background image", () => {
        render(<SignupPage />);
        const bgImage = screen.getByAltText(/Abstract dark nebula space background/i);
        expect(bgImage).toBeInTheDocument();
    });

    it("displays OT-Muse branding", () => {
        render(<SignupPage />);
        expect(screen.getByRole("heading", { name: /OT-Muse/i })).toBeInTheDocument();
        expect(screen.getByText(/Return to your universe/i)).toBeInTheDocument();
    });

    it("renders all 3 social auth buttons", () => {
        render(<SignupPage />);
        expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
        expect(screen.getByText(/Continue with GitHub/i)).toBeInTheDocument();
        expect(screen.getByText(/Continue with Discord/i)).toBeInTheDocument();
    });

    it("displays correct divider text", () => {
        render(<SignupPage />);
        expect(screen.getByText(/Or create account with email/i)).toBeInTheDocument();
    });

    it("displays email, password, and confirm password inputs", () => {
        render(<SignupPage />);
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    });

    it("displays Enter World submit button", () => {
        render(<SignupPage />);
        expect(screen.getByRole("button", { name: /Enter World/i })).toBeInTheDocument();
    });

    it("displays Log In link in footer", () => {
        render(<SignupPage />);
        const link = screen.getByRole("link", { name: /Log In/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/login");
    });

    // Validation tests
    it("shows error for empty email on submit", () => {
        render(<SignupPage />);
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    it("shows error for weak password (missing uppercase)", () => {
        render(<SignupPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/^Password$/i);
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "weakpass1!" } });
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        expect(screen.getByText(/at least one uppercase letter/i)).toBeInTheDocument();
    });

    it("shows error for password missing number", () => {
        render(<SignupPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/^Password$/i);
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "Weakpass!" } });
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        expect(screen.getByText(/at least one number/i)).toBeInTheDocument();
    });

    it("shows error for password missing symbol", () => {
        render(<SignupPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/^Password$/i);
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "Weakpass1" } });
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        expect(screen.getByText(/at least one symbol/i)).toBeInTheDocument();
    });

    it("shows error for too short password", () => {
        render(<SignupPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/^Password$/i);
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "Ab1!" } });
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    });

    it("shows error when passwords do not match", () => {
        render(<SignupPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/^Password$/i);
        const confirmInput = screen.getByLabelText(/Confirm Password/i);
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "StrongPass1!" } });
        fireEvent.change(confirmInput, { target: { value: "Mismatch1!" } });
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    it("passes validation with a valid strong password", () => {
        render(<SignupPage />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/^Password$/i);
        const confirmInput = screen.getByLabelText(/Confirm Password/i);
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "StrongPass1!" } });
        fireEvent.change(confirmInput, { target: { value: "StrongPass1!" } });
        fireEvent.click(screen.getByRole("button", { name: /Enter World/i }));
        // No validation errors should appear
        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/at least/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/do not match/i)).not.toBeInTheDocument();
    });
});
