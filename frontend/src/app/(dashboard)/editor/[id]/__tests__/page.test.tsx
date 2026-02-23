import React from 'react';
import { render, screen } from '@testing-library/react';
import EditorPage from '../page';

jest.mock('@/components/editor/EditorToolbar', () => {
    const MockToolbar = () => <div data-testid="editor-toolbar-mock">Toolbar Mock</div>;
    MockToolbar.displayName = 'MockToolbar';
    return MockToolbar;
});
jest.mock('@/components/editor/InspectorPanel', () => {
    const MockInspector = () => <div data-testid="inspector-panel-mock">Inspector Mock</div>;
    MockInspector.displayName = 'MockInspector';
    return MockInspector;
});

describe('Editor Page', () => {
    it('renders top navigation bar', () => {
        render(<EditorPage />);
        expect(screen.getByText(/OT-Muse/i)).toBeInTheDocument();
        expect(screen.getByText(/The Rust Outpost/i)).toBeInTheDocument();
    });

    it('renders the mocked toolbar and inspector', () => {
        render(<EditorPage />);
        expect(screen.getByTestId('editor-toolbar-mock')).toBeInTheDocument();
        expect(screen.getByTestId('inspector-panel-mock')).toBeInTheDocument();
    });

    it('renders interactive nodes on the canvas', () => {
        render(<EditorPage />);
        expect(screen.getByText('Scrap Metal Silo')).toBeInTheDocument();
        expect(screen.getByText('Abandoned Rover')).toBeInTheDocument();
        expect(screen.getByText('Distant Smoke')).toBeInTheDocument();
    });
});
