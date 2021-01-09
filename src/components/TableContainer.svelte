<script>
    import TableFilter from './TableFilter.svelte';
    import Table from './Table.svelte';
    export let states;
    $: statesData = states;
</script>

<TableFilter />
<Table states={statesData} />