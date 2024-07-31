import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react'
import useDataLoader from '../../hooks/useDataLoader'
import { LoaderData, NeighborhoodsData, TractsData } from '../../utils/types';


global.fetch = jest.fn();

const mockNeighborhoodsData: NeighborhoodsData = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { 
                id: 123456, 
                shid: '123/456',
                area: 123456,
                'pop-commute-drive_alone': 123456,
    'pop-commute-drive_carpool': 123456,
    'pop-commute-public_transit': 123456,
    'pop-commute-walk': 123456

            },
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
};


const mockTractsData: TractsData = {
    type: 'FeatureCollection',
    features: [
        {
          type: 'Feature',properties: { 
            id: 789,
            shid: 'abc:789',
            area: 789,
            'pop-commute-drive_alone': 789,'pop-commute-drive_carpool': 789,'pop-commute-public_transit': 789,'pop-commute-walk': 789
        },
        geometry: {
            type: 'Polygon',coordinates: [
                [
                [-94.5786, 39.0997],[-94.5786, 39.1997],[-94.6786, 39.1997],[-94.6786, 39.0997],
                ] 
            ],
        },
    },
],
};

describe('useDataLoader', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
    });
    
    it('fetches and processes data correctly', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockNeighborhoodsData,
        });
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTractsData,
        });

        const { result } = renderHook(() => useDataLoader())
        
        await waitFor(() => {
            expect(result.current.neighborhoods.features.length).toBeGreaterThan(0)
        })
    
        

        const expectedData: LoaderData = {
            neighborhoods: mockNeighborhoodsData,
            tracts: mockTractsData,
        };

        expect(result.current).toEqual(expectedData);
    })

    it('handles fetch errors gracefully', async() => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result } = renderHook(() => useDataLoader());
        
        await waitFor(() => expect(result.current.neighborhoods.features.length).toBe(0));

        const expectedData: LoaderData = {
            neighborhoods: { type: 'FeatureCollection', features: [] },
            tracts: { type: 'FeatureCollection', features: [] },
        };

        expect(result.current).toEqual(expectedData);
    });

    it('handles non-ok response status', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce({
            ok: false,
        });

        const { result } = renderHook(() => useDataLoader());
        
        await waitFor(() => expect(result.current.neighborhoods.features.length).toBe(0));

        const expectedData: LoaderData = {
            neighborhoods: { type: 'FeatureCollection', features: [] },
            tracts: { type: 'FeatureCollection', features: [] },
        };

        expect(result.current).toEqual(expectedData);
    });
});