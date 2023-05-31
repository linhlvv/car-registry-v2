<script setup>
import ChangePasswordInput from './ChangePasswordInput.vue';
import { useAccountStore } from '../../stores/AccountStore'
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const emits = defineEmits(['closeModal'])

const accountStore = useAccountStore()
const router = useRouter()
const password = ref({
    curPass: '',
    newPass: '',
    newPassConfirmation: '',
});

//SECTION - change password
let loadingInterval;
const second = ref(0)
const posted = ref(false)
const loadingOn = ref(false)

// logic - put to be
const confirmChange = async() => {
    if(password.value.newPass !== password.value.newPassConfirmation) {
        document.getElementById('error').innerHTML = '<i class="fa-solid fa-xmark"></i> Wrong new password confirmation'
    } else {
        document.getElementById('error').innerHTML = null
        loadingOn.value = true
        const res = await fetch("http://localhost:1111/change-password", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accountStore.getToken}`
            },
            body: JSON.stringify(
                {
                    id: accountStore.ID,
                    password: password.value.curPass,
                    newPass: password.value.newPass,
                    reNewPass: password.value.newPassConfirmation
                }
            )
        })
        if(res.error) {
            console.log(res.error);
        }
        loadingOn.value = false
        const resData = JSON.parse(await res.text())
        console.log(`password management message: ${JSON.stringify(resData)}`);
        if(resData.message === 'Password changed') {
            posted.value = true
            trigger()
        } else {
            document.getElementById('error').innerHTML = resData.message
        }
    }
};

// logic - trigger interval
const trigger = () => {
    second.value = 0
    loadingInterval = setInterval(() => {
        second.value += 1
    }, 1000);
};

// logic - second watcher
watch(second, (newSec, oldSec) => {
    if(newSec === 3) {
        second.value = 0
        router.push('/log-and-reg/login')
        posted.value = false
        clearInterval(loadingInterval)
    }
});

//SECTION - password length checker
const passLengthType = ref('')
const lengthLineColor = ref('bg-[#fa7763]')
const lengthTextColor = ref('text-[#fa7763]')
const lengthLineWidth = ref('w-[0px]')
watch(() => password.value.newPass, (newPassword, oldPassword) => {
    if(1 <= newPassword.length && newPassword.length <= 6) {
        passLengthType.value = 'Weak'
        lengthLineColor.value = 'bg-[#fa7763]'
        lengthTextColor.value = 'text-[#fa7763]'
        lengthLineWidth.value = 'w-1/3'
    } else if(7 <= newPassword.length && newPassword.length <= 14) {
        passLengthType.value = 'Medium'
        lengthLineColor.value = 'bg-[#93a3e6]'
        lengthTextColor.value = 'text-[#93a3e6]'
        lengthLineWidth.value = 'w-2/3'
    } else if(newPassword.length > 14) {
        passLengthType.value = 'Strong'
        lengthLineColor.value = 'bg-[#2acc97]'
        lengthTextColor.value = 'text-[#2acc97]'
        lengthLineWidth.value = 'w-full'
    }
    if(newPassword.length === 0) {
        passLengthType.value = ''
    }
})

//SECTION - modal handler
const closeModal = () => {
    emits('closeModal')
};
</script>

<template>
    <div class="bg-[#1d1d1d]/40 top-0 left-0 w-full h-screen blur-xl fixed z-50 backdrop-animation"></div>
    <div class="bg-white rounded-lg p-4 fixed top-[20vh] left-1/3 max-lg:left-[17%] max-sm:left-0 w-1/3 max-lg:w-2/3 max-sm:w-full z-50 flex modal-animation overflow-hidden">
        <div v-if="!posted" class="w-full flex flex-col">
            <div class="w-full flex items-center justify-end">
                <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#cc3d2a] cursor-pointer text-opacity-75 active:text-opacity-90" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zm-81-337c9.4-9.4 24.6-9.4 33.9 0l47 47l47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47l47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47l-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47l-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                </svg>
            </div>
            <div class="pb-2 text-xl font-semibold text-[#2acc97] flex justify-center text-center items-center">
                Manage password
            </div>
            <hr class="border mb-2">
            <div class="flex flex-col gap-4 mb-3">
                <ChangePasswordInput content="Current password" v-model="password.curPass"/>
                <ChangePasswordInput content="New password" v-model="password.newPass"/>
                <ChangePasswordInput content="Confirm new password" v-model="password.newPassConfirmation"/>
            </div>
            <div v-if="passLengthType !== ''" class="w-full flex flex-col mb-3">
                <div class="font-bold text-[12px] flex items-center space-x-1 mb-1" :class="lengthTextColor">
                    <p>{{ passLengthType }}</p>
                    <!-- <i v-if="passLengthType === 'Weak'" class="fa-solid fa-face-tired"></i>
                    <i v-else-if="passLengthType === 'Medium'" class="fa-solid fa-face-rolling-eyes"></i>
                    <i v-else class="fa-solid fa-face-laugh-squint"></i> -->
                    <svg v-if="passLengthType === 'Weak'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zm-91.3-183.3c22-22 53.9-40.7 91.3-40.7s69.3 18.7 91.3 40.7c11.1 11.1 20.1 23.4 26.4 35.4c6.2 11.7 10.3 24.4 10.3 35.9c0 5.2-2.6 10.2-6.9 13.2s-9.8 3.7-14.7 1.8l-20.5-7.7C315 397.2 286.4 392 257.6 392h-3.2c-28.8 0-57.3 5.2-84.3 15.3l-20.5 7.7c-4.9 1.8-10.4 1.2-14.7-1.8s-6.9-7.9-6.9-13.2c0-11.6 4.2-24.2 10.3-35.9c6.3-12 15.3-24.3 26.4-35.4zm-31.2-182l89.9 47.9c10.7 5.7 10.7 21.1 0 26.8l-89.9 47.9c-7.9 4.2-17.5-1.5-17.5-10.5c0-2.8 1-5.5 2.8-7.6l36-43.2l-36-43.2c-1.8-2.1-2.8-4.8-2.8-7.6c0-9 9.6-14.7 17.5-10.5zM396 157.1c0 2.8-1 5.5-2.8 7.6l-36 43.2l36 43.2c1.8 2.1 2.8 4.8 2.8 7.6c0 9-9.6 14.7-17.5 10.5l-89.9-47.9c-10.7-5.7-10.7-21.1 0-26.8l89.9-47.9c7.9-4.2 17.5 1.5 17.5 10.5z"/>
                    </svg>
                    <svg v-else-if="passLengthType === 'Medium'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zm-64-144h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H192c-8.8 0-16-7.2-16-16s7.2-16 16-16zm32-144c0 35.3-28.7 64-64 64s-64-28.7-64-64c0-26 15.5-48.4 37.8-58.4c-3.7 5.2-5.8 11.6-5.8 18.4c0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.9-2.2-13.2-5.8-18.4c22.3 10 37.8 32.4 37.8 58.4zm128 64c-35.3 0-64-28.7-64-64c0-26 15.5-48.4 37.8-58.4c-3.7 5.2-5.8 11.6-5.8 18.4c0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.9-2.2-13.2-5.8-18.4c22.3 10 37.8 32.4 37.8 58.4c0 35.3-28.7 64-64 64z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1h275.2c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432S115.8 382 96.8 314.1zm36.7-199.4l89.9 47.9c10.7 5.7 10.7 21.1 0 26.8l-89.9 47.9c-7.9 4.2-17.5-1.5-17.5-10.5c0-2.8 1-5.5 2.8-7.6l36-43.2l-36-43.2c-1.8-2.1-2.8-4.8-2.8-7.6c0-9 9.6-14.7 17.5-10.5zM396 125.1c0 2.8-1 5.5-2.8 7.6l-36 43.2l36 43.2c1.8 2.1 2.8 4.8 2.8 7.6c0 9-9.6 14.7-17.5 10.5l-89.9-47.9c-10.7-5.7-10.7-21.1 0-26.8l89.9-47.9c7.9-4.2 17.5 1.5 17.5 10.5z"/>
                    </svg>
                </div>
                <div class="w-full h-[3px]">
                    <div
                        class="h-full duration-1000"
                        :class="lengthLineColor, lengthLineWidth"
                    />
                </div>
            </div>
            <div class="w-full mb-3">
                <span id="error" class="text-[13px] font-medium text-[#f5604c] flex items-center gap-1"></span>
            </div>
            <button @click="confirmChange" class="w-full py-[10px] bg-[#2acc97]/60 text-white font-bold text-base rounded-lg duration-150 hover:bg-[#2acc97]/80 active:bg-[#2acc97]/95">
                Confirm
            </button>
        </div>
        <div v-else class="flex flex-col items-center gap-5 w-full justify-center h-[300px]">
            <button type="button" class=" py-4 rounded-md flex items-center justify-center text-xl font-semibold w-full" disabled>
                <div v-if="loadingOn">
                    <svg class="animate-spin h-36 w-36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4335 4335" version="1.1">
                        <path fill="#2acc97" d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                    </svg>
                </div>
                <div v-else class="text-black">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                </div>
            </button>
            <div class="text-base font-semibold text-[#1d1d1d] text-opacity-70">Change password successfully</div>
        </div>
    </div>
</template>

<style scoped>
    .modal-animation {
        animation: slide-down 0.5s;
    }

    @keyframes slide-down {
        from {
            opacity: 0;
            transform: translateY(-2rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .checkmark__circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #2acc97;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }

    .checkmark {
        width: 144px;
        height: 144px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: #2acc97;
        stroke-miterlimit: 10;
        animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    }

    .checkmark__check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    }

    @keyframes stroke {
        100% {
            stroke-dashoffset: 0;
        }
    }
    @keyframes scale {
        0%, 100% {
            transform: none;
        }
        50% {
            transform: scale3d(1.1, 1.1, 1);
        }
    }
    @keyframes fill {
        100% {
            box-shadow: inset 0px 0px 0px 30px white;
        }
    }
</style>