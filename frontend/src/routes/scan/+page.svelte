<script>
  import { Html5Qrcode } from 'html5-qrcode'
  import { onMount, onDestroy} from 'svelte'
  import { Spinner } from 'flowbite-svelte';
  import { page } from '$app/stores';
  export let data
  let { backend_uri, session } = data;
  let account;
  let notLoaded;

  const getProfile = async () => {
    const response = await fetch(
      `${backend_uri}:3000/api/auth/getUser?email=${session?.user?.email}`
    );
    const parsed = await response.json();
    account = parsed.rows[0]
    console.log(account)
		notLoaded = false
  };

  onMount(async () => {
		if (session != undefined) {
			getProfile();
		} else {
			notLoaded = false;
		}
	});

  let scanning = false
  let success = true

  let html5Qrcode
  let innerWidth = 0
  let innerHeight = 0
  onMount(async()=>{
    await init()
    await start()
    console.log(innerWidth,innerHeight)
  })


  async function init() {
      html5Qrcode = new Html5Qrcode('reader')
  }

  async function start() {

    if(innerWidth < 768){

        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 100, height:100 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true

    }else{
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 200, height:200 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }
    
  }

  async function stop() {
      await html5Qrcode.stop()
      scanning = false
  }

  async function onScanSuccess(decodedText, decodedResult) {
 
      try{

          const registerDevice = await fetch(`${backend_uri}:3000/api/iot/registerDevice`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id : decodedText,
                email:session?.user?.email
            })
          })
          if(registerDevice.status == 409){
            alert('device already registered!')
          }
      }catch(err){
        alert(err)
        throw err
      }





  }

  function onScanFailure(error) {
    //   console.warn(`Code scan error = ${error}`)
  }
</script>
<!-- 
<style>
  main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  reader {
      width: 100%;
      min-height: 80%;
      background-color: black;
  }
</style> -->
<svelte:window bind:innerWidth bind:innerHeight/>
{#if notLoaded}
<Spinner/>
{:else}


 <!--  desktop view -->
{#if innerWidth > 768 }
    
<main class = 'flex flex-col items-center text-center justify-center min-h-[50%] max-h-[50%] mt-[2rem]'>
    <p class = 'font-semibold py-[1rem] text-xl'>Scan QR to add device.</p>
  <reader class ="w-[50%] min-h-[50%] max-h-[50%]" id="reader"/>
</main>
{:else}
<main class = 'flex flex-col justify-center text-center min-h-[50%] max-h-[50%] mt-[9rem]'>
    <p class = 'font-semibold py-[1rem]'>Scan QR to add device.</p>
    <reader class ="w-screen" id="reader"/>
  </main>   
{/if}
{/if}