import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQSection from '../FAQSection';

describe('FAQSection', () => {
    it('renders the FAQ header', () => {
        render(<FAQSection />);
        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('renders all FAQ questions', () => {
        render(<FAQSection />);
        expect(screen.getByText('Can I switch plans later?')).toBeInTheDocument();
        expect(screen.getByText('What happens to my data if I cancel?')).toBeInTheDocument();
        expect(screen.getByText('How does the Free Tier token limit work?')).toBeInTheDocument();
        expect(screen.getByText('Do you offer discounts for students or non-profits?')).toBeInTheDocument();
    });

    it('renders FAQ answers text', () => {
        render(<FAQSection />);
        expect(screen.getByText(/Absolutely. You can upgrade or downgrade/)).toBeInTheDocument();
        expect(screen.getByText(/Your worlds are yours. If you cancel/)).toBeInTheDocument();
        expect(screen.getByText(/We give free users a generous daily token budget/)).toBeInTheDocument();
        expect(screen.getByText(/Yes! We offer a 50% discount on the Pro plan/)).toBeInTheDocument();
    });
});
