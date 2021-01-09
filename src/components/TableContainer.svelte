<script>
    import TableFilter from './TableFilter.svelte';
    import Table from './Table.svelte';
    export let states;
    let sortBy = 'name';
    let stateName = '';
    $: statesData = sortAndFilterData(states, sortBy, stateName);

    function sortAndFilterData(states_data, sortBy, stateName){
        let result = [...states_data];
        if(stateName!==null && stateName!==undefined && stateName.trim().length>0){
            const stateNameLower = stateName.trim().toLocaleLowerCase();
            result = result.filter(state_data => state_data.stateFullname.toLocaleLowerCase().indexOf(stateNameLower) != -1)
        }
        if(sortBy != 'name'){
            result.sort((a, b) => {
                const aa = parseInt(a[sortBy].replaceAll(/\D/g, ""));
                const bb = parseInt(b[sortBy].replaceAll(/\D/g, ""));
                return bb - aa;
            });
        }
        return result;
    }
</script>
<TableFilter bind:stateName bind:sortBy/>
<Table states={statesData} />