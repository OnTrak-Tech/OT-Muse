import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';

jest.mock('@/components/dashboard/WorldCard', () => {
    return function DummyWorldCard(props: any) {
        return <div data-testid="world-card-mock">{props.title}</div>;
    };
});

describe('Dashboard Page', () => {
    it('renders header elements (search, new world button)', () => {
        render(<DashboardPage />);
        expect(screen.getByPlaceholderText(/Search worlds/i)).toBeInTheDocument();
        expect(screen.getByText(/Create New World/i)).toBeInTheDocument();
    });

    it('renders stats elements', () => {
        render(<DashboardPage />);
        expect(screen.getByText(/Total Worlds/i)).toBeInTheDocument();
        expect(screen.getByText(/Generations/i)).toBeInTheDocument();
    });

    it('renders multiple world cards', () => {
        render(<DashboardPage />);
        const mockCards = screen.getAllByTestId('world-card-mock');
        expect(mockCards.length).toBeGreaterThan(0);
    });
});
