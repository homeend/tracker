<script context="module">
    export async function preload(page){
        return {
            state: page.params['state']
        }
    }
</script>

<script>
    import {APP_NAME} from './common.svelte'
    import CovidStat from '../components/CovidStat.svelte';
    import CovidChart from '../components/CovidChart.svelte';
    export let state;
</script>

<svelte:head>
    <title>{state} - {APP_NAME}</title>
</svelte:head>

<CovidStat />
<CovidChart />
