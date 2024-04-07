<script lang ="ts">
    
import { onMount, onDestroy} from 'svelte'
  import { Spinner } from 'flowbite-svelte';
  import { page } from '$app/stores';
  export let data
  let { backend_uri, session } = data;
  let account;
  let notLoaded = true
  let graphGenerated = false
  let pdfURL = "http://18.141.136.158:8000/generateReport/A123"
  const getProfile = async () => {
    const response = await fetch(
      `${backend_uri}:3000/api/auth/getUser?email=${session?.user?.email}`
    );
    const parsed = await response.json();
    account = parsed.rows[0]
    notLoaded = false
  };

//   const getReport = async() => {
//     const response = await fetch(`http://18.141.136.158:8000/generateReport/A123`,{
//         method:'GET'
//     })
//     console.log(response)
//     graphGenerated = true
//   }

  onMount(async () => {
		if (session != undefined) {
			await getProfile();
            notLoaded = false
            // await getReport();
		} else {
			notLoaded = false;
		}
	});



</script>

{#if notLoaded}
    <Spinner color = 'blue'/>
    {:else}
    <h1 class = "font-semibold text-2xl text-center pt-[2rem]"> overall usage report </h1>
    <a href = {pdfURL}>download pdf</a>

{/if}