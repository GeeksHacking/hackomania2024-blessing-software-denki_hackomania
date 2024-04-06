<script>
  import { Html5Qrcode } from 'html5-qrcode'
  import { onMount } from 'svelte'

  let scanning = false

  let html5Qrcode

  onMount(async()=>{
    await init()
    await start()
  })

  async function init() {
      html5Qrcode = new Html5Qrcode('reader')
  }

  async function start() {
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
</style>

<main>
  <reader  id="reader"/>
  {#if scanning}
      <button on:click={stop}>stop</button>
  {:else}
      <button on:click={start}>start</button>
  {/if}
</main>