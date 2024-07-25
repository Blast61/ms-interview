import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useDataLoader } from '../hooks/useDataLoader';


mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhc3Q2MSIsImEiOiJjbHltN21scnowdG95MmtwcnB6Yjd2dDJhIn0.PM7izJTLpphLWcN2VJvzPA'

const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const { neighborhoods = { type: 'FeatureCollection', features: [] }, tracts = { type: 'FeatureCollection', features: [] } } = useDataLoader();
    useEffect(() => {
        if(mapContainerRef.current){
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-94.5786, 39.0997],
                zoom: 8,
                
            })

            map.on('load', () => {
                map.addSource('neighborhoods', {
                    type: 'geojson',
                    data: neighborhoods,
                });
                
                map.addLayer({
                    id: 'neighborhoods-layer',
                    type: 'fill',
                    source: 'neighborhoods',
                    layout: {},
                    paint: {
                        'fill-color': 'yellow',
                        'fill-opacity': 0.4,
                    },
                });
                
                map.addSource('tracts', {
                    type: 'geojson',
                    data: tracts,
                });
                
                map.addLayer({
                    id: 'tracts-layer',
                    type: 'line',
                    source: 'tracts',
                    layout: {},
                    paint: {
                        'line-color': 'red',
                        'line-width': 2,
                    },
                });
                
            })

            return () => map.remove();
        }
    }, [neighborhoods, tracts]);

    return (
        <div ref={mapContainerRef} role='presentation'
        style={{ width: '100%', height: '500px' }} 
        />
    );
};

export default Map;