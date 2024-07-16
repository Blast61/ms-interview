import * as React from 'react'
import Highcharts from 'highcharts'
import {LoaderData} from '../utils/loader'
// import { useLoaderData } from '@remix-run/react'


type ChartProps = {
    data: LoaderData | null;
}

// export const chartLoader = loader;

const Chart: React.FC<ChartProps> =({ data }) => {
    
    const { tractsData, neighborhoodsData } = data;
    
    React.useEffect(() => {
    if(!tractsData || !neighborhoodsData) return;

    Highcharts.chart('container', {
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
  }, [tractsData, neighborhoodsData]);

  return <div id='container' style={{width:'100%', height:'400px'}} >
    </div>
}

export default Chart;