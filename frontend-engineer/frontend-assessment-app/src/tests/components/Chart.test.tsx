import React from 'react'
import { useDataLoader } from '../../hooks/useDataLoader';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Chart from '../../components/Chart'


//Unit Testing with Jest
jest.mock('../../hooks/useDataLoader');

describe('Chart Component', () => {
    const mockData = {
        tracts: {
            features: [
                {properties: {'pop-commute-drive_alone' : 100, 'pop-commute-drive_carpool': 50, 'pop-commute-public_transit': 25, 'pop-commute-walk': 10}},
                { properties: { 'pop-commute-drive_alone': 200, 'pop-commute-drive_carpool': 75, 'pop-commute-public_transit': 50, 'pop-commute-walk': 15}},
            ],
        },
    };
    beforeEach(() => {
        (useDataLoader as jest.Mock).mockReturnValue(mockData);
    });

    it('renders the chart title correctly', () => {
        render(<Chart />);
        const titleElement = screen.getByText('Commuter Population Chart');
        expect(titleElement).toBeInTheDocument();
    });

    it('renders Highcharts component', () => {
        render(<Chart />);
        const chartContainer = screen.getByRole('figure');
        expect(chartContainer).toBeInTheDocument();
    });

    it('displays the correct series names', () => {
        render(<Chart />);
        const driveAloneSeries = screen.getByText('Drive Alone');
        const carpoolSeries = screen.getByText('Carpool');
        const publicTransitSeries = screen.getByText('Public Transit');
        const walkSeries = screen.getByText('Walk');

        expect(driveAloneSeries).toBeInTheDocument();
        expect(carpoolSeries).toBeInTheDocument();
        expect(publicTransitSeries).toBeInTheDocument();
        expect(walkSeries).toBeInTheDocument();
    });
});

