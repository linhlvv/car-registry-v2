<script setup>
import VerticalNavbarButton from './VerticalNavbarButton.vue';
const emit = defineEmits(['turnOffNav']);

const turnOffNavHandler = () => {
    emit('turnOffNav')
};
</script>

<template>
    <div class="w-full h-full flex justify-end absolute z-50" @click="turnOffNavHandler">
        <div class="w-2/5 h-full bg-[#2acc97] absolute p-3 flex flex-col gap-2 slide">
            <VerticalNavbarButton icon="fa-solid fa-user" content="Profile" link="/center/8"/>
            <VerticalNavbarButton icon="fa-solid fa-car" content="Cars" link="/cars"/>
            <VerticalNavbarButton icon="fa-sharp fa-solid fa-car-on" content="Registed cars" link="/registedCars"/>
            <VerticalNavbarButton icon="fa-sharp fa-solid fa-car-burst" content="Expired cars" link="/expiredCars"/>
            <VerticalNavbarButton icon="fa-solid fa-car-tunnel" content="Not registed cars" link="/notRegistedCars"/>
            <VerticalNavbarButton icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
            
        </div>
    </div>
</template>

<style scoped>
    .slide {
        animation: slide 0.5s;
    }
    @keyframes slide {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

