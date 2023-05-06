<script setup>
import RegistrationCarAndOwner from './RegistrationCarAndOwner.vue';
import RegistrationCert from './RegistrationCert.vue';
import { useAccountStore } from '../../stores/AccountStore';
import { useRegistrationCertStore } from '../../stores/RegistrationCertStore'
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore();
const registrationCertStore = useRegistrationCertStore()
const router = useRouter()
const props = defineProps(['license']);
const emit = defineEmits(['exitModal']);
const exitModal = () => {
    emit('exitModal');
};

const loading = ref(false)
const carDetailedInfo = ref({});
const ownerType = ref()
const registryCert = ref({info: {}, valid: true})

//SECTION - fetch car info and owner info
const findCarInfo = async() => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/preview-info`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({licenseId: props.license}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    // console.log(`car info: ${JSON.stringify(dataFetched.data[0])}`);
    carDetailedInfo.value = dataFetched.data[0]
    // console.log(dataFetched.ownerType);
    ownerType.value = dataFetched.ownerType
    registryCert.value.info = dataFetched.data2
    registryCert.value.valid = dataFetched.valid
    console.log(`info: ${JSON.stringify(carDetailedInfo.value)}`);
    loading.value = false
};

//SECTION - fetch registration info based on modify date
const registrationInfo = ref({})
const fetchRegistrationInfo = async () => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/preview-regist`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({licenseId: props.license}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car info: ${JSON.stringify(dataFetched)}`);
    registrationInfo.value = dataFetched
    // console.log(dataFetched.ownerType);
    console.log(`info: ${JSON.stringify(registrationInfo.value)}`);
    loading.value = false
}

findCarInfo();
fetchRegistrationInfo()

//SECTION - submit form
const loadingSubmit = ref(false)
const submitFormHandler = async () => {
    
    const res = await fetch(`http://localhost:1111/new-regist`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({
            id: registrationInfo.value.id,
            licenseId: props.license,
            registDate: registrationInfo.value.registDate,
            expireDate: registrationInfo.value.expireDate,
        }),
    })
    if(res.error) {
        console.log(res.error);
    }
    console.log(res.status);
    if(res.status === 200) {
        triggerInterval()
    }
};

const docs = ref(null)

const second = ref(0)
let loadingInterval;

// logic - interval handler
const triggerInterval = () => {
    loadingSubmit.value = true;
    second.value = 0
    loadingInterval = setInterval(() => {
        second.value += 1
    }, 1000);
};

// logic - second watcher
watch(second, (newSec, oldSec) => {
    if(newSec === 3) {
        second.value = 0
        loadingSubmit.value = false
        const param = props.license.replace('.', '=')
        let route = router.resolve({ path: `/print-pdf/${param}` }) 
        window.open(route.href)
        window.location.reload()
        clearInterval(loadingInterval)
    }
});

</script>

<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation" @click="exitModal"></div>
    <div class="bg-[#f5f7fb] rounded-[8px] p-4 fixed top-[3vh] left-[10%] w-4/5 z-50 flex modal-animation overflow-hidden h-fit">
        <div v-if="!loadingSubmit" class="flex flex-col gap-2 w-full">
            <div ref="docs" class="w-full flex gap-2 h-[450px]">
                <RegistrationCarAndOwner :owner-type="ownerType" :info="carDetailedInfo" :regist-new-car="false"/>
                <RegistrationCert :registry-info="registrationInfo"/>
            </div>
            <div class="w-full flex gap-4 justify-end">
                <button @click="exitModal" class="bg-transparent hover:bg-[#2acc97]/10 active:bg-[#2acc97]/30 border border-solid border-[#2acc97] text-[#2acc97] font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Cancel
                </button>
                <button @click="submitFormHandler" class="bg-[#2acc97]/70 hover:bg-[#2acc97]/90 active:bg-[#2acc97] text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Regist
                </button>
            </div>
        </div>
        <div v-else class="w-full flex gap-4 flex-col items-center justify-center bg-white h-[450px]">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            <span class="w-full text-center text-[#1d1d1d] text-xl font-semibold">
                Regist successfully
            </span>
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