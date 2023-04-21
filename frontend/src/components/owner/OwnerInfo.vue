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
    <div class="w-full flex flex-col gap-3">
        <div class="w-full flex items-center justify-between">
            <div class="w-1/4 text-3xl font-medium flex items-center text-[#1d1d1d] text-opacity-60">
                Owner profile
            </div>
            <hr class="border-[1.25px] w-3/4 border-[#1d1d1d] border-opacity-10">
        </div>
        <div class="w-full flex rounded-md bg-white shadow-sm">
            <div class="w-[30%] flex flex-col p-7 gap-5 border-r border-[#1d1d1d] border-opacity-10">
                <div class="flex justify-center">
                    <i v-if="ownerType === 1" class="fa-solid fa-user-tie text-6xl text-[#2acc97] border-4 rounded-[50%] border-[#2acc97] border-opacity-90 p-4 px-5"></i>
                    <i v-else class="fa-solid fa-landmark text-6xl text-[#2acc97] border-4 rounded-[50%] border-[#2acc97] border-opacity-90 p-4 px-5"></i>
                </div>
                <div class="flex justify-center text-center text-2xl font-medium text-[#1d1d1d] text-opacity-80">
                    {{ ownerInfo.name }}
                </div>
            </div>
            <div class="w-[70%] flex flex-col p-7 justify-between">
                <div class="h-[45%] w-full flex" :class="ownerType === 1 ? 'justify-between' : 'gap-5'">
                    <OwnerInfoCard v-if="ownerType === 1" title="SSN" :content="ownerInfo.ssn" width="w-[30%]"/>
                    <OwnerInfoCard v-else title="Tax Identification Number" :content="ownerInfo.taxnum" width="w-[30%]"/>

                    <OwnerInfoCard v-if="ownerType === 1" title="D.O.B" content="28/12/2003" width="w-[30%]"/>
                    <OwnerInfoCard title="Phone number" :content="ownerInfo.phone" width="w-[30%]"/>
                </div>
                <hr>
                <div class="h-[45%] w-full flex">
                    <OwnerInfoCard title="Address" :content="ownerInfo.address" width="w-full" justify="justify-end"/>
                </div>
            </div>
        </div>
    </div>
</template>