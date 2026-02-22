import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '../layout';

jest.mock('@/components/dashboard/Sidebar', () => () => <div data-testid="mock-sidebar">Sidebar</div>);

describe('Dashboard Layout', () => {
    it('renders sidebar and children', () => {
        render(
            <DashboardLayout>
                <div data-testid="mock-child">Child Content</div>
            </DashboardLayout>
        );
        expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    });
});
