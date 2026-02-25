import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GeneralSettingsPage from '../page';
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

describe('GeneralSettingsPage', () => {
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
                language: "English (US)",
                timezone: "(GMT-08:00) Pacific Time",
                isPublic: true,
                showOnlineStatus: false,
            }
        });
    });

    it('renders the loading state initially, then the form fields correctly', async () => {
        render(<GeneralSettingsPage />);

        // Should start loading
        expect(screen.getByText('progress_activity')).toBeInTheDocument();

        // Wait for profile fetch to complete
        await waitFor(() => {
            expect(screen.queryByText('progress_activity')).not.toBeInTheDocument();
        });

        // Check main headings
        expect(screen.getByText('Personal Preferences')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Profile Settings' })).toBeInTheDocument();

        // Check form labels in the Profile section
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();

        // Verify loaded data
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();

        // Check Language & Region
        expect(screen.getByRole('heading', { name: 'Language & Region' })).toBeInTheDocument();
        expect(screen.getByText('Display Language')).toBeInTheDocument();
        expect(screen.getByText('Timezone')).toBeInTheDocument();

        // Privacy & Security
        expect(screen.getByRole('heading', { name: 'Privacy Settings' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Account Security' })).toBeInTheDocument();

        // Bottom actions
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
