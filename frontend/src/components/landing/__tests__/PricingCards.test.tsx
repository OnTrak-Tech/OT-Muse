import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PricingCards from '../PricingCards';

// Mock next/link
jest.mock('next/link', () => {
    const MockedLink = ({ children, href, className }: { children: React.ReactNode, href: string, className: string }) => (
        <a href={href} className={className}>{children}</a>
    );
    MockedLink.displayName = 'Link';
    return MockedLink;
});

describe('PricingCards', () => {
    it('renders all three pricing tiers', () => {
        render(<PricingCards />);

        expect(screen.getByText('Explorer')).toBeInTheDocument();
        expect(screen.getByText('Pro', { selector: 'h3' })).toBeInTheDocument();
        expect(screen.getByText('Enterprise')).toBeInTheDocument();
    });

    it('toggles between monthly and annual pricing', () => {
        render(<PricingCards />);

        // Initial state is Annual
        expect(screen.getByText('$15')).toBeInTheDocument(); // Pro Annual
        expect(screen.getByText('$79')).toBeInTheDocument(); // Enterprise Annual
        expect(screen.getByText('Billed annually ($180)')).toBeInTheDocument();

        // Click the toggle button
        const toggleBtn = screen.getByRole('button');
        fireEvent.click(toggleBtn);

        // State is now Monthly
        expect(screen.getByText('$19')).toBeInTheDocument(); // Pro Monthly
        expect(screen.getByText('$99')).toBeInTheDocument(); // Enterprise Monthly
        expect(screen.queryByText('Billed annually ($180)')).not.toBeInTheDocument();
    });

    it('contains correct call to action links', () => {
        render(<PricingCards />);

        const freeLink = screen.getByText('Start for Free');
        expect(freeLink.closest('a')).toHaveAttribute('href', '/signup');

        const proLink = screen.getByText('Get Pro Access');
        expect(proLink.closest('a')).toHaveAttribute('href', '/signup?plan=pro');

        const enterpriseLink = screen.getByText('Contact Sales');
        expect(enterpriseLink.closest('a')).toHaveAttribute('href', '/#contact');
    });
});
