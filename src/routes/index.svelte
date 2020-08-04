<script context="module">
	import request from '../data/request.js';

	export async function preload() {
		try {
			const usStats = await request.usStats();
			// const beStats = await request.beStats();
			const historicalStats = await request.historicUs();
			return { usStats, historicalStats }
		} catch(e) {
			return this.error(500, "There is an error with the API. Please retry in few minutes.")
		}
	}
</script>

<script>
	import CovidStat from '../components/CovidStat.svelte';
	import CovidChart from '../components/CovidChart.svelte';
	import TableContainer from '../components/TableContainer.svelte';

	export let usStats;
	// export let beStats;
	// console.log(beStats);
	export let historicalStats;
</script>

<svelte:head>
	<title>Covid-19 tracker</title>
</svelte:head>

<div class="section header">
	<div class="container">
		<h1>Covid-19 - US</h1>
	</div>
</div>

<CovidStat {...usStats}/>

<CovidChart historicalData={historicalStats} title="US Covid-19" />

<TableContainer />
