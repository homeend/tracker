import moment from 'moment';

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
    const state_data = data.find(state => state.state === stateShortName);
    const tmp = {
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

export default { parseUsStats, parseStateStats }