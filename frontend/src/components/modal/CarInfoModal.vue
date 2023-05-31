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
                        <CarInformationBlock description="Registration code" :detail="carDetailedInfo.certId" class="">
                            <template #i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-[#1d1d1d] text-opacity-80 w-12 h-12" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8l-9.8 58.8h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8l-9.7 58.8H416c17.7 0 32 14.3 32 32s-14.3 32-32 32h-68.9l-21.3 128H384c17.7 0 32 14.3 32 32s-14.3 32-32 32h-68.9l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7h-95.2l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.7-58.9H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zm5.8 159.6l-21.3 128h95.1l21.3-128h-95.1z"/>
                                </svg>
                            </template>
                        </CarInformationBlock>
                        <CarInformationBlock description="Registration date" :detail="carDetailedInfo.certDate">
                            <template #i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-[#1d1d1d] text-opacity-80 w-12 h-12" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm329 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95l-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"/>
                                </svg>
                            </template>
                        </CarInformationBlock>
                        <CarInformationBlock description="Registration city" :detail="carDetailedInfo.r_name" class="">
                            <template #i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-[#1d1d1d] text-opacity-80 w-12 h-12" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M480 48c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v48h-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24v72h-64V24c0-13.3-10.7-24-24-24S64 10.7 64 24v72H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H480V48zm96 320v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zm-336 48h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm-112-16c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm432-144c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32zm-304-80v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zm-144-16c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32zm144 144c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm-144 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm304-48v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32zm16 112v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z"/>
                                </svg>
                            </template>
                        </CarInformationBlock>
                        <CarInformationBlock description="Car model" :detail="carDetailedInfo.brand + ' ' + carDetailedInfo.model + ' ' + carDetailedInfo.version">
                            <template #i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-[#1d1d1d] text-opacity-80 w-12 h-12" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1l-100-125c-18.2-22.8-45.8-36-75-36H171.3C132 32 96.7 55.9 82.2 92.3L40.6 196.4C16.8 205.8 0 228.9 0 256v112c0 17.7 14.3 32 32 32h33.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80h130.6c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32v-48c0-65.2-48.8-119-111.8-127zm-93.5 175a48 48 0 1 1 90.5 32a48 48 0 1 1-90.5-32zM160 336a48 48 0 1 1 0 96a48 48 0 1 1 0-96z"/>
                                </svg>
                            </template>
                        </CarInformationBlock>
                        <CarInformationBlock description="Manufacture date" :detail="carDetailedInfo.manafractureDate" class="">
                            <template #i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-[#1d1d1d] text-opacity-80 w-12 h-12" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16z"/>
                                </svg>
                            </template>
                        </CarInformationBlock>
                        <CarInformationBlock description="Purpose" :detail="ownerType === 1 ? 'Personal' : 'Business'" class="">
                            <template #i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="text-[#1d1d1d] text-opacity-80 w-12 h-12" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M224 0a128 128 0 1 1 0 256a128 128 0 1 1 0-256zm-45.7 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.6c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.4zm92.1 133.5a48.1 48.1 0 1 0-96.1 0a48.1 48.1 0 1 0 96.1 0z"/>
                                </svg>
                            </template>
                        </CarInformationBlock>
                    </div>
                </div>
            </div>
            <div class="w-2/5 max-md:w-full min-w-[300px] bg-[#2acc97] text-white">
                <div class="h-[5%] flex items-start justify-end p-1 max-md:hidden">
                    <svg @click="exitModal" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-1 mr-1 active:text-[#cc2a5f] cursor-pointer" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zm-81-337c9.4-9.4 24.6-9.4 33.9 0l47 47l47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47l47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47l-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47l-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                    </svg>
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