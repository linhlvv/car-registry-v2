<script setup>
import { ref } from 'vue';

const props = defineProps(['modelValue', 'content']);
defineEmits(['update:modelValue']);

const type = ref('password');
const passwordVisionHandler = () => {
    if(type.value === 'password') {
        type.value = 'text'
    } else {
        type.value = 'password'
    }
};
</script>

<template>
    <div class="w-full flex flex-col">
        <div class="text-[12px] font-semibold text-[#1d1d1d] text-opacity-70">{{ content }}</div>
        <div class="w-full p-1 flex items-center rounded-[8px] border-[1.5px] border-solid border-[#1d1d1d] border-opacity-50 bg-white overflow-hidden">
            <input
                :value="modelValue"
                :type="type"
                @input="$emit('update:modelValue', $event.target.value)"
                class="w-[90%] p-1 px-2 text-[#1d1d1d] text-base font-medium"
            />
            <i @click="passwordVisionHandler" v-if="type === 'password'" class="fa-solid fa-eye w-[10%] flex justify-center text-[#1d1d1d] text-opacity-70 cursor-pointer"></i>
            <i @click="passwordVisionHandler" v-else class="fa-solid fa-eye-slash w-[10%] flex justify-center text-[#1d1d1d] text-opacity-70 cursor-pointer"></i>
        </div>
    </div>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }
</style>