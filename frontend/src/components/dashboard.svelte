
<script lang="ts">
  export let count
  export let sum
  export let type
  import { Spinner } from 'flowbite-svelte';


</script>

{#if type == 'device'}
    
<div class = 'flex flex-col justify-center text-center bg-gray-50 shadow-sm rounded-xl hover:shadow-md py-[2rem] px-[2rem] flex justify-center max-w-[30rem] min-w-[30rem] min-h-[15rem] mr-[2rem] my-[1rem]'>
    <p class = 'py-[1rem]'>Currently, you have</p>
    {#if !count}
    <div>
      <Spinner color = 'blue' />
    </div>
    {:else}
    <span class = 'text-8xl text-sky-700'>{count}</span>
    {/if}
    <p class = 'py-[1rem]'>devices connected.</p>
</div>
{:else}
<div class = 'flex flex-col justify-center text-center bg-gray-50 shadow-sm rounded-xl hover:shadow-md py-[2rem] px-[2rem] flex justify-center max-w-[30rem] min-w-[30rem] min-h-[15rem] mr-[2rem] my-[1rem]'>
    <p class = 'py-[1rem]'>Currently, you have used</p>
    {#if !sum}
    <div>
      <Spinner color = "blue"/>
    </div>
    {:else}
    <p><span class = 'text-8xl text-sky-700'>{sum}</span>  KwH</p>
    {/if}

    <p>today.</p>


</div>
{/if}
