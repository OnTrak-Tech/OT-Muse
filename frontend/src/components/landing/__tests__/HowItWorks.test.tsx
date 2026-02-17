import { render, screen } from "@testing-library/react";
import HowItWorks from "../HowItWorks";

describe("HowItWorks", () => {
    beforeEach(() => {
        render(<HowItWorks />);
    });

    it("renders without crashing", () => {
        expect(
            screen.getByText("From thought to theory in seconds.")
        ).toBeInTheDocument();
    });

    it("contains OT-Muse in the description", () => {
        expect(screen.getByText(/OT-Muse/)).toBeInTheDocument();
    });

    it("does not contain Nova Muse", () => {
        expect(screen.queryByText(/Nova Muse/i)).not.toBeInTheDocument();
    });

    it("displays all 3 steps", () => {
        expect(screen.getByText("Prompt")).toBeInTheDocument();
        expect(screen.getByText("Refine")).toBeInTheDocument();
        expect(screen.getByText("Collaborate")).toBeInTheDocument();
    });

    it("displays step numbers", () => {
        expect(screen.getByText("01")).toBeInTheDocument();
        expect(screen.getByText("02")).toBeInTheDocument();
        expect(screen.getByText("03")).toBeInTheDocument();
    });

    it("has id=features on the section element", () => {
        const section = document.getElementById("features");
        expect(section).toBeInTheDocument();
        expect(section?.tagName.toLowerCase()).toBe("section");
    });
});
