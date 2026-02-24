import React from 'react';
import { render, screen } from '@testing-library/react';
import GeneralSettingsPage from '../page';

describe('GeneralSettingsPage', () => {
    it('renders the header and form fields correctly', () => {
        render(<GeneralSettingsPage />);

        // Check main headings
        expect(screen.getByText('Personal Preferences')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Profile Settings' })).toBeInTheDocument();

        // Check form labels in the Profile section
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();

        // Check Language & Region
        expect(screen.getByRole('heading', { name: 'Language & Region' })).toBeInTheDocument();
        expect(screen.getByText('Display Language')).toBeInTheDocument();
        expect(screen.getByText('Timezone')).toBeInTheDocument();

        // Privacy & Security
        expect(screen.getByRole('heading', { name: 'Privacy Settings' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Account Security' })).toBeInTheDocument();

        // Bottom actions
        expect(screen.getByRole('button', { name: /Reset Defaults/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
