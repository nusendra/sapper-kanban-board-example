<svelte:head>
  <style src="../main.scss"></style>
</svelte:head>

<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
