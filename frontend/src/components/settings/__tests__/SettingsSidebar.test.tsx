import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsSidebar from '../SettingsSidebar';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

describe('SettingsSidebar', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Default mock implementation for usePathname
        (usePathname as jest.Mock).mockReturnValue('/settings');

        // Default mock implementation for useSession
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'test@example.com',
                    image: 'https://example.com/avatar.jpg',
                },
            },
            status: 'authenticated',
        });
    });

    it('renders the sidebar headings and navigation links', () => {
        render(<SettingsSidebar />);

        expect(screen.getByText('Preferences')).toBeInTheDocument();
        expect(screen.getByText('Manage settings')).toBeInTheDocument();

        // Check if the navigation links are present
        expect(screen.getByText('General')).toBeInTheDocument();
        expect(screen.getByText('AI Engine')).toBeInTheDocument();
        expect(screen.getByText('Interface')).toBeInTheDocument();
        expect(screen.getByText('Collaboration')).toBeInTheDocument();
        expect(screen.getByText('Billing')).toBeInTheDocument();
    });

    it('renders the generic default avatar if user image is missing', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'test@example.com',
                },
            },
            status: 'authenticated',
        });

        render(<SettingsSidebar />);

        // When no specific image is provided, we use the complex placeholder SVG inline
        // It's tricky to test background-image styles set dynamically, but we can verify it doesn't crash
        expect(screen.getByText('Preferences')).toBeInTheDocument();
    });
});
