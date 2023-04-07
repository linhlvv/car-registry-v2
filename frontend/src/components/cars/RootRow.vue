<script setup>
const props = defineProps(['carType']);
</script>

<template>
    <div class="bg-[#f5f7fb] py-3 px-2 flex w-full">
        <div class="max-[736px]:w-[28%] font-bold text-[12px] max-[900px]:text-[11px] text-[#4f555a] flex items-center text-center justify-center w-[14%]">
            License plate
        </div>
        <div class="max-[736px]:w-[36%] font-bold text-[12px] max-[900px]:text-[11px] text-[#4f555a] flex items-center w-[22%]">
            Name
        </div>
        <div v-if="carType === 'registed'" class="w-[26%] flex items-center max-[736px]:hidden">
            <div class="font-bold text-[12px] max-[900px]:text-[11px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Registry date
            </div>
            <div class="font-bold text-[12px] max-[900px]:text-[11px] text-[#4f555a] flex items-center text-center justify-center w-1/2">
                Expired date
            </div>
        </div>
        <div v-else class="font-bold text-[12px] max-[900px]:text-[11px] text-[#4f555a] flex items-center text-center justify-center w-[26%]">
            Expired date
        </div>
        <div class="font-bold text-[12px] max-[900px]:text-[11px] text-[#4f555a] flex items-center justify-end w-[17%]">
            Owner
        </div>
        <div class="text-xl flex items-center w-[21%]">
            
        </div>
    </div>
</template>