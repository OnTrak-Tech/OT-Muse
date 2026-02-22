import React from 'react';
import { render, screen } from '@testing-library/react';
import InspectorPanel from '../InspectorPanel';

describe('InspectorPanel Component', () => {
    it('renders the inspector header', () => {
        render(<InspectorPanel />);
        expect(screen.getByText('Inspector')).toBeInTheDocument();
    });

    it('renders selected element details', () => {
        render(<InspectorPanel />);
        expect(screen.getByText('Scrap Metal Silo')).toBeInTheDocument();
        expect(screen.getByText(/#NVA-8922/i)).toBeInTheDocument();
    });

    it('renders refinement prompt textarea', () => {
        render(<InspectorPanel />);
        expect(screen.getByPlaceholderText(/Describe changes/i)).toBeInTheDocument();
    });

    it('renders generation parameters', () => {
        render(<InspectorPanel />);
        expect(screen.getByText('Chaos')).toBeInTheDocument();
        expect(screen.getByText('Style Strength')).toBeInTheDocument();
        expect(screen.getByText('Preserve Structure')).toBeInTheDocument();
    });
});
