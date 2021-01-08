<script context="module">
    import usStats from '../data/request.js';
    export async function preload(){
		const usStatsData = await usStats();
		return {usStats: usStatsData};
    }
</script>

<script>
    import {APP_NAME} from './common.svelte'
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    import TableContainer from '../components/TableContainer.svelte';
	export let usStats;
	console.log(usStats);
</script>

<svelte:head>
    <title>{APP_NAME}</title>
</svelte:head>

<CovidStat />
<CovidChart />
<TableContainer />
