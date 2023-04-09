<script setup>
defineProps(['modelValue', 'title', 'inputWidth', 'type', 'disabled']);
defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col" :class="inputWidth">
        <div class="text-[8px] text-[#1d1d1d] text-opacity-90 font-bold">{{ title }}</div>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="type"
            class="p-2 font-medium border-b border-b-[#1d1d1d] border-opacity-50 text-[#1d1d1d] disabled:bg-opacity-60 text-xs w-full"
            :disabled="disabled === true"
        />
    </div>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }
</style>