<script>
    import {APP_NAME} from './common.svelte'
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    import TableContainer from '../components/TableContainer.svelte';
</script>

<svelte:head>
    <title>{APP_NAME}</title>
</svelte:head>


<CovidStat />
<CovidChart />
<TableContainer />
