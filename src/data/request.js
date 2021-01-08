import axios from 'axios';
import parser from './parser.js';
import {ERROR_RESULT} from './parser.js';


const DATA_ENDPOINT = 'https://api.covidtracking.com/v1/us/current.json';
const DATA_ENDPOINT_STATE = 'https://api.covidtracking.com/v1/states/current.json';

export default async function usStats(){
    try{
        const resp = await axios.get(DATA_ENDPOINT);
        return parser.parseUsStats(resp.data);
    }
    catch(e){
        return ERROR_RESULT;
    }
}   

export async function stateStats(stateShortName){
    try{
        const resp = await axios.get(DATA_ENDPOINT_STATE);        
        return parser.parseStateStats(resp.data, stateShortName);
    }
    catch(e){
        return ERROR_RESULT;
    }
}