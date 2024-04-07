<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/public-sans";
  import Menu from "svelte-material-icons/Menu.svelte";
  import { onMount } from "svelte";

  const detectColorScheme = () => {
    var theme="light";    //default

    if(localStorage.getItem("theme") == "dark"){
      var theme = "dark";
    }

    if (theme=="dark") {
      document.documentElement.setAttribute("class", "dark");
    } else {
      document.documentElement.setAttribute("class", "light");
    }
  }
  
  let menuOpen  = false

	const openMenu = () => {
		menuOpen = true
	}

  onMount(() => {
    detectColorScheme()
  })

</script>

<style>
  :global(body) {
    font-family: "Public Sans Variable", sans-serif;
  }
</style>

<nav class ="flex">
  <div class = "hidden md:flex bg-white drop-shadow-md py-[1.5rem] w-full flex-row justify-between ">
    <a href = "/" class = ' text-sky-600 text-2xl font-bold ml-[2rem]'>denki</a>
    <div class = 'flex flex-row justify-evenly min-w-[20rem]'>
      <a href = "/devices" class = 'text-lg font-semibold'>devices</a>
      <a href = "/usage" class = 'text-lg font-semibold'>usage</a>
      <a href = "/profile" class = 'text-lg font-semibold'>profile</a>
    </div>
  </div>
  {#if !menuOpen }
    
  <div class="flex flex-row relative md:hidden w-full justify-between items-center py-[1rem]">
    <button on:click={openMenu} class = 'ml-[1.2rem]'>
      <Menu size={"2rem"}/>
    </button>
    <div class="flex-grow flex justify-center items-center ">
      <a href="/" class="text-sky-600 text-xl font-semibold mr-[3rem]">denki</a>
    </div>
  </div>
  {/if}

  
</nav>
{#if menuOpen}
<div class='flex flex-col justify-start md:hidden'> 
  <button class="w-screen h-screen bg-opacity-20 flex flex-col justify-items-center items-center mt-[5rem]" on:click={() => {menuOpen = false}}>
      <a href="/devices" class="text-xl mb-[1rem]"> devices </a>
      <a href="/usage" class="text-xl mb-[1rem]"> usage </a>
      <a href="/profile" class="text-xl mb-[1rem]"> profile </a>
  </button>
</div>
{/if}

<slot />