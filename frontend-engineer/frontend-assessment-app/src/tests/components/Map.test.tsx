import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from '../../components/Map';
import { useDataLoader } from '../../hooks/useDataLoader';
import mapboxgl from 'mapbox-gl';
import { MockMap } from 'src/utils/types';


jest.mock('../../hooks/useDataLoader');

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

const mockMapInstance: MockMap = {
    on: jest.fn((event, callback) => {
        if(event === 'load'){
            setTimeout(callback, 0);
        }
    }),
    addSource: jest.fn((id, source) => {
        console.log(`Mock addSource called with id: ${id}`)
    }),
    addLayer: jest.fn((layer) => console.log(`Mock addLayer called with id: ${layer.id} `)),
    remove: jest.fn(() => console.log('Mock map remove was called')),
    setStyle: jest.fn(),
    sources: {},
    layers: [],
    style: undefined,
    center: undefined,
    zoom: undefined,
};

jest.mock('mapbox-gl', () => ({
    Map: jest.fn((options) => {
        console.log('Mock mapbox-gl Map constructor was called');

        if(options.testMode){
            mockMapInstance.style = options.style;
            mockMapInstance.center = options.center;
            mockMapInstance.zoom = options.zoom;
        }
        return mockMapInstance;
    }),
    accessToken: 'fake-token',
}));

(mapboxgl.Map.prototype as any) = mockMapInstance;

describe('Map Component', () => {

    beforeEach(() => {
        (useDataLoader as jest.Mock).mockReturnValue(mockData);
        console.log('Mock data loader setup')
    });

    afterEach(() => {
        jest.clearAllMocks();
        console.log('Mocks cleared')
    });

    it('renders the map container correctly', async () => {
        render(<Map />);
        const mapContainer = await screen.findByRole('presentation');
        console.log('Map container rendered');
        expect(mapContainer).toBeInTheDocument();
    });

    it('initializes mapbox-gl map', async () => {
        render(<Map />);
        expect(mapboxgl.Map).toHaveBeenCalledWith({
            container: expect.any(HTMLDivElement),
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [-94.5786, 39.0997],
            zoom: 8,
            config:{
                basemap: {
                    lightPreset: 'night',
                }
            }
        });
        console.log('Mapbox GL map initialized');
    });

    it('adds neighborhoods source to the map', async () => {
        render(<Map />);
        await waitFor(() => expect(mockMapInstance.addSource).toHaveBeenCalledWith('neighborhoods', {
            type: 'geojson',
            data: mockData.neighborhoods,
        }));
        console.log('Neighborhoods source added', mockMapInstance.addSource);
    });

    it('adds tracts source to the map', async () => {
        render(<Map />);
        await waitFor(() => expect(mockMapInstance.addSource).toHaveBeenCalledWith('tracts', {
            type: 'geojson',
            data: mockData.tracts,
        }));
        console.log('Tracts source added');  
    });

    it('adds neighborhoods layer to the map', async () => {
        render(<Map />);
        await waitFor(() => expect(mockMapInstance.addLayer).toHaveBeenCalledWith({
            id: 'neighborhoods-layer',
            type: 'fill',
            source: 'neighborhoods',
            layout: {},
            paint: {
                'fill-color': 'yellow',
                'fill-opacity': 0.4,
            },
        }));
        console.log('Neighborhoods layer added');
    });

    it('adds tracts layer to the map', async ()=> {
        render(<Map />);
        await waitFor(() => expect(mockMapInstance.addLayer).toHaveBeenCalledWith({
            id: 'tracts-layer',
            type: 'line',
            source: 'tracts',
            layout: {},
            paint: {
                'line-color': 'red',
                'line-width': 2,
            },
        }));
        console.log('Tracts layer added', mockMapInstance.addLayer)
    });

    it('removes the map instance on component unmount', async () => {
        const { unmount } = render(<Map />);
        unmount();
        console.log('Map instance removed');
        expect(mockMapInstance.remove).toHaveBeenCalled();
    });
});
