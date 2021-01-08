<script>
	export let status;
	export let error;
	const dev = process.env.NODE_ENV === 'development';
	console.error('error_page', error, 'is_dev', dev);
</script>

<style>
	.container {
		margin: 40px;
	}
</style>

<svelte:head>
	<title>Error - {status}</title>
</svelte:head>

{#if status === 404}
	<div class="container">
		<article class="message is-warning">
			<div class="message-header">
				<p>Page not found</p>
			</div>
			<div class="message-body">
				<a href="/">Click here</a> to go to home page.
			</div>
		</article>
	</div>
<!-- {:else if status === 500} -->
{:else}
	<div class="container">
		<article class="message is-danger">
			<div class="message-header">
				<p>Unknown error</p>
			</div>
			<div class="message-body">
				Server error occurred while processing request.
				<br/>
				Try again in a moment.
				<br/>
				<br/>
				Message: 
				<br/>
				{error.message}
				<br/>
				<br/>
				<a href="/">Click here</a> to go to home page.
			</div>
		</article>
	</div>
{/if}
