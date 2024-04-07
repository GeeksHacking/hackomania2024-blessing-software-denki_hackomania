<script lang="ts">
    import {io} from 'socket.io-client'
    import {onMount} from 'svelte'
    import { CirclePlusSolid } from 'flowbite-svelte-icons';
    import { Modal } from 'flowbite-svelte'
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import QRIcon from '../assets/qr-code-svgrepo-com.svg'
    import Dashboard from '../components/dashboard.svelte';
    import DeviceDash from '../components/deviceDash.svelte';
    import { page } from '$app/stores';
    export let data
    let { backend_uri, session } = data;
    let account;
    let notLoaded = true
    let count
    let sum


    const getProfile = async () => {
    const response = await fetch(
      `${backend_uri}:3000/api/auth/getUser?email=${session?.user?.email}`
    );
    const parsed = await response.json();
    account = parsed.rows[0]
    notLoaded = false
};
    
    const getDevices = async () => {
        let response = await fetch(`${backend_uri}:3000/api/iot/getDevices?email=${session?.user.email}`)
        response = await response.json()
        count = response.length
        console.log(count)
    }
    
    const getSum = async () => {
        let response = await fetch(`${backend_uri}:3000/api/iot/getSum?email=${session?.user.email}`)
        response = await response.json()
        sum = Math.round(response.sum * 100) / 100
        
    }

    const socket = io(`${backend_uri}:3000`,{
		transports: ['websocket']
  })
    socket.on(session?.user?.email, ({data, id}: {data: number, id: string}) => {
        sum = Math.round((sum+data) * 100) / 100
    })

    onMount(async () => {
		if (session != undefined) {
			await getProfile();
             Promise.all[getDevices(),getSum()]
            notLoaded = false
            // await getReport();
		} else {
			notLoaded = false;
		}
	});

  
</script>

<div class = "flex flex-col justify-center items-center">

    <h1 class = 'text-center text-5xl py-5'> welcome back to <span class = 'text-sky-600'>denki.</span></h1>
    
    <div class = 'flex flex-col justify-center text-center'>
        <div class = 'flex flex-col justify-center text-center'>
            <Dashboard type = {'device'} count = {count}/>
            <Dashboard data = {data} sum = {sum} />
        </div>
    
    </div>
    
    <Button>
        <CirclePlusSolid class=" fixed h-[4rem] w-[4rem] bottom-[2rem] right-[1.5rem] text-sky-600 me-4"/> 
    </Button>
    <Dropdown class = ' fixed flex flex-col justify-center rounded-md shadow-md p-[1rem] bottom-[6rem] right-[1.5rem]'>
      <DropdownItem href="/scan" class = 'flex max-w-[25rem]'>QR Code Scanner <img class = 'ml-[1rem]' width='5%' height ='5%' src = {QRIcon} alt = 'QR Icon'> </DropdownItem>
    </Dropdown>
</div>