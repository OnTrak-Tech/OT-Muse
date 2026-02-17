import { render, screen } from "@testing-library/react";
import AuthDivider from "../AuthDivider";

describe("AuthDivider", () => {
    it("renders without crashing", () => {
        render(<AuthDivider />);
    });

    it("displays default text", () => {
        render(<AuthDivider />);
        expect(screen.getByText("Or continue with email")).toBeInTheDocument();
    });

    it("displays custom text", () => {
        render(<AuthDivider text="Custom Text" />);
        expect(screen.getByText("Custom Text")).toBeInTheDocument();
    });
});
