import { render, screen } from "@testing-library/react";
import SocialAuthButtons from "../SocialAuthButtons";

describe("SocialAuthButtons", () => {
    it("renders without crashing", () => {
        render(<SocialAuthButtons />);
    });

    it("displays Google button", () => {
        render(<SocialAuthButtons />);
        expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    });

    it("displays GitHub button", () => {
        render(<SocialAuthButtons />);
        expect(screen.getByText("Continue with GitHub")).toBeInTheDocument();
    });

    it("displays Discord button", () => {
        render(<SocialAuthButtons />);
        expect(screen.getByText("Continue with Discord")).toBeInTheDocument();
    });
});
