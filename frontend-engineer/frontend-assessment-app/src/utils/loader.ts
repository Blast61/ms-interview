import { LoaderData } from "./types";

export default async function loader(): Promise<LoaderData[]>{
    try{
        const response = await fetch('../')

    } catch (err){
        console.error('Unable to fetch data...')
    }
    return(

    )
}