import React from 'react';
import { render, screen } from '@testing-library/react';
import CollaborationSettingsPage from '../page';

describe('CollaborationSettingsPage', () => {
    it('renders the Collaboration Settings header and specific configuration areas', () => {
        render(<CollaborationSettingsPage />);

        // Core Headings
        expect(screen.getByRole('heading', { name: /Collaboration & Sharing/i })).toBeInTheDocument();

        // Setting blocks
        expect(screen.getByRole('heading', { name: /Default Permissions/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Presence Settings/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Edit Notifications/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Active Sessions/i })).toBeInTheDocument();

        // Check presence of specific toggles/dropdowns
        expect(screen.getByText('Commenter')).toBeInTheDocument();
        expect(screen.getByText('Show Cursor Activity')).toBeInTheDocument();

        // Check specific notifications
        expect(screen.getByText('New Element Added')).toBeInTheDocument();
        expect(screen.getByText('Lore Conflict Detected')).toBeInTheDocument();
        expect(screen.getByText('Direct Mention')).toBeInTheDocument();

        // Action buttons
        expect(screen.getByRole('button', { name: /Reset Defaults/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
