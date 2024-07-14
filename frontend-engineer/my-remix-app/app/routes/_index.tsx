import { json } from '@remix-run/node' 
import { useLoaderData } from '@remix-run/react'
import { useEffect } from "react";
import mapboxgl from 'mapbox-gl'
import fs from 'fs'
import path from 'path'

export const loader = async () => {
  const filePath = path.resolve('kc-tracts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const geojsonData = JSON.parse(fileContents);
  return json(geojsonData);
};

export default function Index(){
  const data = useLoaderData();

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
        'data': data
      });

      map.addLayer({
        'id': 'geojson-layer',
        'type': 'fill',
        'source': 'geojson-data',
        'layout': {},
        'paint': {
          'fill-color': '#888888',
          'fill-opacity': 0.5
        }
      });
    });
    return () => map.remove();
  }, [data])
  return <div id='map' style={{ width: '100%', height: '500px' }}></div>
}