import moment from 'moment';
import {abbreviation2name} from './stateNames.js';

const ERR_TXT = 'temporarily unavailable';

export const ERROR_RESULT = {
    cases: ERR_TXT,
    death: ERR_TXT,
    recovered: ERR_TXT,
    ventilator: ERR_TXT,
    hospitalized: ERR_TXT,
    icu: ERR_TXT,
    tested: ERR_TXT,
    updated: moment().format('LLLL'),
}

function parseStateStats(data, stateShortName){
    const all_states_data = parseStateStatsAsMap(data);
    return all_states_data[stateShortName];
}

function parseStateStatsAsMap(data){
    return data
        .map(state => readStateData(state))
        .reduce((map, state_data) => {
            map[state_data.state] = state_data;
            return map;
        }, []);
}

function parseStateStatsAsArray(data){
    return data
        .map(state => readStateData(state));
}

function readStateData(state_data){    
    const tmp = {
        stateFullname: abbreviation2name[state_data.state],
        state: state_data.state,
        cases: state_data.positive,
        death: state_data.death,
        recovered: state_data.recovered,
        ventilator: state_data.onVentilatorCurrently,
        hospitalized: state_data.hospitalized,
        icu: state_data.inIcuCurrently,
        tested: state_data.totalTestResults,
        updated: moment(state_data.dateModified).format('LLLL'),
    }
    return preProcessData(tmp);      
}

function parseChart(data, key, label, color){
    const chartData = data.map( data_point => {
        return {
            x: moment(data_point.date, "YYYYMMDD"),
            y: data_point[key] || 0
        }
    });

    return {
        label,
        data: chartData,
        fill: false,
        borderColor: color  
    }
}

function parseHistoricStats(data){
    // [
    //     {
    //     date: 20210107,
    //     states: 56,
    //     positive: 21340773,
    //     negative: 201442513,
    //     pending: 11612,
    //     hospitalizedCurrently: 132370,
    //     hospitalizedCumulative: 716151,
    //     inIcuCurrently: 23821,
    //     inIcuCumulative: 38236,
    //     onVentilatorCurrently: 7900,
    //     onVentilatorCumulative: 3748,
    //     dateChecked: "2021-01-07T24:00:00Z",
    //     death: 356229,
    //     hospitalized: 716151,
    //     totalTestResults: 262041062,
    //     lastModified: "2021-01-07T24:00:00Z",
    //     recovered: null,
    //     total: 0,
    //     posNeg: 0,
    //     deathIncrease: 4033,
    //     hospitalizedIncrease: 5318,
    //     negativeIncrease: 1217934,
    //     positiveIncrease: 266197,
    //     totalTestResultsIncrease: 1914839,
    //     hash: "28a62b13edef450b38fce15b12aab87c7cf98f19"
    //     },
    //     {
    //     date: 20210106,

    const statistics = [
        {
            label: 'Cases',
            key: 'positive',
            color: 'rgb(100, 0, 200)',
        },
        {
            label: 'Recovered',
            key: 'recovered',
            color: 'rgb(100, 100, 200)',
        },
        {
            label: 'Total Tested',
            key: 'totalTestResults',
            color: 'rgb(10, 30, 100)',
        },
        {
            label: 'Hospitalized',
            key: 'hospitalizedCurrently',
            color: 'rgb(20, 100, 230)',
        },
        {
            label: 'Deaths',
            key: 'death',
            color: 'rgb(255, 99, 132)',
        },
    ];

    return statistics
        .filter(stat => data.filter(d => d[stat.key] !== null).length > 4)
        .map(stat => parseChart(data, stat.key, stat.label, stat.color));
}

function parseUsStats(data){
    // first element of array
    const [stats] = data; 
    const tmp = {
        cases: stats.positive,
        death: stats.death,
        recovered: stats.recovered,
        ventilator: stats.onVentilatorCurrently,
        hospitalized: stats.hospitalized,
        icu: stats.inIcuCurrently,
        tested: stats.totalTestResults,
        updated: moment(stats.lastModified).format('LLLL'),
    }

    return preProcessData(tmp);      
}

function preProcessData(stats_data){
    const result = {};
    for (const [key, value] of Object.entries(stats_data)) {
        result[key] = formatNumber(value);
    }
    
    return result;      
}

function formatNumber(number){
    if(number === null || number==undefined)
        return 'unknown';
    return number.toLocaleString();
}

// [
//     {
//     date: 20210106,
//     states: 56,
//     positive: 21074576,
//     negative: 200224579,
//     pending: 10062,
//     hospitalizedCurrently: 132464,
//     hospitalizedCumulative: 710833,
//     inIcuCurrently: 23716,
//     inIcuCumulative: 38064,
//     onVentilatorCurrently: 7944,
//     onVentilatorCumulative: 3739,
//     recovered: 8478384,
//     dateChecked: "2021-01-06T24:00:00Z",
//     death: 352196,
//     hospitalized: 710833,
//     totalTestResults: 260126223,
//     lastModified: "2021-01-06T24:00:00Z",
//     total: 0,
//     posNeg: 0,
//     deathIncrease: 3866,
//     hospitalizedIncrease: 6709,
//     negativeIncrease: 1021419,
//     positiveIncrease: 247786,
//     totalTestResultsIncrease: 1619168,
//     hash: "3d8e85c4fb5d8c341aa827a21bd94a4b42472826"
//     }
// ]

export default { parseUsStats, parseStateStats, parseHistoricStats, parseStateStatsAsMap, parseStateStatsAsArray }