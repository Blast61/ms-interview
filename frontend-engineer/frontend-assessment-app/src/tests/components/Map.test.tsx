import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from '../../components/Map';
import { useDataLoader } from '../../hooks/useDataLoader';
import mapboxgl from 'mapbox-gl';

jest.mock('../../hooks/useDataLoader');

jest.mock('mapbox-gl', () => ({
    Map: jest.fn(() => ({
        on: jest.fn(),
        addSource: jest.fn(),
        addLayer: jest.fn(),
        remove: jest.fn(),
        setStyle: jest.fn()
    })),
    accessToken: 'fake-token',
}));

describe('Map Component', () => {
    const mockData = {
        neighborhoods: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [-94.5786, 39.0997],
                [-94.5786, 39.1997],
                [-94.6786, 39.1997],
                [-94.6786, 39.0997],
                [-94.5786, 39.0997],
                            ],
                        ],
                    },
                },
            ],
        },
        tracts: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                         [-94.5786, 39.0997],
              [-94.5786, 39.1997],
              [-94.6786, 39.1997],
              [-94.6786, 39.0997],   
                        ],
                    },
                },
            ],
        },
    };

    beforeEach(() => {
        (useDataLoader as jest.Mock).mockReturnValue(mockData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('renders the map container correctly', () => {
        render(<Map />);
        const mapContainer = screen.getByRole('presentation');
        expect(mapContainer).toBeInTheDocument();
    });

    it('initializes mapbox-gl map', () => {
        render(<Map />);
        expect(mapboxgl.Map).toHaveBeenCalledWith({
            container: expect.any(HTMLDivElement),
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-94.5786, 39.0997],
            zoom: 8,
        });
    });

    it('adds neighborhoods source to the map', () => {
        render(<Map />);
        const mapInstance = (mapboxgl.Map as jest.Mock).mock.results[0].value;
        expect(mapInstance.addSouce).toHaveBeenCalledWith('neighborhoods', {
            type: 'geojson',
            data: mockData.neighborhoods,
        });
    });

    it('adds tracts source to the map', () => {
        render(<Map />);
        const mapInstance = (mapboxgl.Map as jest.Mock).mock.results[0].value;
        expect(mapInstance.addSource).toHaveBeenCalledWith('tracts', {
            type: 'geojson',
            data: mockData.tracts,
        });
    });

    it('adds neighborhoods layer to the map', () => {
        render(<Map />);
        const mapInstance = (mapboxgl.Map as jest.Mock).mock.results[0].value;
        expect(mapInstance.addLayer).toHaveBeenCalledWith({
            id: 'neighborhoods-layer',
            type: 'fill',
            source: 'neighborhoods',
            layout: {},
            paint: {
                'fill-color': 'yellow',
                'fill-opacity': 0.4,
            },
        });
    });

    it('adds tracts layer to the map', ()=> {
        render(<Map />);
        const mapInstance = (mapboxgl.Map as jest.Mock).mock.results[0].value;
        expect(mapInstance.addLayer).toHaveBeenCalledWith({
            id: 'tracts-layer',
            type: 'line',
            source: 'tracts',
            layout: {},
            paint: {
                'line-color': 'red',
                'line-width': 2,
            },
        });
    });

    it('removes the map instance on component unmount', () => {
        const { unmount } = render(<Map />);
        const mapInstance = (mapboxgl.Map as jest.Mock).mock.results[0].value;
        unmount();
        expect(mapInstance.remove).toHaveBeenCalled();
    });


});