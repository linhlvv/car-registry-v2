<script setup>
import OwnerBriefCard from './OwnerBriefCard.vue';

const props = defineProps([
    'ownerType',
    'ownerInfo'
]);
</script>

<template>
    <div class="h-[90%] flex flex-col items-start pt-2 p-3 text-white">
        <div class="flex min-[560px]:flex-col gap-1 max-[560px]:gap-2 items-center justify-center w-full">
            <i v-if="ownerType === 1" class="fa-solid fa-user-tie text-6xl max-[560px]:hidden text-white border-4 rounded-[50%] border-white border-opacity-90 p-4 px-5"></i>
            <i v-else class="fa-solid fa-landmark text-6xl max-[560px]:hidden text-white border-4 rounded-[50%] border-white border-opacity-90 p-4 px-5"></i>
            <div class="text-2xl font-semibold hover:underline cursor-pointer flex items-center gap-1 text-center max-[910px]:text-xl max-[760px]:text-base max-[650px]:text-sm">
                <router-link :to="'/owner/' + ownerInfo.ownerId">{{ ownerInfo.ownerName }}</router-link>
            </div>
        </div>
        <div class="flex flex-col w-full items-center mt-4 gap-3 max-[560px]:hidden">
            <OwnerBriefCard v-if="ownerType === 1" icon="fa-solid fa-cake-candles" description="D.O.B" :detail="ownerInfo.ownerDOB"/>
            <OwnerBriefCard v-if="ownerType === 1" icon="fa-solid fa-id-card" description="SSN" :detail="ownerInfo.ownerSSN"/>
            <OwnerBriefCard icon="fa-solid fa-map-location-dot" description="Address" :detail="ownerInfo.ownerAddress"/>
            <OwnerBriefCard v-if="ownerType === 0" icon="fa-solid fa-scroll" description="Tax Identification Number" :detail="ownerInfo.ownerTax"/>
            <OwnerBriefCard icon="fa-solid fa-phone" description="Phone number" :detail="ownerInfo.ownerPhone"/>
        </div>
    </div>
</template>