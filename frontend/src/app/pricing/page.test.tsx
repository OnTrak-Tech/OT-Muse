import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PricingPage from './page';

// Mock the child components to isolate page testing
jest.mock('@/components/landing/Navbar', () => {
    const MockNavbar = () => <nav data-testid="mock-navbar">Navbar</nav>;
    MockNavbar.displayName = 'Navbar';
    return MockNavbar;
});

jest.mock('@/components/landing/Footer', () => {
    const MockFooter = () => <footer data-testid="mock-footer">Footer</footer>;
    MockFooter.displayName = 'Footer';
    return MockFooter;
});

jest.mock('@/components/landing/PricingCards', () => {
    const MockPricingCards = () => <div data-testid="mock-pricing-cards">Pricing Cards</div>;
    MockPricingCards.displayName = 'PricingCards';
    return MockPricingCards;
});

jest.mock('@/components/landing/FAQSection', () => {
    const MockFAQSection = () => <div data-testid="mock-faq">FAQ</div>;
    MockFAQSection.displayName = 'FAQSection';
    return MockFAQSection;
});

jest.mock('@/components/landing/TrustedBy', () => {
    const MockTrustedBy = () => <div data-testid="mock-trusted-by">Trusted By</div>;
    MockTrustedBy.displayName = 'TrustedBy';
    return MockTrustedBy;
});

describe('PricingPage', () => {
    it('renders all main sections', () => {
        render(<PricingPage />);

        expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
        expect(screen.getByTestId('mock-pricing-cards')).toBeInTheDocument();
        expect(screen.getByTestId('mock-trusted-by')).toBeInTheDocument();
        expect(screen.getByTestId('mock-faq')).toBeInTheDocument();
        expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
});
