<script>
  import { Html5Qrcode } from 'html5-qrcode'
  import { onMount, onDestroy } from 'svelte'

  let scanning = false

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

  function onScanSuccess(decodedText, decodedResult) {
      alert(`Code matched = ${decodedText}`)
      console.log(decodedResult)
  }

  function onScanFailure(error) {
      console.warn(`Code scan error = ${error}`)
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