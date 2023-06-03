<script setup>
const props = defineProps(['carType']);
</script>

<template>
    <div class="bg-[#f5f7fb] min-w-[800px] py-3 px-2 flex w-full">
        <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-[14%]">
            License plate
        </div>
        <div class="font-bold text-[12px] text-[#4f555a] flex items-center w-[22%]">
            Name
        </div>
        <div v-if="carType === 'registed'" class="w-[26%] flex items-center">
            <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Registry date
            </div>
            <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Expired date
            </div>
        </div>
        <div v-else-if="carType === 'expired'" class="w-[26%] flex items-center">
            <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Duration
            </div>
            <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Expired date
            </div>
        </div>
        <div v-else class="w-[26%] flex items-center">
            <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Registry date
            </div>
            <div class="font-bold text-[12px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Expired date
            </div>
        </div>
        <div class="font-bold text-[12px] text-[#4f555a] flex items-center justify-end w-[17%]">
            Owner
        </div>
        <div class="text-xl flex items-center w-[21%]">
            
        </div>
    </div>
</template>