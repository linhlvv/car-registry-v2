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
};

watch(submitLoadingTime, () => {
    if(submitLoadingTime.value === 0) {
        loading.value = false
        clearInterval(submitLoadingInterval)
        submitLoadingTime.value = time
    }
});

</script>

<template>
    <div @click="exit" class="bg-black/40 top-0 left-0 w-full h-full blur-xl fixed z-10"></div>
    <div class="bg-white flex-col rounded-lg fixed top-[17vh] left-[20%] max-[560px]:left-[10%] w-3/5 max-[560px]:w-4/5 z-50 flex modal-animation overflow-hidden max-[560px]:flex-col max-[560px]:absolute">
        <div>
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
                        v-model="modifiedInfo.name"
                        class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
                    >
                </div>
                <div class="w-full flex flex-col">
                    <span class="font-bold text-[12px] text-[#1d1d1d] text-opacity-80">Email</span>
                    <input 
                        v-model="modifiedInfo.email"
                        class="w-full px-2 py-[2px] border-b border-solid border-[#1d1d1d] text-[14px] font-medium text-[#1d1d1d]"
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
                <button class="bg-[#2acc97]/80 ease-in-out duration-200 hover:bg-[#2acc97] flex items-center gap-1 text-white px-3 py-2 rounded-lg text-base font-semibold">
                    <span>Submit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                </button>
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
</style>