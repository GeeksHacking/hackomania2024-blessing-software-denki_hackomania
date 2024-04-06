<script lang ="ts">

import { onMount, onDestroy} from 'svelte'
  import { Spinner } from 'flowbite-svelte';
  import { page } from '$app/stores';
  export let data
  let { backend_uri, session } = data;
  let account;
  let notLoaded = true
  let graphGenerated = false
  let pdf 

  const getProfile = async () => {
    const response = await fetch(
      `${backend_uri}:3000/api/auth/getUser?email=${session?.user?.email}`
    );
    const parsed = await response.json();
    account = parsed.rows[0]
    notLoaded = false
  };

  const getReport = async() => {
    const response = await fetch(`${backend_uri}:8000/generateReport/overall`)
  }

  onMount(async () => {
		if (session != undefined) {
			await getProfile();
            notLoaded = false
		} else {
			notLoaded = false;
		}
	});

</script>

{#if notLoaded}
    <Spinner color = 'blue'/>
    {:else}
    <h1 class = "font-semibold text-2xl text-center pt-[2rem]"> overall usage report </h1>

{/if}