<script context="module">
  import stateNames from '../data/stateNames.js';
  import request from '../data/request.js';

  export async function preload(page) {
    const state = page.params['state'];
    if(stateNames.find(s => s.abbreviation === state) === undefined) {
      this.error(404, 'State not found');
      return;
    }
    const fullStateName = stateNames.find(s => s.abbreviation === state).name;
    try {
      const stats = await request.stateStats(state);
      const historic = await request.historicState(state)
      return {
            state: fullStateName, stats, historic
          };
    } catch(e) {
      return this.error(500, "There is an error with the API. Please retry in few minutes.");
    }
  }
</script>

<script>
	import CovidStat from '../components/CovidStat.svelte';
	import CovidChart from '../components/CovidChart.svelte';
  import TableContainer from '../components/TableContainer.svelte';
  
  export let state;
  export let stats;
  export let historic;
</script>

<svelte:head>
	<title>Covid-19 tracker - {state}</title>
</svelte:head>

<div class="section header">
	<div class="container">
		<h1>Covid-19 - {state}</h1>
	</div>
</div>


<CovidStat {...stats} />

<CovidChart historicalData={historic} title="Covid-9 - {state}"/>

