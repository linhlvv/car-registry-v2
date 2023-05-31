<script setup>
import { ref } from 'vue';
import { useAccountStore } from "../../stores/AccountStore";
import ChangePasswordModal from '../modal/ChangePasswordModal.vue';

const accountStore = useAccountStore();

const isAdmin = ref(localStorage.getItem('userType') == 1)
const id = ref(localStorage.getItem('id'))

const dropdownHidden = ref(true);
const dropdownHandler = () => {
    dropdownHidden.value = !dropdownHidden.value
};

const passwordManagementModalIsOn = ref(false);
const passwordManagementModalHandler = () => {
    if(passwordManagementModalIsOn.value === true) {
        passwordManagementModalIsOn.value = false
    } else {
        passwordManagementModalIsOn.value = true
    }
};

</script>

<template>
    <div class="relative w-full">
        <svg @click="dropdownHandler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-white cursor-pointer max-[732px]:hidden">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
        </svg>
        <div v-if="passwordManagementModalIsOn" class="w-full">
            <ChangePasswordModal @close-modal="passwordManagementModalHandler" />
        </div>
        <Transition name="bounce">
            <div v-if="!dropdownHidden" id="dropdown" class="bg-white divide-y z-50 divide-gray-100 rounded-lg shadow w-44 absolute right-2">
                <div class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                    <div @click="dropdownHandler"> 
                        <router-link :to="`/center/${id}`" class="flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#2acc97]" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-98.5-79.8-178.3-178.3-178.3h-91.4z"/>
                            </svg>
                            Profile
                        </router-link>
                    </div>
                    <div @click="dropdownHandler">
                        <div @click="passwordManagementModalHandler" class="cursor-pointer flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#2acc97]" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zm40-256a40 40 0 1 1 0 80a40 40 0 1 1 0-80z"/>
                            </svg>
                            Password management
                        </div>
                    </div>
                    <div @click="dropdownHandler">
                        <router-link to="/log-and-reg/login" class="flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#2acc97]" viewBox="0 0 512 512">
                                <path fill="currentColor" d="m377.9 105.9l122.8 122.8c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9V320H192c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128c0-53 43-96 96-96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                            </svg>
                            Sign out
                        </router-link>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        cursor: pointer;
        border-radius: 50%;
    }

    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }
    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }
</style>