<script lang="ts">
  import { io } from "socket.io-client";
  import {onMount} from 'svelte'
  import { page } from '$app/stores';
  import DeviceImage from '../../assets/render.png'
  export let data
  let { backend_uri, session } = data;
  let account
  let devices: [{data: number | null, id: string | null}] = [{data: null, id: null}]
  let notLoaded;
  const getProfile = async () => {
  const response = await fetch (
    `${backend_uri}:3000/api/auth/getUser?email=${session?.user?.email}`
  );
  const parsed = await response.json();
  account = parsed.rows[0]
  notLoaded = false
  };
  const getDevices =  async () => {
    const response = await fetch(`${backend_uri}:3000/api/iot/getDevices?email=${session?.user?.email}`)
    devices = await response.json()
    devices.forEach((device) => {
        if(!device.data){

            device.data = null
        }
    })
  }
  onMount(async () => {
    if (session != undefined) {
      await getProfile();
            await getDevices();
    } else {
      notLoaded = false;
    }
  });
  const socket = io(`${backend_uri}:3000`,{
		transports: ['websocket']
  })
  socket.on(session?.user?.email, ({data, id}: {data: number, id: string}) => {
    devices.find(obj => obj.id == id)!.data = data
    devices = devices
  })
</script>

<h1 class = 'text-center p-[2rem] text-3xl font-semibold'> devices </h1>
<div class = 'flex flex-col items-center justify-center'>
    {#each devices as device }
        <div class = 'flex flex-row justify-between md:min-w-[70%] md:max-w-[70%] bg-gray-50 lg:min-w-[50%] lg:max-w-[50%] my-[0.5rem] rounded-lg shadow-sm hover:shadow-md lg:my-[1rem]'>
            <span class = 'ml-[3rem] my-auto justify-center text-center font-semibold align-middle '>
                ID: {device.id}
                data: {device.data}
            </span>
            <img width="30%" height="100%" src = {DeviceImage} alt = "image of "/>
        </div>
    {/each}
</div>
