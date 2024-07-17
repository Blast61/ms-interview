import * as React from 'react'
import Highcharts from 'highcharts'
import { ChartProps } from '../utils/types'

const Chart: React.FC<ChartProps> =({ data }) => {
    
    const { tractsData, neighborhoodsData } = data;
    
    React.useEffect(() => {
    if(!tractsData || !neighborhoodsData) return;

    const tractsSeriesData = tractsData.features.map(feature => {
        return feature.properties ? feature.properties['pop-commute-drive_alone'] : 0;
    })

    const neighborhoodsSeriesData = neighborhoodsData.features.map(feature => {
        return feature.properties ? feature.properties['pop-commute-drive_alone'] : 0;
    });

    Highcharts.chart({
            chart: {
                type: 'bar',
                renderTo: 'container'
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
                type: 'bar',
                name: 'kc-tracts',
                data: tractsSeriesData
            }, {
                type: 'bar',
                name: 'kc-neighborhoods',
                data: neighborhoodsSeriesData
            }]
        });
  }, [tractsData, neighborhoodsData]);

  return <div id='container' style={{width:'100%', height:'400px'}} >
    </div>
}

export default Chart;