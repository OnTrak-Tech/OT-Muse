import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
    it('renders the branding logo', () => {
        render(<Sidebar />);
        expect(screen.getByText(/Nova Muse/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Sidebar />);
        expect(screen.getByText(/My Worlds/i)).toBeInTheDocument();
        expect(screen.getByText(/Community/i)).toBeInTheDocument();
    });

    it('renders user profile section', () => {
        render(<Sidebar />);
        expect(screen.getByText(/Alex Chen/i)).toBeInTheDocument();
    });
});
