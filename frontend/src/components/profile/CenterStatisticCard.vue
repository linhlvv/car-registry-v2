<script setup>
const props = defineProps(['content', 'title', 'contentColor']);
</script>

<template>
    <div class="w-full min-w-[300px] h-[170px] p-4 bg-white flex flex-col items-center justify-between rounded-md shadow">
        <div class="flex items-center justify-between w-full">
            <p class="text-gray-500 text-lg font-medium">{{ title }}</p>
            
            <slot name="headerIcon">

            </slot>
        </div>
        <p :class="contentColor" class="text-5xl font-bold text-left w-full">{{ content }}</p>
        <div class="text-gray-400 text-base font-medium text-left w-full flex items-center gap-1">
            <slot name="detail">

            </slot>
        </div>
    </div>
</template>