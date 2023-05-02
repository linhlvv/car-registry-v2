<script setup>
import { ref } from 'vue';
import avatar from '../../assets/haphuong.png';
import { useAccountStore } from "../../stores/AccountStore";
import ChangePasswordModal from '../modal/ChangePasswordModal.vue';

const accountStore = useAccountStore();

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
        <svg @click="dropdownHandler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-white cursor-pointer">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
        </svg>
        <!-- <img :src="avatar" alt="" @click="dropdownHandler"/> -->
        <div v-if="passwordManagementModalIsOn" class="w-full">
            <ChangePasswordModal @close-modal="passwordManagementModalHandler" />
        </div>
        <Transition name="bounce">
            <div v-if="!dropdownHidden" id="dropdown" class="bg-white divide-y z-50 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-2">
                <div class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <div @click="dropdownHandler"> 
                        <router-link :to="`/center/${accountStore.ID}`" class="flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <i class="fa-sharp fa-solid fa-user text-[#2acc97]"></i>
                            Profile 
                        </router-link>
                    </div>
                    <div @click="dropdownHandler">
                        <div @click="passwordManagementModalHandler" class="cursor-pointer flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <i class="fa-solid fa-key text-[#2acc97]"></i>
                            Password management
                        </div>
                    </div>
                    <div @click="dropdownHandler">
                        <router-link to="/log-and-reg/login" class="flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <i class="fa-sharp fa-solid fa-right-from-bracket text-[#2acc97]"></i>
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