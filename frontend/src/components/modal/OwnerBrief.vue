<script setup>
import OwnerBriefCard from './OwnerBriefCard.vue';

const props = defineProps(['ownerName', 'ssn', 'address' ,'dob', 'taxNum', 'male', 'phone']);
</script>

<template>
    <div class="h-[90%] flex flex-col items-start pt-2 text-white">
        <div class="flex flex-col gap-1 items-center justify-center w-full">
            <i class="fa-solid fa-user-tie text-6xl text-white border-4 rounded-[50%] border-white border-opacity-90 p-4 px-5"></i>
            <div class="text-2xl font-semibold hover:underline cursor-pointer flex items-center gap-1 pl-4 text-center">
                Vu Minh Tuan
                <div v-if="male">
                    <sup> <i class="fa-solid fa-mars"></i> </sup>
                </div>
                <div v-else>
                    <sup> <i class="fa-solid fa-venus"></i> </sup>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full items-center mt-4 gap-3">
            <OwnerBriefCard icon="fa-solid fa-cake-candles" description="D.O.B" detail="28/12/2003"/>
            <OwnerBriefCard icon="fa-solid fa-id-card" description="SSN" detail="001203028053"/>
            <OwnerBriefCard icon="fa-solid fa-map-location-dot" description="Address" detail="148 pho Yen Phu, quan Tay Ho, Ha Noi"/>
            <OwnerBriefCard icon="fa-solid fa-scroll" description="Tax Identification Number" detail="1234567890123"/>
            <OwnerBriefCard icon="fa-solid fa-phone" description="Phone number" detail="0981054950"/>
        </div>
    </div>
</template>