import React from 'react';
import { render, screen } from '@testing-library/react';
import EditorToolbar from '../EditorToolbar';

describe('EditorToolbar Component', () => {
    it('renders tool buttons with material icons text', () => {
        render(<EditorToolbar />);
        expect(screen.getByText('near_me')).toBeInTheDocument(); // Select
        expect(screen.getByText('pan_tool')).toBeInTheDocument(); // Pan
        expect(screen.getByText('brush')).toBeInTheDocument(); // Inpaint
        expect(screen.getByText('add')).toBeInTheDocument(); // Zoom IN
        expect(screen.getByText('remove')).toBeInTheDocument(); // Zoom OUT
        expect(screen.getByText('visibility')).toBeInTheDocument(); // Explore
    });
});
