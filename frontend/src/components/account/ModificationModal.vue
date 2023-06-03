<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['info']);
const emit = defineEmits(['exit']);

const exit = () => {
    emit('exit')
};

const modifiedInfo = ref({...props.info, password: null});

const changePassword = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    modifiedInfo.value.password = result
};

const time = 3
const submitLoadingTime = ref(time)
const loading = ref(false)
let submitLoadingInterval

const triggerLoadingInterval = () => {
    loading.value = true
    submitLoadingInterval = setInterval(() => {
        submitLoadingTime.value -= 1
    }, 1000);
}

const submitUpdateInfo = async () => {
    const res = await fetch(`http://localhost:1111/update-centre-info`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            centreId: props.info.id,
            city: modifiedInfo.value.city,
            district: modifiedInfo.value.district,
            password: modifiedInfo.value.password ?? undefined
        })
    })
    if(res.error) {
        console.log(res.error);
    }
    if(res.status === 200) {
        triggerLoadingInterval()
    }
};

watch(submitLoadingTime, () => {
    if(submitLoadingTime.value === 0) {
        loading.value = false
        clearInterval(submitLoadingInterval)
        submitLoadingTime.value = time
        location.reload()
    }
});

</script>

<template>
    <div class="flex w-full h-screen fixed top-0 justify-center items-center z-50">
        <div @click="exit" class="bg-black/40 top-0 left-0 w-full h-full blur-xl fixed z-10"></div>
        <div class="bg-white flex-col rounded-lg fixed w-3/5 max-[560px]:w-full z-50 flex modal-animation overflow-hidden max-[560px]:flex-col max-[560px]:absolute">
            <div v-if="!loading">
                <div class="w-full flex items-center justify-end p-2" @click="exit">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-[50%] text-[#cc5b2a] hover:text-[#ff5004]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p class="w-full p-4 text-center text-xl font-semibold text-[#3c3c3c]">
                    Account Modification
                </p>
                <div class="w-full p-4 flex flex-col gap-4">
                    <div class="w-full flex flex-col">
                        <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">Name</span>
                        <input
                            disabled
                            v-model="modifiedInfo.name"
                            class="w-full px-2 py-[2px] border-b border-solid cursor-not-allowed border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                        >
                    </div>
                    <div class="w-full flex flex-col">
                        <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">Email</span>
                        <input 
                            disabled
                            v-model="modifiedInfo.email"
                            class="w-full px-2 py-[2px] border-b border-solid cursor-not-allowed border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                        >
                    </div>
                    <div class="w-full flex flex-col">
                        <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">City</span>
                        <input 
                            v-model="modifiedInfo.city"
                            class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                        >
                    </div>
                    <div class="w-full flex flex-col">
                        <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">District</span>
                        <input 
                            v-model="modifiedInfo.district"
                            class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                        >
                    </div>
                </div>
                <div class="w-full items-center gap-3 flex px-4 pb-2">
                    <button @click="changePassword(7)" class="bg-[#93a3e6]/90 ease-in-out duration-200 hover:bg-[#93a3e6] flex items-center gap-1 text-white px-3 py-2 rounded-lg text-base font-semibold">
                        <span>Change password</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                    </button>
                    <Transition name="fade">
                        <span v-if="modifiedInfo.password !== null" class="text-[#1d1d1d] text-base font-semibold">{{ modifiedInfo.password }}</span>
                    </Transition>
                </div>
                <div class="w-full flex justify-end px-4 pb-2">
                    <button @click="submitUpdateInfo" class="bg-[#2acc97]/80 ease-in-out duration-200 hover:bg-[#2acc97] flex items-center gap-1 text-white px-3 py-2 rounded-lg text-base font-semibold">
                        <span>Submit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                    </button>
                </div>
            </div>
            <div v-else class="w-full flex flex-col gap-2 justify-center items-center h-[450px]">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                <p class="text-lg font-semibold text-[#1d1d1d]">Modify account information successfully</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .modal-animation {
        animation: scale 0.5s;
    }

    @keyframes scale {
        from {
            opacity: 0;
            transform: translateY(-2rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    textarea:focus, input:focus{
        outline: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
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