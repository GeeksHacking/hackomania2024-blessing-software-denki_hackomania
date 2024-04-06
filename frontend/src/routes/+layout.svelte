<script lang="ts">
  import "../app.css";
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

<nav class ="flex">
  <div class = "hidden md:flex bg-white drop-shadow-md py-[1.5rem] w-full flex-row justify-between ">
    <a href = "/" class = ' text-sky-600 text-xl font-semibold ml-[2rem]'>denki</a>
    <div class = 'flex flex-row justify-evenly min-w-[20rem]'>
      <a href = "/" class = ' text-xl '> devices </a>
      <a href = "/" class = ' text-xl   '> usage </a>
      <a href = "/" class = ' text-xl '> profile </a>
    </div>
  </div>
  {#if !menuOpen }
    
  <div class="flex flex-row relative md:hidden w-full justify-between items-center py-[1rem]">
    <button on:click={openMenu} class = 'ml-[1.2rem]'>
      <Menu size={"2rem"}/>
    </button>
    <div class="flex-grow flex justify-center items-center ">
      <a href="/" class="text-sky-600 text-xl font-semibold">denki</a>
    </div>
  </div>
  {/if}

  
</nav>
{#if menuOpen}
<div class='flex flex-col justify-start md:hidden'> 
  <button class="w-screen h-screen bg-opacity-20 flex flex-col justify-items-center items-center mt-[5rem]" on:click={() => {menuOpen = false}}>
      <a href="/" class="text-xl mb-[1rem]"> devices </a>
      <a href="/" class="text-xl mb-[1rem]"> usage </a>
      <a href="/" class="text-xl mb-[1rem]"> profile </a>
  </button>
</div>
{/if}
<slot />