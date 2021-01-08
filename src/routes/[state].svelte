<script context="module">
    import {ERROR_RESULT} from '../data/parser.js';
    import stateNames from '../data/stateNames.js';

    export async function preload(page){
        const stateName = page.params['state']
        if(stateName === 'error_exception_test'){
            throw new Error('Error exception test');
        }
        const stateData = stateNames.find(elem => elem.abbreviation === stateName);

        if(stateData === undefined){
            this.error(404, 'State not found');
            return;
        }
        else
            return {
                stateShort: stateName,
                stateFullName: stateData.name
            }
    }
    let stats = ERROR_RESULT;
</script>

<script>
    import common_data from '../common/data.js';
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    export let stateShort;
    export let stateFullName;
</script>

<svelte:head>
    <title>{stateShort} - {stateFullName} - {common_data.APP_NAME}</title>
</svelte:head>

<CovidStat {stats}/>
<CovidChart />
