import React from 'react';
import { render, screen } from '@testing-library/react';
import InterfaceSettingsPage from '../page';

describe('InterfaceSettingsPage', () => {
    it('renders the Interface Settings header and specific configuration areas', () => {
        render(<InterfaceSettingsPage />);

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
        expect(screen.getByRole('button', { name: /Reset Defaults/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
