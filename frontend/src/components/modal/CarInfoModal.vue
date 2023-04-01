<script setup>
import CarInformationBlock from './CarInformationBlock.vue'
import CarRegistryInformationBlock from './CarRegistryInformationBlock.vue';
import OwnerBrief from './OwnerBrief.vue';

const props = defineProps(['licenseId']);
const emit = defineEmits(['exitModal']);
const exitModal = () => {
    emit('exitModal');
};

const carDetailedInfo = [];

</script>

<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation" @click="exitModal"></div>
    <div class="bg-white rounded-[8px] fixed top-[5vh] left-[20%] w-3/5 z-50 flex modal-animation overflow-hidden">
        <div class="w-3/5 border-r text-[#1d1d1d] mb-3">
            <div class="flex flex-col items-center w-full">
                <div class="text-3xl font-semibold py-5 hover:underline">{{ licenseId }}</div>
                <CarRegistryInformationBlock 
                    registry-code="810" 
                    registry-date="23/2/2020" 
                    expired-date="23/2/2022" 
                    center-name="Trung tam dang kiem HP"
                />
                <div class="flex w-full justify-evenly flex-wrap gap-y-4">
                    <CarInformationBlock description="Registration code" icon="fa-solid fa-hashtag" detail="2812"/>
                    <CarInformationBlock description="Registration date" icon="fa-solid fa-calendar-check" detail="08/10/2003"/>
                    <CarInformationBlock description="Registration city" icon="fa-solid fa-city" detail="Ho Chi Minh"/>
                    <CarInformationBlock description="Car model" icon="fa-solid fa-car" detail="Lamborghini Aventador"/>
                    <CarInformationBlock description="Manufacture date" icon="fa-solid fa-calendar-days" detail="28/12/2003"/>
                    <CarInformationBlock description="Purpose" icon="fa-solid fa-gears" detail="Personal"/>
                </div>
            </div>
        </div>
        <div class="w-2/5 bg-[#2acc97] text-white">
            <div class="h-[5%] flex items-start justify-end p-1">
                <i class="fa-sharp fa-solid fa-circle-xmark cursor-pointer active:text-[#cc2a5f]" @click="exitModal"></i>
            </div>
            <OwnerBrief />
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
</style>