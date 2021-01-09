<script context="module">
    import usStats from '../data/request.js';
    import {historicStats} from '../data/request.js';
    import common_data from '../common/data.js';
    export async function preload(){
        const usHistoricData = await historicStats()
		const usStatsData = await usStats();
		return {stats: usStatsData, historic: usHistoricData};
    }
</script>

<script>
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    import TableContainer from '../components/TableContainer.svelte';
	export let stats;
    export let historic;
</script>

<svelte:head>
    <title>{common_data.APP_NAME}</title>
</svelte:head>

<CovidStat {stats}/>
<CovidChart historicData={historic} title="Covid Statistic US" />
<TableContainer />
