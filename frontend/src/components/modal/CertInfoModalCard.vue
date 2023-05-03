<script setup>
const props = defineProps(['title', 'content']);
</script>

<template>
    <div class="w-full flex justify-between rounded-[8px] bg-[#2acc97]/40 p-3 border-[1.5px] border-[#2acc97] border-solid">
        <p class="text-left text-[14px] font-medium">{{ title }}:</p>
        <p class="text-right text-[14px] font-medium">{{ content }}</p>
    </div>
</template>