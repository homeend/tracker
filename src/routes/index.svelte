<script context="module">
    import usStats from '../data/request.js';
    import {allStateStats, historicStats} from '../data/request.js';
    import common_data from '../common/data.js';
    export async function preload(){
        const usHistoricData = await historicStats()
		const usStatsData = await usStats();
        const allStateStatsData = await allStateStats();
		return {stats: usStatsData, historic: usHistoricData, states: allStateStatsData};
    }
</script>

<script>
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    import TableContainer from '../components/TableContainer.svelte';
	export let stats;
    export let historic;
	export let states;
</script>

<svelte:head>
    <title>{common_data.APP_NAME}</title>
</svelte:head>

<CovidStat {stats}/>
<CovidChart historicData={historic} title="US Covid Statistic" />
<TableContainer {states}/>
