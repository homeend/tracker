import moment from 'moment';

const err_txt = 'temporarily unavailable';
export const ERROR_RESULT = {
    cases: err_txt,
    death: err_txt,
    recovered: err_txt,
    ventilator: err_txt,
    hospitalized: err_txt,
    icu: err_txt,
    tested: err_txt,
    updated: moment().format('LLLL'),
}
