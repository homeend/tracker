<script>
    import TableFilter from './TableFilter.svelte';
    import Table from './Table.svelte';
import stateNames from '../data/stateNames';
    export let states;
    let sortBy = 'name';
    let stateName = '';
    $: statesData = states;
</script>
<TableFilter bind:stateName bind:sortBy/>
<Table states={statesData} />