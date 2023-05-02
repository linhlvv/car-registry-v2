<script setup>
const props = defineProps(['placeholder', 'type', 'modelValue', 'title']);
defineEmits(['update:modelValue']);
</script>

<template>
    <div class="text-[11px] font-medium text-[#898c91] ml-[1px]">{{ title }}</div>
    <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="border-t-none border-r-none border-l-none border-b-2 border-b-[#898c91] placeholder:text-[14px] text-[14px] placeholder:font-medium font-medium placeholder:text-[#1d1d1d] placeholder:opacity-70 py-1"/>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }
</style>