<script setup>
import CertInfoModalCard from './CertInfoModalCard.vue';
import { useAccountStore } from '../../stores/AccountStore';
import { onMounted, ref } from 'vue';

const accountStore = useAccountStore()

const props = defineProps(['certId']);
const emit = defineEmits(['exitModal'])

//SECTION - data fetch
const loading = ref(false)
const certContent = ref({})
const fetchCertData = async () => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/regist/detail`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({id: props.certId}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`cert: ${JSON.stringify(dataFetched)}`);
    certContent.value = {...dataFetched.data[0]}
    loading.value = false
}

//SECTION - modal handler
const exitModal = () => {
    emit('exitModal')
};

onMounted(() => {
    fetchCertData()
});

</script>

<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation" @click="exitModal"></div>
    <div class="fade bg-[#f5f7fb] rounded-[8px] p-4 fixed top-[10vh] left-[20%] w-3/5 z-50 flex flex-col gap-2 modal-animation overflow-hidden h-fit">
        <div class="w-full flex justify-end">
            <svg @click="exitModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-[#cc5b2a] p-1 rounded-[50%] cursor-pointer duration-150 ease-in-out hover:bg-[#cc5b2a]/10 active:bg-[#cc5b2a]/20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <div class="w-full flex items-center">
            <p class="w-1/2 text-center font-semibold text-2xl text-[#1d1d1d]">29-F1 615.89</p>
            <div class="w-1/2 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-24 h-24 text-[#2acc97]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-lg font-semibold">Vũ Minh Tuấn</p>
            </div>
        </div>
        <CertInfoModalCard title="Cert ID" :content="certContent.id"/>
        <CertInfoModalCard title="Regist date" :content="certContent.date"/>
        <CertInfoModalCard title="Expired date" :content="certContent.expire"/>
        <CertInfoModalCard title="Center" :content="certContent.name"/>
    </div>
</template>

<style scoped>

.fade {
    animation: fade 0.5s ease-in-out;
}

@keyframes fade {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>