import { json } from '@remix-run/node'
import path from 'path'
import fs from 'fs'

export default async function loader(){
    const tractsPath = path.resolve('kc-tracts.json');
    const neighborhoodsPath = path.resolve('kc-neighborhoods.json')
    
    const tractsContents = fs.readFileSync(tractsPath, 'utf8');
    const neighborhoodsContents = fs.readFileSync(neighborhoodsPath, 'utf-8')
    
    const tractsData = JSON.parse(tractsContents);
    const neighborhoodsData = JSON.parse(neighborhoodsContents);
    
    return json({ tractsData, neighborhoodsData });
}