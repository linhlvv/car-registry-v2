<script setup>
const props = defineProps(['icon', 'description', 'detail']);
</script>

<template>
    <div class="flex w-4/5 max-md:w-full">
        <div class="w-1/5 flex items-center justify-center mb-[2px]">
            <i :class="icon" class="text-lg flex items-center justify-center"></i>
        </div>
        <div class="w-4/5 flex flex-col justify-center items-start">
            <div class="text-[9px] font-bold"> {{ description }} </div>
            <div class="text-[13px] font-medium"> {{ detail }} </div>
        </div>
    </div>
</template>