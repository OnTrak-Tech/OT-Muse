import React from 'react';
import { render, screen } from '@testing-library/react';
import WorldCard from '../WorldCard';

describe('WorldCard Component', () => {
    const mockProps = {
        title: 'Neo-Veridia Prime',
        imageUrl: '/test-image.jpg',
        theme: 'Sci-Fi',
        lastEdited: 'Edited 2 hours ago',
        collaboratorCount: 3,
        generationCount: 142
    };

    it('renders worldcard with correct props', () => {
        render(<WorldCard {...mockProps} />);
        expect(screen.getByText('Neo-Veridia Prime')).toBeInTheDocument();
        expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
        expect(screen.getByText('Edited 2 hours ago')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('142')).toBeInTheDocument();
    });
});
