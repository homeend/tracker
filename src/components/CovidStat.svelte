<script>
    export let stats;
// {
//   cases: '21 340 773',
//   death: '356 229',
//   recovered: '8 588 540',
//   ventilator: '7900',
//   hospitalized: '716 151',
//   icu: '23 821',
//   tested: '262 041 062',
//   updated: 'Friday, January 8, 2021 1:00 AM'
// }
</script>
<style>
    .columns {
        border: solid 1px black;
    }
</style>
<div class="section">
    <div class="container">
        <div class="columns">
            <h2 class="is-3 column">Cases: {stats.cases}</h2>
            <h2 class="is-3 column">Deaths: {stats.death}</h2>
            <h2 class="is-3 column">Recovered: {stats.recovered}</h2>
            <h2 class="is-3 column">Updated: {stats.updated}</h2>
        </div>
    </div>
</div>

<div class="section">
    <div class="container">
        <div class="columns">
            <h2 class="is-3 column">Tested: {stats.tested}</h2>
            <h2 class="is-3 column">Hospitalized: {stats.hospitalized}</h2>
            <h2 class="is-3 column">Total ICU: {stats.icu}</h2>
            <h2 class="is-3 column">Total Ventilatored: {stats.ventilator}</h2>
        </div>
    </div>
</div>
