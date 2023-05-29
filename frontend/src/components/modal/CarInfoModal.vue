<script setup>
import CarInformationBlock from './CarInformationBlock.vue'
import CarRegistryInformationBlock from './CarRegistryInformationBlock.vue';
import OwnerBrief from './OwnerBrief.vue';
import { useAccountStore } from '../../stores/AccountStore';
import { ref } from 'vue';

const props = defineProps(['licenseId']);
const emit = defineEmits(['exitModal']);
const accountStore = useAccountStore();
const exitModal = () => {
    emit('exitModal');
};

const carDetailedInfo = ref({});
const ownerType = ref()
const registryCert = ref({info: {}, valid: true})
const findCarInfo = async() => {
    console.log(props.licenseId);
    const res = await fetch(`http://localhost:1111/vehicles/modal`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
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
    <div class="flex w-full h-screen items-center justify-center fixed z-50 top-0">
        <div class="bg-black/40 top-0 left-0 w-full h-full blur-xl fixed z-50" @click="exitModal"></div>
        <div id="modal" class="bg-white rounded-lg max-md:rounded-[3px] fixed w-3/5 max-xl:w-4/5 max-lg:w-full z-50 flex max-md:flex-col max-md:max-h-[500px] max-md:overflow-y-scroll modal-animation overflow-hidden">
            <div class="w-3/5 min-w-[450px] max-md:w-full max-md:min-w-full border-r text-[#1d1d1d] mb-3">
                <div class="w-full flex justify-end md:hidden">
                    <svg @click="exitModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500 mt-2 mr-2">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="flex flex-col items-center w-full">
                    <div class="text-3xl font-semibold py-5 hover:underline">{{ licenseId }}</div>
                    <CarRegistryInformationBlock 
                        :registry-cert="registryCert"
                    />
                    <div class="grid grid-cols-3 max-sm:grid-cols-2 grid-rows-[repeat(x,max-content),1fr] gap-2 w-[90%] gap-y-4">
                        <CarInformationBlock description="Registration code" icon="fa-solid fa-hashtag" :detail="carDetailedInfo.certId" class=""/>
                        <CarInformationBlock description="Registration date" icon="fa-solid fa-calendar-check" :detail="carDetailedInfo.certDate"/>
                        <CarInformationBlock description="Registration city" icon="fa-solid fa-city" :detail="carDetailedInfo.r_name" class=""/>
                        <CarInformationBlock description="Car model" icon="fa-solid fa-car" :detail="carDetailedInfo.brand + ' ' + carDetailedInfo.model + ' ' + carDetailedInfo.version"/>
                        <CarInformationBlock description="Manufacture date" icon="fa-solid fa-calendar-days" :detail="carDetailedInfo.manafractureDate" class=""/>
                        <CarInformationBlock description="Purpose" icon="fa-solid fa-gears" :detail="ownerType === 1 ? 'Personal' : 'Business'" class=""/>
                    </div>
                </div>
            </div>
            <div class="w-2/5 max-md:w-full min-w-[300px] bg-[#2acc97] text-white">
                <div class="h-[5%] flex items-start justify-end p-1 max-md:hidden">
                    <i class="fa-sharp fa-solid fa-circle-xmark cursor-pointer active:text-[#cc2a5f]" @click="exitModal"></i>
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

    #modal::-webkit-scrollbar {
        width: 6px;
    }
    
    #modal::-webkit-scrollbar-track {
        border-radius: 12px;
    }
    
    #modal::-webkit-scrollbar-thumb {
        background-color: #2acc97;
        outline: none;
        border-radius: 12px;
    }
    #modal::-webkit-scrollbar-thumb:hover {
        background-color: #0ce29b;
    }
</style>