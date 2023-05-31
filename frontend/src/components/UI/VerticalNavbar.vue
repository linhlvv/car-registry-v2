<script setup>
import { ref } from 'vue';
import VerticalNavbarButton from './VerticalNavbarButton.vue';
import ChangePasswordModal from '../modal/ChangePasswordModal.vue';
const emit = defineEmits(['turnOffNav', 'openChangePasswordModal']);
const props = defineProps(['navOn'])


const turnOffNavHandler = () => {
    emit('turnOffNav')
};

const id = ref(localStorage.getItem("id"))
const isAdmin = ref(localStorage.getItem("userType") === '1')

const openModal = () => {
    emit('openChangePasswordModal')
    turnOffNavHandler()
};
</script>

<template>
    <div :class="navOn === false ? 'hidden' : 'w-full h-full top-0 flex justify-end absolute z-30'">
        <div class="w-full h-full bg-[#2acc97] rounded-l-2xl absolute pt-14 p-3 pr-4 flex flex-col gap-2">
            <div class="px-2">
                <svg @click="turnOffNavHandler" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6 text-white transition-transform duration-500 ease-in-out hover:rotate-180 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
            </div>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-user" content="Profile" :link="`/center/${id}`">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-98.5-79.8-178.3-178.3-178.3h-91.4z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <VerticalNavbarButton @click="turnOffNavHandler" v-if="isAdmin" icon="fa-sharp fa-solid fa-database" content="Manage database" link="/manage-database">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <VerticalNavbarButton @click="turnOffNavHandler" v-if="isAdmin" icon="fa-sharp fa-solid fa-users" content="Account management" link="/account-management">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 640 512">
                        <path fill="currentColor" d="M144 0a80 80 0 1 1 0 160a80 80 0 1 1 0-160zm368 0a80 80 0 1 1 0 160a80 80 0 1 1 0-160zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0a96 96 0 1 1-192 0zm-96 261.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <VerticalNavbarButton @click="turnOffNavHandler" v-if="!isAdmin" icon="fa-solid fa-circle-plus" content="Regist" link="/regist-new-car">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zm-24-168v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-car" content="Cars" link="/cars">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M135.2 117.4L109.1 192h293.8l-26.1-74.6c-4.5-12.8-16.6-21.4-30.2-21.4H165.4c-13.6 0-25.7 8.6-30.2 21.4zm-95.6 79.4L74.8 96.3C88.3 57.8 124.6 32 165.4 32h181.2c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2v192c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-48H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0-64 0a32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64a32 32 0 1 0 0 64z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-chart-simple" content="Statistics" link="/statistics">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48h-32c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48v160c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48h-32c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c19.8 27.1 39.7 54.4 49.2 86.2h160zm-80 128c44.2 0 80-35.8 80-80v-16H112v16c0 44.2 35.8 80 80 80zm-80-336c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
            <div @click="openModal" class="w-full p-3 gap-4 rounded-md flex items-center text-white text-sm font-semibold hover:bg-white/50 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zm40-256a40 40 0 1 1 0 80a40 40 0 1 1 0-80z"/>
                </svg>
                <p>Change password</p>
            </div>
            <VerticalNavbarButton @click="turnOffNavHandler" icon="fa-solid fa-lightbulb" content="Logout" link="/log-and-reg/login">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="currentColor" d="m377.9 105.9l122.8 122.8c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9V320H192c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128c0-53 43-96 96-96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                    </svg>
                </template>
            </VerticalNavbarButton>
        </div>
    </div>
</template>

<style scoped>
    
</style>

