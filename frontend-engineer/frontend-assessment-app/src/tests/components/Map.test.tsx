// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Map from '../../components/Map';
// import { useDataLoader } from '../../hooks/useDataLoader';
// import mapboxgl from 'mapbox-gl';
// import { MockMap } from '../../utils/types'

// jest.mock('../../hooks/useDataLoader');

// class MockMapClass implements MockMap{
//     on = jest.fn();
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


// describe('Map Component', () => {
//     const mockData = {
//         neighborhoods: {
//             type: 'FeatureCollection',
//             features: [
//                 {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: {
//                         type: 'Polygon',
//                         coordinates: [
//                             [
//                                 [-94.5786, 39.0997],
//                 [-94.5786, 39.1997],
//                 [-94.6786, 39.1997],
//                 [-94.6786, 39.0997],
//                 [-94.5786, 39.0997],
//                             ],
//                         ],
//                     },
//                 },
//             ],
//         },
//         tracts: {
//             type: 'FeatureCollection',
//             features: [
//                 {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: {
//                         type: 'LineString',
//                         coordinates: [
//                          [-94.5786, 39.0997],
//               [-94.5786, 39.1997],
//               [-94.6786, 39.1997],
//               [-94.6786, 39.0997],   
//                         ],
//                     },
//                 },
//             ],
//         },
//     };

//     beforeEach(() => {
//         (useDataLoader as jest.Mock).mockReturnValue(mockData);
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('renders the map container correctly', async () => {
//         render(<Map />);
//         const mapContainer = await screen.findByRole('presentation');
//         expect(mapContainer).toBeInTheDocument();
//     });

//     it('initializes mapbox-gl map', async () => {
//         render(<Map />);
//         const mapInstance = await mockMapPromise;
//         expect(mapboxgl.Map).toHaveBeenCalledWith({
//             container: expect.any(HTMLDivElement),
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [-94.5786, 39.0997],
//             zoom: 8,
//         });
//     });

//     it('adds neighborhoods source to the map', async () => {
//         render(<Map />);
//         const mapInstance = await mockMapPromise;

//         if(mapInstance === null){
//             throw new Error('Map instance is null')
//         }
//         expect(mapInstance.addSource).toHaveBeenCalledWith('neighborhoods', {
//             type: 'geojson',
//             data: mockData.neighborhoods,
//         });
//     });

//     it('adds tracts source to the map', async () => {
//         render(<Map />);
//         const mapInstance = await mockMapPromise 
//         if(mapInstance === null){
//             throw new Error('Map instance is null')
//         }
//         expect(mapInstance.addSource).toHaveBeenCalledWith('tracts', {
//             type: 'geojson',
//             data: mockData.tracts,
//         });
//     });

//     it('adds neighborhoods layer to the map', async () => {
//         render(<Map />);
//         const mapInstance = await mockMapPromise;
//         if(mapInstance === null){
//             throw new Error('Map instance is null')
//         }
//         expect(mapInstance.addLayer).toHaveBeenCalledWith({
//             id: 'neighborhoods-layer',
//             type: 'fill',
//             source: 'neighborhoods',
//             layout: {},
//             paint: {
//                 'fill-color': 'yellow',
//                 'fill-opacity': 0.4,
//             },
//         });
//     });

//     it('adds tracts layer to the map', async ()=> {
//         render(<Map />);
//         const mapInstance = await mockMapPromise; 
//         if(mapInstance === null){
//             throw new Error('Map instance is null')
//         }
//         expect(mapInstance.addLayer).toHaveBeenCalledWith({
//             id: 'tracts-layer',
//             type: 'line',
//             source: 'tracts',
//             layout: {},
//             paint: {
//                 'line-color': 'red',
//                 'line-width': 2,
//             },
//         });
//     });

//     it('removes the map instance on component unmount', async () => {
//         const { unmount } = render(<Map />);
//         const mapInstance = await mockMapPromise;
//         if(mapInstance === null){
//             throw new Error('Map instance is null')
//         }
//         unmount();
//         expect(mapInstance.remove).toHaveBeenCalled();
//     });


// });