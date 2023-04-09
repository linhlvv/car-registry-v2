<script setup>
const props = defineProps(['placeholder', 'type', 'modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
    <input :placeholder="placeholder" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="border-t-none border-r-none border-l-none border-b-2 border-b-[#898c91] placeholder:text-[12px] text-[12px] placeholder:font-medium font-medium placeholder:text-[#1d1d1d] placeholder:opacity-70 py-1"/>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }
</style>