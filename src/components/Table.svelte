<script>
    import {abbreviation2name} from '../data/stateNames.js';
    export let states;
    const states_array = [];
    
	for (var key in states){
        states_array.push(states[key]);
	}

</script>

<style>
    .table {
        width: 100%;
    }
    .section {
        padding: 0.5rem 1.5rem;
    }

</style>



<div class="section">
    <div class="container">
        <table class="table is-bordered is-striped">
            <thead>
                <tr>
                    <th>State</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                    <th>Total Tested</th>
                </tr>
            </thead>
            <tbody>
            {#each states_array as state (state.state)}
            <tr>
                <td><a href="{state.state}">{abbreviation2name[state.state]}</a></td>
                <td>{state.cases}</td>
                <td>{state.death}</td>
                <td>{state.tested}</td>
            </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
