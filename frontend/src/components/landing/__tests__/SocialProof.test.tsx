import { render, screen } from "@testing-library/react";
import SocialProof from "../SocialProof";

describe("SocialProof", () => {
    beforeEach(() => {
        render(<SocialProof />);
    });

    it("renders without crashing", () => {
        expect(
            screen.getByText("Powering narrative teams at")
        ).toBeInTheDocument();
    });

    it("displays all 4 brand names", () => {
        expect(screen.getByText(/NEXUS/)).toBeInTheDocument();
        expect(screen.getByText(/InfinityLoops/)).toBeInTheDocument();
        expect(screen.getByText(/STRIKE/)).toBeInTheDocument();
        expect(screen.getByText(/FlowState/)).toBeInTheDocument();
    });
});
