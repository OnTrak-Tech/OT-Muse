import { render, screen } from "@testing-library/react";
import SocialAuthButtons from "../SocialAuthButtons";

jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

describe("SocialAuthButtons", () => {
    it("renders without crashing", () => {
        render(<SocialAuthButtons />);
    });

    it("displays Google button", () => {
        render(<SocialAuthButtons />);
        expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
    });

    it("displays GitHub button", () => {
        render(<SocialAuthButtons />);
        expect(screen.getByText(/Continue with GitHub/i)).toBeInTheDocument();
    });

    it("displays Discord button", () => {
        render(<SocialAuthButtons />);
        expect(screen.getByText(/Continue with Discord/i)).toBeInTheDocument();
    });
});
