import React from 'react';
import { render, screen } from '@testing-library/react';
import AIEngineSettingsPage from '../page';

describe('AIEngineSettingsPage', () => {
    it('renders the AI Settings header and specific configuration areas', () => {
        render(<AIEngineSettingsPage />);

        // Core Headings
        expect(screen.getByRole('heading', { name: /AI Engine Settings/i })).toBeInTheDocument();

        // Setting blocks
        expect(screen.getByRole('heading', { name: /High-Quality Generations/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Default Art Style/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Creativity vs. Logic/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Context Memory Limit/i })).toBeInTheDocument();

        // Verify sliders exist
        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);

        // Action buttons
        expect(screen.getByRole('button', { name: /Reset Defaults/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });
});
