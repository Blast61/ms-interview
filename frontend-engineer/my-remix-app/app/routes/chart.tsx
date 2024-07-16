import * as React from 'react'
import Highcharts from 'highcharts'
import loader from '../utils/loader'
import { useLoaderData } from '@remix-run/react'

export default async function Chart(){
    const { tractsData, neighborhoodsData } = useLoaderData<typeof loader>();
    React.useEffect(() => {
    const chart = Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'GeoSpatial Data'
            },
            xAxis: {
                categories: ['x-axis']
            },
            yAxis: {
                title: {
                    text: 'y-axis'
                }
            },
            series: [{
                name: 'kc-tracts',
                data: tractsData.features.map(feature => feature.properties['pop-commute-drive_alone'])
            }, {
                name: 'kc-neighborhoods',
                data: neighborhoodsData.features.map(feature => feature.properties['pop-commute-drive_alone'])
            }]
        });
  })
}