<script setup>
import { onMounted, ref } from 'vue';
import { useAccountStore } from '../../stores/AccountStore';

const accountStore = useAccountStore()

const props = defineProps(['car', 'carTypeSelection', 'loading']);

const emit = defineEmits(['openInfo', 'regist']);
const openInfo = () => {
    emit('openInfo', props.car.license)
};
const regist = () => {
    emit('regist', props.car.license)
};

const isAdmin = ref(false)
onMounted(() => {
    isAdmin.value = localStorage.getItem('userType') == 1
});

</script>

<template>
    <div class="bg-white p-2 flex overflow-hidden items-center min-w-[800px] w-full mt-[2px] min-h-[50px] relative group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-[#2acc97] absolute transition-transform duration-200 -translate-x-7 group-hover:-translate-x-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <div class="font-semibold text-[#616367] text-[11px] flex justify-center items-center w-[14%]">
            {{ car.license }}
        </div>
        <div class="font-semibold text-[#616367] text-[11px] flex items-center w-[22%]">
            {{ car.brand }} {{ car.model }} {{ car.version }}
        </div>

        <div v-if="carTypeSelection === 'registed'" class="w-[26%] flex items-center">
            <div class="font-semibold text-[#616367] text-[11px] flex justify-center items-center w-1/2">
                {{ car.registryDate }}
            </div>
            <div class="font-semibold text-[#616367] text-[11px] flex justify-center items-center w-1/2">
                {{ car.expire }}
            </div>
        </div>
        <div v-else-if="carTypeSelection === 'expired'" class="font-bold text-[11px] flex justify-center items-center w-[26%]">
            <div class="font-semibold text-[#616367] text-[11px] flex justify-center items-center w-1/2">
                {{ car.duration }}
            </div>
            <div class="font-semibold text-[#616367] text-[11px] flex justify-center items-center w-1/2">
                {{ car.expire }}
            </div>
        </div>
        <div v-else class="font-bold text-[11px] flex justify-center items-center w-[26%]">
            <div class="font-semibold text-red-500 text-[11px] flex justify-center items-center w-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="font-semibold text-red-500 text-[11px] flex justify-center items-center w-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>

        <div class="font-semibold text-[#616367] text-[11px] flex text-right justify-end items-center w-[17%]">
            {{ car.name }}
        </div>
        <div class="flex items-center w-[21%] justify-evenly">
            <div class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white" @click="openInfo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <div class="font-semibold">Detail</div>
            </div>
            <div v-if="!isAdmin" class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white" @click="regist">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-registered w-4 h-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M10 15v-6h2a2 2 0 1 1 0 4h-2"></path>
                    <path d="M14 15l-2 -2"></path>
                </svg>
                <div class="font-semibold">Regist</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>