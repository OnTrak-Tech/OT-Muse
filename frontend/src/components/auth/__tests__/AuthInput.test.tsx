import { render, screen } from "@testing-library/react";
import AuthInput from "../AuthInput";
import { MdEmail } from "react-icons/md";

describe("AuthInput", () => {
    it("renders without crashing", () => {
        render(<AuthInput label="Test Label" id="test-input" />);
    });

    it("displays the label when provided", () => {
        render(<AuthInput label="Test Label" id="test-input" />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("does not display a label element when label prop is empty", () => {
        const { container } = render(<AuthInput label="" id="test-input" />);
        // Check that no label element is rendered inside the container
        const labelElement = container.querySelector("label");
        expect(labelElement).not.toBeInTheDocument();
    });

    it("renders the input element with correct id and placeholder", () => {
        render(<AuthInput label="Test Label" id="test-input" placeholder="Enter text" />);
        const input = screen.getByPlaceholderText("Enter text");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("id", "test-input");
    });

    it("renders an icon when provided", () => {
        // We can check if the icon's container or class is present, or simpler: render with icon and check snapshot/presence
        // Since we use react-icons, we can check if the svg is present
        const { container } = render(<AuthInput label="Test Label" id="test-input" icon={<MdEmail data-testid="icon" />} />);
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
});
