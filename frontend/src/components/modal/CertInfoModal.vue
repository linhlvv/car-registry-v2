<script setup>
import CertInfoModalCard from './CertInfoModalCard.vue';

const props = defineProps(['cert']);
const emit = defineEmits(['exitModal'])

const exitModal = () => {
    emit('exitModal')
};

</script>

<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation" @click="exitModal"></div>
    <div class="bg-[#f5f7fb] rounded-[8px] p-4 fixed top-[3vh] left-[20%] w-3/5 z-50 flex flex-col gap-2 modal-animation overflow-hidden h-fit">
        <div class="w-full flex items-center">
            <p class="w-2/5 text-center font-semibold text-2xl text-[#1d1d1d]">29-F1 615.89</p>
            <div class="w-3/5 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-24 h-24 text-[#2acc97]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-lg font-semibold">Vũ Minh Tuấn</p>
            </div>
        </div>
        <CertInfoModalCard title="Cert ID" content="8519"/>
        <CertInfoModalCard title="Regist date" content="8519"/>
        <CertInfoModalCard title="Expired date" content="8519"/>
        <CertInfoModalCard title="Center" content="8519"/>
    </div>
</template>