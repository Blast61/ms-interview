import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { loader as loadData, LoaderData} from '../utils/loader'
import Map from './map'
import Chart from './chart'


export const loader: LoaderFunction = loadData;
const Index: React.FC = () => {
  const data = useLoaderData< LoaderData>() 

  if(!data){
    return <div>Loading...</div>
  }
  return (
  <div>
    <Map data={data} />
    <Chart data={data} />
  </div>
)}

export default Index;