import { useLoaderData } from "@remix-run/react";
import loader from '../utils/loader'
import mapboxgl from 'mapbox-gl'
import * as React from 'react'

export default function Map(){
    const {tractsData, neighborhoodsData } = useLoaderData<typeof loader>()
    React.useEffect(() => {
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
}