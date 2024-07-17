import { json } from '@remix-run/node'
import path from 'path'
import fs from 'fs'
import { FeatureCollection } from 'geojson'
import type { LoaderFunction } from '@remix-run/node'

export type LoaderData = {
  tractsData: FeatureCollection;
  neighborhoodsData: FeatureCollection;
};

export const loader: LoaderFunction = async () => {
    const tractsPath = path.resolve('kc-tracts.json');
    const neighborhoodsPath = path.resolve('kc-neighborhoods.json')

    let tractsData: FeatureCollection = { type: 'FeatureCollection', features: []};
    let neighborhoodsData: FeatureCollection = { type: 'FeatureCollection', features: []};
    
    try{
    const tractsContents = fs.readFileSync(tractsPath, 'utf8');
    tractsData = JSON.parse(tractsContents);
    } catch (err){
        console.error('Failed to read or parse tracts data', err);
    }
    try{
    const neighborhoodsContents = fs.readFileSync(neighborhoodsPath, 'utf-8')
    neighborhoodsData = JSON.parse(neighborhoodsContents);
    } catch (err){
        console.error('Failed to read or parse neighborhoods data', err);
    }
    return json<LoaderData>({ tractsData, neighborhoodsData });
}

export default loader;