import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { useSession } from 'next-auth/react';

// Mock next-auth/react with a factory to avoid ESM parse errors
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

describe('Sidebar Component', () => {
    beforeEach(() => {
        // Default mock implementation: authenticated user
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: { name: 'Test User', email: 'test@example.com' },
            },
            status: 'authenticated',
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the branding logo', () => {
        render(<Sidebar />);
        expect(screen.getByText(/OT-Muse/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Sidebar />);
        expect(screen.getByText(/My Worlds/i)).toBeInTheDocument();
        expect(screen.getByText(/Community/i)).toBeInTheDocument();
    });

    it('renders authenticated user profile section', () => {
        render(<Sidebar />);
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    });

    it('renders fallback when unauthenticated', () => {
        (useSession as jest.Mock).mockReturnValue({
            data: null,
            status: 'unauthenticated',
        });
        render(<Sidebar />);
        expect(screen.getByText(/Guest Creator/i)).toBeInTheDocument();
    });
});
