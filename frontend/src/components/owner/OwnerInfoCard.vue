<script setup>
const props = defineProps(['width', 'title', 'content', 'justify']);
</script>

<template>
    <div class="py-2 flex flex-col" :class="width, justify">
        <div class="text-xs text-[#2acc97] font-bold">
            {{ title }}
        </div>
        <div class="text-base text-[#1d1d1d] text-opacity-90 font-medium">
            {{ content }}
        </div>
    </div>
</template>