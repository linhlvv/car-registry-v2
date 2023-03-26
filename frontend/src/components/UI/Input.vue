<script setup>
defineProps(['placeholder', 'type', 'modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
    <input 
        :placeholder="placeholder" 
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="placeholder:text-xs font-semibold py-2 pl-3 border-[1px] border-opacity-30 rounded-[4px] border-solid border-[#1d1d1d] w-full"
    />
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }
</style>