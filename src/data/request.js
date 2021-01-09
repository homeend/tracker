import axios from 'axios';
import parser from './parser.js';
import {ERROR_RESULT} from './parser.js';

String.prototype.formatUnicorn = String.prototype.formatUnicorn || function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

const DATA_ENDPOINT = 'https://api.covidtracking.com/v1/us/current.json';
const DATA_ENDPOINT_STATE = 'https://api.covidtracking.com/v1/states/current.json';
const DATA_ENDPOINT_DAILY = 'https://api.covidtracking.com/v1/us/daily.json';
// const DATA_ENDPOINT_DAILY = 'http://localhost:6688/daily.json';
const DATA_ENDPOINT_DAILY_STATE = 'https://api.covidtracking.com/v1/states/{0}/daily.json';

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

export async function historicStats(){
    try{
        const resp = await axios.get(DATA_ENDPOINT_DAILY);        
        return parser.parseHistoricStats(resp.data);
    }
    catch(e){
        console.error(e);
        return ERROR_RESULT;
    }
}

export async function historicStateStats(stateShortName){
    try{
        const url = DATA_ENDPOINT_DAILY_STATE.formatUnicorn(stateShortName.toLowerCase());
        const resp = await axios.get(url);        
        return parser.parseHistoricStats(resp.data);
    }
    catch(e){
        console.error(e);
        return ERROR_RESULT;
    }
}
