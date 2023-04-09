<script setup>
import ChangePasswordInput from './ChangePasswordInput.vue';
import { useAccountStore } from '../../stores/AccountStore'
import { ref, watch } from 'vue';

const emits = defineEmits(['closeModal'])

const accountStore = useAccountStore()
const password = ref({
    curPass: '',
    newPass: '',
    newPassConfirmation: '',
});

const confirmChange = async() => {
    if(password.value.newPass !== password.value.newPassConfirmation) {
        document.getElementById('error').innerHTML = '<i class="fa-solid fa-xmark"></i> Wrong new password confirmation'
    } else {
        document.getElementById('error').innerHTML = null

        const res = await fetch("http://localhost:1111/change-password", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
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
        const resData = JSON.parse(await res.text())
        console.log(`password management message: ${JSON.stringify(resData)}`);
    }
};

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

const closeModal = () => {
    emits('closeModal')
};
</script>

<template>
    <div class="bg-[#1d1d1d]/40 top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation"></div>
    <!-- <div class="bg-transparent fixed top-[16vh] left-[33.3333333%] w-1/3 z-50 flex items-end justify-end">
        <i class="fa-solid fa-circle-xmark text-[#cc3d2a]"></i>
    </div> -->
    <div class="bg-white rounded-lg p-4 fixed top-[20vh] left-[33.3333333%] w-1/3 z-50 flex flex-col modal-animation overflow-hidden">
        <div class="w-full flex items-center justify-end">
            <i @click="closeModal" class="fa-solid fa-circle-xmark text-[#cc3d2a] cursor-pointer text-opacity-75 active:text-opacity-90"></i>
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
            <div class="font-bold text-[12px]" :class="lengthTextColor">
                {{ passLengthType }}
                <i v-if="passLengthType === 'Weak'" class="fa-solid fa-face-tired"></i>
                <i v-else-if="passLengthType === 'Medium'" class="fa-solid fa-face-rolling-eyes"></i>
                <i v-else class="fa-solid fa-face-laugh-squint"></i>
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
</style>