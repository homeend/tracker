import axios from 'axios';
import parser from './parser';


const DATA_ENDPOINT = 'https://api.covidtracking.com/v1/us/current.json';

export default async function usStats(){
    const resp = await axios.get(DATA_ENDPOINT);
    return parser.parseUsStats(resp.data);
}   