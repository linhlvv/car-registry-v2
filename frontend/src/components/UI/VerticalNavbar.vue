<script setup>
import { ref } from 'vue';
import VerticalNavbarButton from './VerticalNavbarButton.vue';
const emit = defineEmits(['turnOffNav']);
const props = defineProps(['navOn'])


const turnOffNavHandler = () => {
    emit('turnOffNav')
};

const id = ref(localStorage.getItem("id"))
const isAdmin = ref(localStorage.getItem("userType") === '1')
</script>

<template>
    <div :class="navOn === false ? 'hidden' : 'w-full h-full top-0 flex justify-end absolute z-30'">
        <div class="w-full h-full bg-[#2acc97] rounded-l-2xl absolute pt-14 p-3 pr-4 flex flex-col gap-2">
            <div class="px-2">
                <svg @click="turnOffNavHandler" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6 text-white transition-transform duration-500 ease-in-out hover:rotate-180 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
            </div>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-user" content="Profile" :link="`/center/${id}`"/>
            <VerticalNavbarButton @click="turnOffNavHandler" v-if="isAdmin" icon="fa-sharp fa-solid fa-database" content="Manage database" link="/manage-database"/>
            <VerticalNavbarButton @click="turnOffNavHandler" v-if="isAdmin" icon="fa-sharp fa-solid fa-users" content="Account management" link="/account-management"/>
            <VerticalNavbarButton @click="turnOffNavHandler" v-if="!isAdmin" icon="fa-solid fa-circle-plus" content="Regist" link="/regist-new-car"/>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-car" content="Cars" link="/cars"/>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-chart-simple" content="Statistics" link="/statistics"/>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
        </div>
    </div>
</template>

<style scoped>
    
</style>

