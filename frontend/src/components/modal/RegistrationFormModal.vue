<script setup>
import RegistrationCarAndOwner from './RegistrationCarAndOwner.vue';
import RegistrationCert from './RegistrationCert.vue';
import { ref } from 'vue';

const props = defineProps(['license'])
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
    const res = await fetch(`http://localhost:1111/vehicles/modal`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
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
    loadingSubmit.value = true
    const res = await fetch(`http://localhost:1111/new-regist`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            licenseId: props.license,
            registDate: registrationInfo.value.registDate,
            expireDate: registrationInfo.value.expireDate,
        }),
    })
    if(res.error) {
        console.log(res.error);
    }
    console.log(res.status);
    loadingSubmit.value = false
};

</script>

<!-- <script>
export default {
    created() {
        console.log('registration form opened');
    }
}
</script> -->

<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation" @click="exitModal"></div>
    <div class="bg-[#f5f7fb] rounded-[8px] p-4 fixed top-[3vh] left-[10%] w-4/5 z-50 flex modal-animation overflow-hidden">
        <div v-if="!loading" class="flex flex-col gap-2 w-full">
            <div class="w-full flex gap-2 h-[450px]">
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