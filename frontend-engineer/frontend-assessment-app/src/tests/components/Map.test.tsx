import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from '../../components/Map';
import { useDataLoader } from '../../hooks/useDataLoader';
import mapboxgl from 'mapbox-gl';
import { MockMap } from '../../utils/types'
import { accessToken } from 'mapbox-gl';

jest.mock('../../hooks/useDataLoader');

// class MockMapClass implements MockMap{
//     on = jest.fn((event, callback) => {
//         if(event === 'load'){
//             setTimeout(callback, 0);
//         }
//     });
//     addSource = jest.fn();
//     addLayer = jest.fn();
//     remove = jest.fn();
//     setStyle = jest.fn();

//     async init(){
//         return new Promise((resolve) => setTimeout(resolve, 100))
//     }
// }


// let mockMapPromise: Promise<MockMapClass>

// jest.mock('mapbox-gl', () => ({
//     Map: jest.fn(() => {
//             const mockInstance = new MockMapClass();

//             mockMapPromise = Promise.resolve(mockInstance);
//         return mockInstance;
//     }),
//     accessToken: 'fake-token',
// }));
jest.mock('mapbox-gl', () => ({
    Map: jest.fn(() => mockMapInstance),
    accessToken: 'fake-token',
}));

const mockMapInstance = {
    on: jest.fn((event, callback) => {
        if(event === 'load'){
            setTimeout(callback, 0);
        }
    }),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    remove: jest.fn(),
    setStyle: jest.fn(),
};

(mapboxgl.Map.prototype as any) = mockMapInstance;

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
    });

    it('renders the map container correctly', async () => {
        render(<Map />);
        const mapContainer = await screen.findByRole('presentation');
        expect(mapContainer).toBeInTheDocument();
    });

    it('initializes mapbox-gl map', async () => {
        render(<Map />);
        // const mapInstance = await mockMapPromise;
        expect(mapboxgl.Map).toHaveBeenCalledWith({
            container: expect.any(HTMLDivElement),
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-94.5786, 39.0997],
            zoom: 8,
        });
    });

    it('adds neighborhoods source to the map', async () => {
        render(<Map />);
        // const mapInstance = await mockMapPromise;

        // if(mapInstance === null){
        //     throw new Error('Map instance is null')
        // }
        expect(mockMapInstance.addSource).toHaveBeenCalledWith('neighborhoods', {
            type: 'geojson',
            data: mockData.neighborhoods,
        });
    });

    it('adds tracts source to the map', async () => {
        render(<Map />);
        // const mapInstance = await mockMapPromise 
        // if(mapInstance === null){
        //     throw new Error('Map instance is null')
        // }
        expect(mockMapInstance.addSource).toHaveBeenCalledWith('tracts', {
            type: 'geojson',
            data: mockData.tracts,
        });
    });

    it('adds neighborhoods layer to the map', async () => {
        render(<Map />);
        // const mapInstance = await mockMapPromise;
        // if(mapInstance === null){
        //     throw new Error('Map instance is null')
        // }
        expect(mockMapInstance.addLayer).toHaveBeenCalledWith({
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

    it('adds tracts layer to the map', async ()=> {
        render(<Map />);
        // const mapInstance = await mockMapPromise; 
        // if(mapInstance === null){
        //     throw new Error('Map instance is null')
        // }
        expect(mockMapInstance.addLayer).toHaveBeenCalledWith({
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

    it('removes the map instance on component unmount', async () => {
        const { unmount } = render(<Map />);
        // const mapInstance = await mockMapPromise;
        // if(mapInstance === null){
        //     throw new Error('Map instance is null')
        // }
        unmount();
        expect(mockMapInstance.remove).toHaveBeenCalled();
    });
});