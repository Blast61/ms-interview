import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { loader as loadData, LoaderData} from '../utils/loader'
import Map from './map'
import Chart from './chart'

//Creates a loader object as a LoaderFunction type and assigns 'loadData' as its alias. 
export const loader: LoaderFunction = loadData;

//Creates a React component "Index"
const Index: React.FC = () => {
  //Represents fetched and parsed data from the loader object
  const data = useLoaderData< LoaderData>() 

  //Error handling 
  if(!data){
    return <div>Loading...</div>
  }

  //Returns valid JSX containing the Map and Chart routes/components
  return (
  <div>
    <Map data={data} />
    <Chart data={data} />
  </div>
)}

export default Index;