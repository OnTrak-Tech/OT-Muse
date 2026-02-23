import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '../layout';

jest.mock('@/components/dashboard/Sidebar', () => {
    const MockSidebar = () => <div data-testid="mock-sidebar">Sidebar</div>;
    MockSidebar.displayName = 'MockSidebar';
    return MockSidebar;
});

jest.mock('@/components/providers/AuthProvider', () => {
    const MockAuthProvider = ({ children }: { children: React.ReactNode }) => <div data-testid="mock-auth-provider">{children}</div>;
    MockAuthProvider.displayName = 'MockAuthProvider';
    return MockAuthProvider;
});

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
