import axios from 'axios';
import parser from './parser.js';
import {ERROR_RESULT} from './error.js';


const DATA_ENDPOINT = 'https://api.covidtracking.com/v1/us/current.json';

export default async function usStats(){
    try{
        const resp = await axios.get(DATA_ENDPOINT);
        return parser.parseUsStats(resp.data);
    }
    catch(e){
        return ERROR_RESULT;
    }
}   