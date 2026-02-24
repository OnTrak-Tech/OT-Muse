import React from 'react';
import { render, screen } from '@testing-library/react';
import BillingSettingsPage from '../page';

describe('BillingSettingsPage', () => {
    it('renders the Billing Settings header and specific configuration areas', () => {
        render(<BillingSettingsPage />);

        // Core Headings
        expect(screen.getByRole('heading', { name: /Subscription Plan/i })).toBeInTheDocument();

        // Setting blocks
        expect(screen.getByRole('heading', { name: /Current Plan/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Usage Metrics/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Payment Method/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Billing History/i })).toBeInTheDocument();

        // Verify Current Plan display
        expect(screen.getByText('Pro')).toBeInTheDocument();
        expect(screen.getByText('Unlimited Worlds')).toBeInTheDocument();

        // Usage Metrics display
        expect(screen.getByText('AI Generations Used')).toBeInTheDocument();
        expect(screen.getByText('Storage Space')).toBeInTheDocument();
        expect(screen.getByText('Active Collaborators')).toBeInTheDocument();

        // Payment Method display
        expect(screen.getByText(/Visa ending in 4242/i)).toBeInTheDocument();

        // Table content checks
        expect(screen.getByText('INV-2026-0012')).toBeInTheDocument();
        expect(screen.getAllByText('$29.00')[0]).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Need Help?/i })).toBeInTheDocument();
    });
});
