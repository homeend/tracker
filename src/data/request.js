import axios from 'axios';
import moment from 'moment';
import parser from './parser';


const DATA_ENDPOINT = 'https://api.covidtracking.com/v1/us/current.json';

export default async function usStats(){
    try{
        const resp = await axios.get(DATA_ENDPOINT);
        return parser.parseUsStats(resp.data);
    }
    catch(e){
        // console.log(e);
        const err_txt = 'temporarily unavailable';
        const result = {
            cases: err_txt,
            death: err_txt,
            recovered: err_txt,
            ventilator: err_txt,
            hospitalized: err_txt,
            icu: err_txt,
            tested: err_txt,
            updated: moment().format('LLLL'),
        }
        return result;
    }
}   