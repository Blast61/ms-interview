import { useState, useEffect } from 'react';
import { NeighborhoodsData, TractsData, LoaderData, NeighborhoodFeature, TractFeature } from '../utils/types';

export const useDataLoader = (): LoaderData => {
    const [data, setData] = useState<LoaderData>({
        neighborhoods: { type: 'FeatureCollection', features: [] },
        tracts: { type: 'FeatureCollection', features: []}
    });

    useEffect(() => {
        const fetchData = async() => {
            try{
                const neighborhoodsResponse = await fetch('/assets/data/kc-neighborhoods.json');
                const tractsResponse = await fetch('/assets/data/kc-tracts.json');
                
                if(!neighborhoodsResponse.ok || !tractsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
                const neighborhoodsData: NeighborhoodsData = await  neighborhoodsResponse.json();
                const tractsData: TractsData = await tractsResponse.json();
                
                //Group neighborhoods by thier shid
                const neighborhoodsMap = groupNeighborhoodsById(neighborhoodsData);
                
                //Group tracts by ID's
                const tractsGroupedById = groupTractsById(tractsData);
                
                const mergedData = mergeData(neighborhoodsMap, tractsGroupedById);
                
                setData(mergedData);
            } catch (err){
                console.error('Error loading data:', err)
            }
        };
        fetchData();
    }, []);
    return data;
};

function groupNeighborhoodsById(neighborhoodsData: NeighborhoodsData): Record<string, NeighborhoodFeature> {
    const neighborhoodsMap: Record<string, NeighborhoodFeature> = {};

    neighborhoodsData.features.forEach(neighborhood => {
        const shidParts = neighborhood.properties.shid.split('/');
        const neighborhoodId = shidParts[shidParts.length - 1];

        neighborhoodsMap[neighborhoodId] = neighborhood;
    });
    return neighborhoodsMap;
}


function groupTractsById(tractsData: TractsData): Record<string, TractFeature>{
    const tractsGrouped: Record<string, TractFeature> = {};

    tractsData.features.forEach(tract => {
        const shidParts = tract.properties.shid.split(':');
        const tractId = shidParts[shidParts.length - 1]

        tractsGrouped[tractId] = tract;
    });
    return tractsGrouped;
}


function mergeData(neighborhoodsMap: Record<string, NeighborhoodFeature>, tractsGroupedById: Record<string, TractFeature>): LoaderData{
    const mergedData: LoaderData = {
        neighborhoods: { type: 'FeatureCollection', features: Object.values(neighborhoodsMap)},
        tracts: { type: 'FeatureCollection', features: Object.values(tractsGroupedById)}
    };
    return mergedData;
}

export default useDataLoader;