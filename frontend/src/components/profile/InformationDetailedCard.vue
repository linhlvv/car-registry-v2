<script setup>
const props = defineProps(['description', 'detail']);
</script>

<template>
    <div class="border-[1px] bg-[#f5f7fb] rounded-2xl w-full py-3 px-1">
        <div class="flex flex-col items-start px-2">
            <div class="text-[10px] font-medium text-[#1d1d1d] text-opacity-50">{{ description }}</div>
            <div class="text-[11px] font-semibold text-[#1d1d1d]">{{ detail }}</div>
        </div>
    </div>
</template>