<script context="module">
    import {ERROR_RESULT} from '../data/parser.js';

    export async function preload(page){
        return {
            state: page.params['state']
        }
    }
    let stats = ERROR_RESULT;
</script>

<script>
    import common_data from '../common/data.js';
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    export let state;
</script>

<svelte:head>
    <title>{state} - {common_data.APP_NAME}</title>
</svelte:head>

<CovidStat {stats}/>
<CovidChart />
