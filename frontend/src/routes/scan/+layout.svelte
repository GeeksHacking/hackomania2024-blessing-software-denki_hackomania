<script lang="ts">
  import "@fontsource-variable/public-sans";
  import Menu from "svelte-material-icons/Menu.svelte";

  let menuOpen  = false

	const openMenu = () => {
		menuOpen = true
	}

</script>

<style>
  :global(body) {
    font-family: "Public Sans Variable", sans-serif;
  }
</style>

<slot />