<script setup>
import { ref } from 'vue';

const props = defineProps(['info']);
const emit = defineEmits(['exit']);

const exit = () => {
    emit('exit')
};

const modifiedInfo = ref({...props.info});
</script>

<template>
    <div @click="exit" class="bg-black/40 top-0 left-0 w-full h-full blur-xl fixed z-10"></div>
    <div class="bg-white flex-col rounded-[8px] fixed top-[17vh] left-[20%] max-[560px]:left-[10%] w-3/5 max-[560px]:w-4/5 z-50 flex modal-animation overflow-hidden max-[560px]:flex-col max-[560px]:absolute">
        <div class="w-full flex items-center justify-end p-2" @click="exit">
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-[50%] text-[#cc5b2a] hover:text-[#ff5004]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <span class="w-full p-4 text-center text-lg font-semibold text-[#3c3c3c]">
            Account Modification
        </span>
        <div>{{ modifiedInfo }}</div>
        <div class="w-full p-4 flex flex-col gap-4">
            <div class="w-full flex flex-col">
                <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">Name</span>
                <input
                    v-model="modifiedInfo.name"
                    class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                >
            </div>
            <div class="w-full flex flex-col">
                <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">Email</span>
                <input 
                    class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                >
            </div>
            <div class="w-full flex flex-col">
                <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">City</span>
                <input 
                    v-model="modifiedInfo.city"
                    class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                >
            </div>
            <div class="w-full flex flex-col">
                <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">District</span>
                <input 
                    v-model="modifiedInfo.district"
                    class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                >
            </div>
        </div>
    </div>
</template>

<style scoped>

    .modal-animation {
        animation: scale 0.5s;
    }

    @keyframes scale {
        from {
            opacity: 0;
            transform: translateY(-2rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    textarea:focus, input:focus{
        outline: none;
    }
</style>