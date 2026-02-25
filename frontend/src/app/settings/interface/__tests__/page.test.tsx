import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import InterfaceSettingsPage from '../page';
import { useSession } from 'next-auth/react';
import { usersApi } from '@/lib/api';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
    usersApi: {
        getMe: jest.fn(),
        updateMe: jest.fn(),
    }
}));

describe('InterfaceSettingsPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock session
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { id: "usr_123", email: "test@example.com", name: "Test User" } },
            status: "authenticated",
        });

        // Mock API
        (usersApi.getMe as jest.Mock).mockResolvedValue({
            userId: "usr_123",
            email: "test@example.com",
            displayName: "Test User",
            preferences: {
                theme: "Dark",
                canvasPerformance: "Balanced",
                compactSidebar: false,
                showGridlines: true,
                colorBlindMode: false,
                uiScaling: 100,
            }
        });
    });

    it('renders the Interface Settings header and specific configuration areas after loading', async () => {
        render(<InterfaceSettingsPage />);

        // Wait for profile fetch to complete
        await waitFor(() => {
            expect(screen.queryByText('progress_activity')).not.toBeInTheDocument();
        });

        // Core Headings
        expect(screen.getByRole('heading', { name: /Interface Settings/i })).toBeInTheDocument();

        // Setting blocks
        expect(screen.getByRole('heading', { name: /Theme Selection/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Canvas Performance/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /UI Density/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Accessibility/i })).toBeInTheDocument();

        // Verify themes
        expect(screen.getByText('System')).toBeInTheDocument();
        expect(screen.getByText('Light')).toBeInTheDocument();
        expect(screen.getByText('Dark')).toBeInTheDocument();
        expect(screen.getByText('OLED')).toBeInTheDocument();

        // Action buttons
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
