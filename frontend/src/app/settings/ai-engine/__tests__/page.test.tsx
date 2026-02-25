import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AIEngineSettingsPage from '../page';
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

describe('AIEngineSettingsPage', () => {
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
                highQualityGenerations: true,
                defaultArtStyle: "Sci-Fi Realism",
                creativityVsLogic: 65,
                contextMemoryLimit: 12000,
            }
        });
    });

    it('renders the AI Settings header and specific configuration areas after loading', async () => {
        render(<AIEngineSettingsPage />);

        // Wait for profile fetch to complete
        await waitFor(() => {
            expect(screen.queryByText('progress_activity')).not.toBeInTheDocument();
        });

        // Core Headings
        expect(screen.getByRole('heading', { name: /AI Engine Settings/i })).toBeInTheDocument();

        // Setting blocks
        expect(screen.getByRole('heading', { name: /High-Quality Generations/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Default Art Style/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Creativity vs. Logic/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Context Memory Limit/i })).toBeInTheDocument();

        // Verify sliders exist
        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);

        // Action buttons
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
