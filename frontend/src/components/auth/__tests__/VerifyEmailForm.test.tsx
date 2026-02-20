import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VerifyEmailForm from "../VerifyEmailForm";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

// Mock Next.js hooks
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

// Mock next/link
jest.mock("next/link", () => {
    const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
    MockLink.displayName = "MockLink";
    return MockLink;
});

describe("VerifyEmailForm", () => {
    const mockRouterPush = jest.fn();
    const mockSearchParams = {
        get: jest.fn((key: string) => {
            if (key === "email") return "test@example.com";
            return null;
        }),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
        (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

        // Mock fetch implementation
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Email verified successfully." }),
            })
        ) as jest.Mock;
    });

    test("renders correctly with email from URL", () => {
        render(<VerifyEmailForm />);
        expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
        expect(screen.getAllByRole("textbox", { name: /Digit/ })).toHaveLength(6);
    });

    test("allows entering a 6-digit code and auto-advances focus", async () => {
        render(<VerifyEmailForm />);
        const inputs = screen.getAllByRole("textbox", { name: /Digit/ });

        await userEvent.type(inputs[0], "1");
        expect(inputs[0]).toHaveValue("1");
        expect(inputs[1]).toHaveFocus();

        await userEvent.type(inputs[1], "2");
        expect(inputs[1]).toHaveValue("2");
        expect(inputs[2]).toHaveFocus();
    });

    test("prevents typing non-numeric characters", async () => {
        render(<VerifyEmailForm />);
        const inputs = screen.getAllByRole("textbox", { name: /Digit/ });

        await userEvent.type(inputs[0], "a");
        expect(inputs[0]).toHaveValue("");
    });

    test("handles backspace to move focus backwards", async () => {
        render(<VerifyEmailForm />);
        const inputs = screen.getAllByRole("textbox", { name: /Digit/ });

        await userEvent.type(inputs[0], "1");
        await userEvent.type(inputs[1], "2");

        // Focus is on input[2] after typing "12"
        await userEvent.type(inputs[2], "{Backspace}"); // nothing to delete in [2], should move to [1]
        expect(inputs[1]).toHaveFocus();

        await userEvent.type(inputs[1], "{Backspace}"); // deletes "2", stays on [1]
        expect(inputs[1]).toHaveValue("");
    });

    test("handles pasting a 6-digit code", async () => {
        render(<VerifyEmailForm />);
        const inputs = screen.getAllByRole("textbox", { name: /Digit/ }) as HTMLInputElement[];

        // Mock paste event 
        const pasteData = "123456";
        fireEvent.paste(inputs[0], {
            clipboardData: { getData: () => pasteData }
        });

        expect(inputs[0].value).toBe("1");
        expect(inputs[5].value).toBe("6");
        expect(inputs[5]).toHaveFocus();
    });

    test("shows error if code is incomplete on submit", async () => {
        render(<VerifyEmailForm />);
        const inputs = screen.getAllByRole("textbox", { name: /Digit/ });

        await userEvent.type(inputs[0], "1");
        await userEvent.type(inputs[1], "2");

        const submitBtn = screen.getByRole("button", { name: /Verify Email/i });
        await userEvent.click(submitBtn);

        expect(toast.error).toHaveBeenCalledWith("Please enter the 6-digit code.");
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test("submits form successfully with complete code", async () => {
        render(<VerifyEmailForm />);
        const inputs = screen.getAllByRole("textbox", { name: /Digit/ });

        for (let i = 0; i < 6; i++) {
            await userEvent.type(inputs[i], (i + 1).toString());
        }

        const submitBtn = screen.getByRole("button", { name: /Verify Email/i });
        await userEvent.click(submitBtn);

        expect(global.fetch).toHaveBeenCalledWith("/api/auth/verify", expect.objectContaining({
            method: "POST",
            body: JSON.stringify({ email: "test@example.com", code: "123456" })
        }));

        expect(toast.success).toHaveBeenCalledWith("Email verified exactly! Redirecting to login...");
    });
});
