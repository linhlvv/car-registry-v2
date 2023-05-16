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
    <div :class="navOn === false ? 'hidden' : ''" class="w-full h-screen top-0 flex justify-end absolute z-30" @click="turnOffNavHandler">
        <div class="w-[250px] h-full bg-[#2acc97] rounded-l-2xl absolute pt-14 p-3 pr-4 flex flex-col gap-2">
            <VerticalNavbarButton icon="fa-solid fa-user" content="Profile" :link="`/center/${id}`"/>
            <VerticalNavbarButton v-if="isAdmin" icon="fa-sharp fa-solid fa-database" content="Manage database" link="/manage-database"/>
            <VerticalNavbarButton v-if="isAdmin" icon="fa-sharp fa-solid fa-users" content="Account management" link="/account-management"/>
            <VerticalNavbarButton v-if="!isAdmin" icon="fa-solid fa-circle-plus" content="Regist" link="/regist-new-car"/>
            <VerticalNavbarButton icon="fa-solid fa-car" content="Cars" link="/cars"/>
            <VerticalNavbarButton icon="fa-solid fa-chart-simple" content="Statistics" link="/statistics"/>
            <VerticalNavbarButton icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
        </div>
    </div>
</template>

<style scoped>
    
</style>

