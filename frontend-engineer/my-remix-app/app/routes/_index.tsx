import { json } from '@remix-run/node' 
import { useLoaderData } from '@remix-run/react'
import { useEffect } from "react";
import mapboxgl from 'mapbox-gl'
import fs from 'fs'
import path from 'path'

export const loader = async () => {
  const tractsPath = path.resolve('kc-tracts.json');
  const neighborhoodsPath = path.resolve('kc-neighborhoods.json')

  const tractsContents = fs.readFileSync(tractsPath, 'utf8');
  const neighborhoodsContents = fs.readFileSync(neighborhoodsPath, 'utf-8')

  const tractsData = JSON.parse(tractsContents);
  const neighborhoodsData = JSON.parse(neighborhoodsContents);

  return json({ tractsData, neighborhoodsData });
};

export default function Index(){
  const { tractsData, neighborhoodsData } = useLoaderData<typeof loader>();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhc3Q2MSIsImEiOiJjbHltN21scnowdG95MmtwcnB6Yjd2dDJhIn0.PM7izJTLpphLWcN2VJvzPA' 
    const map = new mapboxgl.Map({
      container: 'map', //Container ID
      style: 'mapbox://styles/mapbox/streets-v11', //Style URL
      center: [-94.5786, 39.0997],
      zoom: 10
    });

    map.on('load', () => {
      map.addSource('geojson-data', {
        'type': 'geojson',
        'data': tractsData
      });

      map.addLayer({
        'id': 'tracts-layer',
        'type': 'fill',
        'source': 'tracts-data',
        'layout': {},
        'paint': {
          'fill-color': '#888888',
          'fill-opacity': 0.5
        }
      });
      
      map.addSource('neighborhoods-data', {
        'type': 'geojson',
        'data': neighborhoodsData
      });
      
      map.addLayer({
        'id': 'neighborhoods-layer',
        'type': 'line',
        'source': 'neighborhoods-data',
        'layout': {},
        'paint': {
          'line-color': '#ff0000',
          'line-width':2
        }
      });
    });
    return () => map.remove();
  }, [tractsData, neighborhoodsData])
  return <div id='map' style={{ width: '100%', height: '500px' }}></div>
}