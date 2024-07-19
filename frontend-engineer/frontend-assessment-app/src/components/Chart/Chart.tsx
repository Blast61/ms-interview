import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import { useDataLoader } from '../../hooks/useDataLoader';

if(typeof Exporting === 'function'){
    Exporting(Highcharts);
}

const Chart: React.FC = () => {
    const data = useDataLoader();

    const chartOptions = {
        title: {
            text: 'KC Neighborhoods Commuting Preferences ',
            style: {
                color: 'black',
                font: 'Gotham'
            }
        },
        series: [
            {
                name: 'Drive Alone',
                data: data.tracts.features.map(tract => tract.properties['pop-commute-drive_alone'])
                
            },
            {
                name: 'Carpool',
                data: data.tracts.features.map(tract => tract.properties['pop-commute-drive_carpool'])
                
            },
            {
                name: 'Public Transit',
                data: data.tracts.features.map(tract => tract.properties['pop-commute-public_transit'])
            },
            {
                name:'Walk',
                data: data.tracts.features.map(tract => tract.properties['pop-commute-walk'])
            }
        ]
    };
    return (
        <div id='chart-container'>
            <h2 style={{ color: 'black', display: 'flex', justifyContent:'center', fontFamily: 'Gotham',
            fontSize: '28px',
            fontWeight: '700'
            }}id='chart-title'>Commuter Population Chart</h2>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    )
}

export default Chart;