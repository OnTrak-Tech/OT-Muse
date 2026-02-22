import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateWorldPage from '../page';

describe('Create World Page', () => {
    it('renders header text', () => {
        render(<CreateWorldPage />);
        expect(screen.getByText(/Architect Your Reality/i)).toBeInTheDocument();
    });

    it('renders textarea prompt input', () => {
        render(<CreateWorldPage />);
        expect(screen.getByPlaceholderText(/In a realm where gravity is optional/i)).toBeInTheDocument();
    });

    it('renders Archetype selection buttons', () => {
        render(<CreateWorldPage />);
        expect(screen.getByText(/Sci-Fi/i)).toBeInTheDocument();
        expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
        expect(screen.getByText(/Custom/i)).toBeInTheDocument();
    });

    it('renders visual style presets', () => {
        render(<CreateWorldPage />);
        expect(screen.getByText(/Cinematic Realistic/i)).toBeInTheDocument();
        expect(screen.getByText(/Cyberpunk Noir/i)).toBeInTheDocument();
    });

    it('renders generate button', () => {
        render(<CreateWorldPage />);
        expect(screen.getByText(/GENERATE WORLD/i)).toBeInTheDocument();
    });
});
