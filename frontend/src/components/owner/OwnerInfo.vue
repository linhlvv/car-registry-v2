<script setup>
import OwnerInfoCard from './OwnerInfoCard.vue';
import { useAccountStore } from '../../stores/AccountStore';
import { ref } from 'vue';

const props = defineProps(['id']);

const accountStore = useAccountStore()

const ownerInfo = ref({})
const ownerType = ref()

const fetchOwnerInfo = async () => {
    const res = await fetch(`http://localhost:1111/owner/info`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({ ownerId: props.id }),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    ownerInfo.value = dataFetched.data[0]
    ownerInfo.value.address = ownerInfo.value.address.charAt(0).toUpperCase() + ownerInfo.value.address.slice(1)
    ownerType.value = dataFetched.type
    console.log(JSON.stringify(dataFetched));
};
fetchOwnerInfo()

</script>

<template>
    <div id="info" class="w-full flex flex-col gap-3 overflow-x-scroll">
        <div class="w-full flex items-center justify-between">
            <div class="w-1/4 text-3xl font-medium flex items-center text-[#1d1d1d] text-opacity-60">
                Owner profile
            </div>
            <hr class="border-[1.25px] w-3/4 border-[#1d1d1d] border-opacity-10">
        </div>
        <div class="min-w-[640px] flex rounded-md bg-white shadow-sm">
            <div class="w-[30%] flex flex-col items-center justify-center p-7 gap-5 border-r border-[#1d1d1d] border-opacity-10">
                <div class="flex justify-center">
                    <svg v-if="ownerType === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 p-2 text-[#2acc97] border-dashed border-[3px] rounded-[50px] border-[#2acc97]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 p-2 text-[#2acc97] border-dashed border-[3px] rounded-[50px] border-[#2acc97]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                </div>
                <div class="flex justify-center text-center text-2xl font-medium text-[#1d1d1d] text-opacity-80">
                    {{ ownerInfo.name }}
                </div>
            </div>
            <div class="w-[70%] flex flex-col px-7 py-4 justify-between" :class="ownerType === 1 ? 'gap-5' : ''">
                <div class="w-full flex flex-wrap justify-between">
                    <OwnerInfoCard v-if="ownerType === 1" title="SSN" :content="ownerInfo.ssn" width="w-[30%]"/>
                    <OwnerInfoCard v-else title="Tax Identification Number" :content="ownerInfo.taxnum" width="w-[30%]"/>

                    <OwnerInfoCard v-if="ownerType === 1" title="D.O.B" :content="ownerInfo.dob" width="w-[30%]"/>
                    <OwnerInfoCard title="Phone number" :content="ownerInfo.phone" width="w-[30%]"/>
                    <OwnerInfoCard v-if="ownerType === 1" title="Gender" :content="ownerInfo.gender" width="w-[30%]"/>
                    <OwnerInfoCard v-if="ownerType === 0" title="Ownership" :content="ownerInfo.ownership" width="w-[30%]"/>
                </div>
                <hr>
                <div class="w-full flex">
                    <OwnerInfoCard title="Address" :content="ownerInfo.address" width="w-full" justify="justify-end"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    #info::-webkit-scrollbar {
        height: 6px;
    }
    
    #info::-webkit-scrollbar-track {
        border-radius: 12px;
    }
    
    #info::-webkit-scrollbar-thumb {
        background-color: #2acc97;
        outline: none;
        border-radius: 12px;
    }
    #info::-webkit-scrollbar-thumb:hover {
        background-color: #0ce29b;
    }
</style>