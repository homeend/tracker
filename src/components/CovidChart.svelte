<script>
    import {onMount, onDestroy} from 'svelte';
    import Chart from 'chart.js';

    export let historicData;
    export let title;

    let hideChart = false;
    let chartElement;
    let chart;

    console.log('historicData', historicData);

    onMount(() => {
        if(historicData && document.body.clientWidth > 680){
            createChart();
        }
        else{
            hideChart = true;
            // console.log('hideChart');
        }
    });
    onDestroy(() => {
        if(chart){
            chart.destroy();
        }
    });

    function createChart(){
        // console.log('createChart');
        chartElement = new Chart(chartElement.getContext('2d'), {
            type: 'line',
            data: {
                datasets: historicData
            },
            options: {
                responsive: true,
                tooltips: {
                    callback: {
                        label: function(tooltipItem, data){
                            let lable = data.datasets[tooltipItem.datasetIndex];
                            lable += ": ";
                            lable += tooltipItem.yLabel.toLocalString();
                            return lable;
                        }
                    }
                },
                title: {
                    display: true,
                    text: title
                },
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                parser: 'M/D/YY',
                                tooltipFormat: 'll'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                            },
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(value, index, values){
                                    return value.toLocaleString();
                                }
                            }
                        }                        
                    ]
                }
            }
        });
    }
</script>


{#if !hideChart}
<div class="container">
    <canvas bind:this={chartElement}></canvas>
</div>
{/if}

chart