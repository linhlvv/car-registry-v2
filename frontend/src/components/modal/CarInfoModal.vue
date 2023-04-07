<script setup>
import CarInformationBlock from './CarInformationBlock.vue'
import CarRegistryInformationBlock from './CarRegistryInformationBlock.vue';
import OwnerBrief from './OwnerBrief.vue';
import { ref } from 'vue';

const props = defineProps(['licenseId']);
const emit = defineEmits(['exitModal']);
const exitModal = () => {
    emit('exitModal');
};

const carDetailedInfo = ref({});
const ownerType = ref()
const registryCert = ref({info: {}, valid: true})
const findCarInfo = async() => {
    console.log(props.licenseId);
    const res = await fetch(`http://localhost:1111/vehicles/find`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({licenseId: props.licenseId}),
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
    console.log(`cert: ${JSON.stringify(registryCert.value)}`);
};
findCarInfo()
</script>

<template>
    <div class="bg-black/40 top-0 left-0 w-full h-full blur-xl fixed z-10" @click="exitModal"></div>
    <div class="bg-white rounded-[8px] fixed top-[5vh] left-[20%] max-[560px]:left-[10%] w-3/5 max-[560px]:w-4/5 z-50 flex modal-animation overflow-hidden max-[560px]:flex-col max-[560px]:absolute">
        <div class="w-3/5 max-[560px]:w-full border-r text-[#1d1d1d] mb-3">
            <div class="flex flex-col items-center w-full">
                <div class="text-3xl font-semibold py-5 hover:underline max-[610px]:text-2xl">{{ licenseId }}</div>
                <CarRegistryInformationBlock 
                    :registry-cert="registryCert"
                />
                <div class="flex w-full justify-evenly flex-wrap gap-y-4 max-[600px]:flex-col max-[600px]:items-center">
                    <CarInformationBlock description="Registration code" icon="fa-solid fa-hashtag" :detail="carDetailedInfo.certId" class="max-[600px]:hidden"/>
                    <CarInformationBlock description="Registration date" icon="fa-solid fa-calendar-check" :detail="carDetailedInfo.certDate"/>
                    <CarInformationBlock description="Registration city" icon="fa-solid fa-city" :detail="carDetailedInfo.r_name" class="max-[600px]:hidden"/>
                    <CarInformationBlock description="Car model" icon="fa-solid fa-car" :detail="carDetailedInfo.brand + ' ' + carDetailedInfo.model + ' ' + carDetailedInfo.version"/>
                    <CarInformationBlock description="Manufacture date" icon="fa-solid fa-calendar-days" :detail="carDetailedInfo.manafractureDate" class="max-[860px]:hidden"/>
                    <CarInformationBlock description="Purpose" icon="fa-solid fa-gears" :detail="ownerType === 1 ? 'Personal' : 'Business'" class="max-[860px]:hidden"/>
                </div>
            </div>
        </div>
        <div class="w-2/5 max-[560px]:w-full bg-[#2acc97] text-white">
            <div class="h-[5%] flex items-start justify-end p-1">
                <i class="fa-sharp fa-solid fa-circle-xmark cursor-pointer active:text-[#cc2a5f] max-[560px]:hidden" @click="exitModal"></i>
            </div>
            <OwnerBrief 
                :owner-type="ownerType"
                :owner-info="ownerType === 1 ? {
                    ownerId: carDetailedInfo.id,
                    ownerName: carDetailedInfo.name,
                    ownerPhone: carDetailedInfo.phone,
                    ownerAddress: carDetailedInfo.address,
                    ownerDOB: carDetailedInfo.dob,
                    ownerSSN: carDetailedInfo.ssn,
                } : {
                    ownerId: carDetailedInfo.id,
                    ownerName: carDetailedInfo.name,
                    ownerPhone: carDetailedInfo.phone,
                    ownerAddress: carDetailedInfo.address,
                    ownerTax: carDetailedInfo.taxnum
                }"
            />
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
</style>