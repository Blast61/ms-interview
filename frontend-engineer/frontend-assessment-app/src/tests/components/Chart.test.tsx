import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data'
import { useDataLoader } from '../../hooks/useDataLoader';
import Accessibility from 'highcharts/modules/accessibility'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Chart from '../../components/Chart'

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

    

})