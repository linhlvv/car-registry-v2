<script setup>
const props = defineProps(['description', 'detail', 'icon']);
</script>

<template>
    <div class="bg-[#f2f4f9] flex flex-col w-full h-36 rounded-md active:border-2 active:border-[#2acc97] active:bg-[#cdfcec]/40">
        <div class="text-[#1d1d1d] text-opacity-60 w-full h-[15%] font-semibold text-[10px] flex justify-center items-end text-center">
            {{ description }}
        </div>
        <div class="flex items-center justify-center h-[55%]">
            <i :class="icon" class="text-4xl text-[#1d1d1d] text-opacity-80"></i>
        </div>
        <div class="w-full h-[30%] flex justify-center items-center text-center font-medium text-[13px]">
            {{ detail }}
        </div>
    </div>
</template>