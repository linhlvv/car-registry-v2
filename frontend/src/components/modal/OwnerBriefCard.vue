<script setup>
const props = defineProps(['icon', 'description', 'detail']);
</script>

<template>
    <div class="flex w-4/5">
        <div class="w-1/5 flex items-center justify-center mb-[2px]">
            <i :class="icon" class="text-lg flex items-center justify-center max-[760px]:text-sm"></i>
        </div>
        <div class="w-4/5 flex flex-col justify-center items-start">
            <div class="text-[9px] font-bold max-[760px]:text-[8px]"> {{ description }} </div>
            <div class="text-[13px] font-medium max-[760px]:text-[11px]"> {{ detail }} </div>
        </div>
    </div>
</template>