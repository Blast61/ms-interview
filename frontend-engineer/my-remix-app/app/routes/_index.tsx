// import { json } from '@remix-run/node' 
// import { useLoaderData, Link } from '@remix-run/react'
// import * as React from 'react';
// import mapboxgl from 'mapbox-gl'
// import fs from 'fs'
// import path from 'path'
// import Highcharts, { chart } from 'highcharts'
import { useLoaderData } from '@remix-run/react'
import loader, {LoaderData} from '../utils/loader'
import Map from './map'
import Chart from './chart'
import {json} from '@remix-run/node'
// export const loader = async () => {
//   const tractsPath = path.resolve('kc-tracts.json');
//   const neighborhoodsPath = path.resolve('kc-neighborhoods.json')

//   const tractsContents = fs.readFileSync(tractsPath, 'utf8');
//   const neighborhoodsContents = fs.readFileSync(neighborhoodsPath, 'utf-8')

//   const tractsData = JSON.parse(tractsContents);
//   const neighborhoodsData = JSON.parse(neighborhoodsContents);

//   return json({ tractsData, neighborhoodsData });
// };
export const loaderFunction = loader
export default function Index(){
  const data = useLoaderData< LoaderData>() as LoaderData;

  if(!data){
    return <div>Loading...</div>
  }
  // const { tractsData, neighborhoodsData } = useLoaderData<typeof loader>();

  // React.useEffect(() => {
  //   mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhc3Q2MSIsImEiOiJjbHltN21scnowdG95MmtwcnB6Yjd2dDJhIn0.PM7izJTLpphLWcN2VJvzPA' 
  //   const map = new mapboxgl.Map({
  //     container: 'map', //Container ID
  //     style: 'mapbox://styles/mapbox/streets-v11', //Style URL
  //     center: [-94.5786, 39.0997],
  //     zoom: 10
  //   });

  //   map.on('load', () => {
  //     map.addSource('geojson-data', {
  //       'type': 'geojson',
  //       'data': tractsData
  //     });

  //     map.addLayer({
  //       'id': 'tracts-layer',
  //       'type': 'fill',
  //       'source': 'tracts-data',
  //       'layout': {},
  //       'paint': {
  //         'fill-color': '#888888',
  //         'fill-opacity': 0.5
  //       }
  //     });
      
  //     map.addSource('neighborhoods-data', {
  //       'type': 'geojson',
  //       'data': neighborhoodsData
  //     });
      
  //     map.addLayer({
  //       'id': 'neighborhoods-layer',
  //       'type': 'line',
  //       'source': 'neighborhoods-data',
  //       'layout': {},
  //       'paint': {
  //         'line-color': '#ff0000',
  //         'line-width':2
  //       }
  //     });
  //   });
  //   return () => map.remove();
  // }, [tractsData, neighborhoodsData])

  // React.useEffect(() => {
  //   const chart = Highcharts.chart('container', {
  //           chart: {
  //               type: 'bar'
  //           },
  //           title: {
  //               text: 'GeoSpatial Data'
  //           },
  //           xAxis: {
  //               categories: ['x-axis']
  //           },
  //           yAxis: {
  //               title: {
  //                   text: 'y-axis'
  //               }
  //           },
  //           series: [{
  //               name: 'kc-tracts',
  //               data: tractsData.features.map(feature => feature.properties['pop-commute-drive_alone'])
  //           }, {
  //               name: 'kc-neighborhoods',
  //               data: neighborhoodsData.features.map(feature => feature.properties['pop-commute-drive_alone'])
  //           }]
  //       });
  // })
  return (
  <div>
    {/* <Link to='/map'> 
      <div id='map-link' style={{ width: '100%', height: '500px' }}>Map</div>
    </Link>
    <Link to ='/chart'> 
      <div id='chart-link' style={{width:'100%', height:'400px'}} >Chart</div>
    </Link> */}
    <Map data={data} />
    <Chart data={data} />
  </div>
)}