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
    console.log(passwordManagementModalIsOn.value);
};

</script>

<template>
    <div class="relative w-full">
        <img :src="avatar" alt="" @click="dropdownHandler"/>
        <div v-if="passwordManagementModalIsOn" class="w-full">
            <ChangePasswordModal @close-modal="passwordManagementModalHandler" />
        </div>
        <Transition name="bounce">
            <div v-if="!dropdownHidden" id="dropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-2">
                <div class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <div @click="dropdownHandler"> 
                        <router-link :to="`/center/${accountStore.ID}`" class="flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <i class="fa-sharp fa-solid fa-user"></i>
                            Profile
                        </router-link>
                    </div>
                    <div @click="dropdownHandler">
                        <router-link to="/logAndReg/login" class="flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
                            Sign out
                        </router-link>
                    </div>
                    <div @click="dropdownHandler">
                        <div @click="passwordManagementModalHandler" class="cursor-pointer flex gap-2 items-center px-4 py-2 text-[#1d1d1d] font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <i class="fa-solid fa-key"></i>
                            Password management
                        </div>
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