import React from 'react';
import { render, screen } from '@testing-library/react';
import PreferencesPage from '../page';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

describe('Preferences Page', () => {
    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { name: 'Test User', email: 'test@example.com', image: '/avatars/1.png' } },
            status: 'authenticated',
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the page header', () => {
        render(<PreferencesPage />);
        expect(screen.getByText(/Preferences/i)).toBeInTheDocument();
        expect(screen.getByText(/Manage your profile/i)).toBeInTheDocument();
    });

    it('renders the Avatar Picker section', () => {
        render(<PreferencesPage />);
        expect(screen.getByText(/Choose Avatar/i)).toBeInTheDocument();
        const avatars = screen.getAllByRole('img');
        expect(avatars.length).toBeGreaterThan(0);
    });

    it('renders the Bio input', () => {
        render(<PreferencesPage />);
        expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    });

    it('renders the Profession dropdown', () => {
        render(<PreferencesPage />);
        expect(screen.getByLabelText(/Profession/i)).toBeInTheDocument();
    });

    it('renders the Theme Toggle', () => {
        render(<PreferencesPage />);
        expect(screen.getByText(/App Theme/i)).toBeInTheDocument();
        expect(screen.getByText(/Light/i)).toBeInTheDocument();
        expect(screen.getByText(/Dark/i)).toBeInTheDocument();
        expect(screen.getByText(/System/i)).toBeInTheDocument();
    });

    it('renders the Sign Out button', () => {
        render(<PreferencesPage />);
        expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();
    });

    it('renders the correct version tag', () => {
        render(<PreferencesPage />);
        expect(screen.getByText(/OT-Muse v1.0.0/i)).toBeInTheDocument();
    });
});
