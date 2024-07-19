import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useDataLoader } from '../../hooks/useDataLoader';


mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhc3Q2MSIsImEiOiJjbHltN21scnowdG95MmtwcnB6Yjd2dDJhIn0.PM7izJTLpphLWcN2VJvzPA'

const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const { neighborhoods = { type: 'FeatureCollection', features: [] }, tracts = { type: 'FeatureCollection', features: [] } } = useDataLoader();
//TODO: Add annotation capabilities by adding a viewAnnotationAnchorConfig object, check docs
    useEffect(() => {
        if(mapContainerRef.current){
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-98.5795, 39.8283],
                zoom: 4,
                
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
                        'fill-color': '#888888',
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
                        'line-color': '#000000',
                        'line-width': 2,
                    },
                });
                
            })

            return () => map.remove();
        }
    }, [neighborhoods, tracts]);

    return (
        <div ref={mapContainerRef}
        style={{ width: '100%', height: '500px' }} 
        />
    );
};

export default Map;