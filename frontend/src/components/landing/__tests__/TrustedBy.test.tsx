import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrustedBy from '../TrustedBy';

describe('TrustedBy', () => {
    it('renders the Trusted By text', () => {
        render(<TrustedBy />);
        expect(screen.getByText(/Trusted by creative teams at/i)).toBeInTheDocument();
    });

    it('renders all company names', () => {
        render(<TrustedBy />);
        expect(screen.getByText('NEXUS')).toBeInTheDocument();
        expect(screen.getByText('InfinityLoops')).toBeInTheDocument();
        expect(screen.getByText('STRIKE')).toBeInTheDocument();
        expect(screen.getByText('FlowState')).toBeInTheDocument();
    });
});
