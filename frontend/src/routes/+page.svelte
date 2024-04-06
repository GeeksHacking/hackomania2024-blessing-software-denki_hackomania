<script>
    import { CirclePlusSolid } from 'flowbite-svelte-icons';
    import { Modal } from 'flowbite-svelte'
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import QRIcon from '../assets/qr-code-svgrepo-com.svg'
    import Dashboard from '../components/dashboard.svelte';
</script>


<h1 class = 'text-center text-5xl py-5'> welcome back to <span class = 'text-sky-600'>denki.</span></h1>

<div class = 'flex justify-center'>
    <Dashboard />
</div>

<Button>
    <CirclePlusSolid class=" fixed h-[4rem] w-[4rem] bottom-[2rem] right-[1.5rem] text-sky-600 me-4"/> 
</Button>
<Dropdown class = ' fixed flex flex-col justify-center rounded-md shadow-md p-[1rem] bottom-[6rem] right-[1.5rem]'>
  <DropdownItem href="/scan" class = 'flex max-w-[25rem]'>QR Code Scanner <img class = 'ml-[1rem]' width='5%' height ='5%' src = {QRIcon} alt = 'QR Icon'> </DropdownItem>
</Dropdown>