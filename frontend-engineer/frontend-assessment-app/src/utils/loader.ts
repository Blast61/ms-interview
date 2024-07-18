import kcTractsData from '../../public/assets/data/kc-tracts.json'
import kcNeighborhoodsData from '../../public/assets/data/kc-neighborhoods.json'
import {NeighborhoodsData, TractsData, LoaderData, NeighborhoodFeature, TractFeature} from './types'

export const loader = async (): Promise<LoaderData> => {
    try{
        //Fetch and parse data
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

        const mergedData: LoaderData = mergeData(neighborhoodsMap, tractsGroupedById);

        return mergedData;
    } catch (err){
        console.error('Error loading data:', err);
        return { neighborhoods: { type: 'FeatureCollection', features: [] }, tracts: { type:'FeatureCollection', features: []}};
    }

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

export default loader;