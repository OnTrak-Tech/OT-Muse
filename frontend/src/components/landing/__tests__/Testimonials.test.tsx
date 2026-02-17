import { render, screen } from "@testing-library/react";
import Testimonials from "../Testimonials";

describe("Testimonials", () => {
    beforeEach(() => {
        render(<Testimonials />);
    });

    it("renders without crashing", () => {
        expect(
            screen.getByText("Built for serious creators")
        ).toBeInTheDocument();
    });

    it("displays all 3 testimonial authors", () => {
        expect(screen.getByText("Sarah Jenkins")).toBeInTheDocument();
        expect(screen.getByText("Marcus Chen")).toBeInTheDocument();
        expect(screen.getByText("Elena Rodriguez")).toBeInTheDocument();
    });

    it("displays author roles", () => {
        expect(
            screen.getByText("Lead Narrative Designer, RPG Studio")
        ).toBeInTheDocument();
        expect(screen.getByText("Indie Game Dev")).toBeInTheDocument();
        expect(
            screen.getByText("Showrunner, Netflix Animation")
        ).toBeInTheDocument();
    });

    it("renders avatar initials", () => {
        expect(screen.getByText("SJ")).toBeInTheDocument();
        expect(screen.getByText("MC")).toBeInTheDocument();
        expect(screen.getByText("ER")).toBeInTheDocument();
    });

    it("contains OT-Muse in testimonial text", () => {
        expect(screen.getByText(/OT-Muse/)).toBeInTheDocument();
    });

    it("does not contain Nova Muse", () => {
        expect(screen.queryByText(/Nova Muse/i)).not.toBeInTheDocument();
    });
});
