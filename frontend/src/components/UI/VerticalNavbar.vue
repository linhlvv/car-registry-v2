<script setup>
import VerticalNavbarButton from './VerticalNavbarButton.vue';
const emit = defineEmits(['turnOffNav']);
const props = defineProps(['navOn'])

const turnOffNavHandler = () => {
    emit('turnOffNav')
};
</script>

<template>
    <div :class="navOn === false ? 'hidden' : ''" class="w-full h-screen top-0 flex justify-end absolute z-30" @click="turnOffNavHandler">
        <div class="w-2/5 h-full bg-[#2acc97] rounded-l-2xl absolute pt-14 p-3 flex flex-col gap-2">
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
    
</style>

