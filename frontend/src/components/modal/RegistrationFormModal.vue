<script setup>
import RegistrationCarAndOwner from './RegistrationCarAndOwner.vue';
import RegistrationCert from './RegistrationCert.vue';
import { ref } from 'vue';

const props = defineProps(['license'])
const emit = defineEmits(['exitModal']);
const exitModal = () => {
    emit('exitModal');
};

const carDetailedInfo = ref({});
const ownerType = ref()
const registryCert = ref({info: {}, valid: true})
const findCarInfo = async() => {
    const res = await fetch(`http://localhost:1111/vehicles/find`, {
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
};
findCarInfo();

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
        <div class="flex flex-col gap-2 w-full">
            {{ license }}
            <div class="w-full flex gap-2 h-[450px]">
                <RegistrationCarAndOwner :owner-type="ownerType" :info="carDetailedInfo" :regist-new-car="false"/>
                <RegistrationCert />
            </div>
            <div class="w-full flex gap-4 justify-end">
                <button @click="exitModal" class="bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Cancel
                </button>
                <button class="bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
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