<script setup>
import RegistrationCarAndOwner from '../components/modal/RegistrationCarAndOwner.vue';
import RegistrationCert from '../components/modal/RegistrationCert.vue';
import { ref, watch } from 'vue';

//SECTION - details
// logic - owner
const info = ref({
    licenseId: '', r_name: '', manafractureDate: '', brand: '', model: '', version: '',
    certId: '', certDate: '', modifyDate: '',
    name: '', ssn: '', dob: '', address: '', phone: '', taxnum:''
});

// logic - form
const registryInfo = ref({
    id: '',
    registDate: '',
    expireDate: '',
    centreName: '',
})

//SECTION - owner type handler
const ownerType = ref(0);
const changeOwnerType = (type) => {
    ownerType.value = type
};

//SECTION - fetch car and owner data
// logic - input timeout function
let licenseInputTimeout;
const fetchData = () => {
    clearTimeout(licenseInputTimeout)
    licenseInputTimeout = setTimeout(fetchCarAndOwnerDataDetails, 1500)
}

// logic - fetch data
const loading = ref(false)
const fetchCarAndOwnerDataDetails = async () => {
    console.log(`fetch data: ${info.value.licenseId}`);
};


//SECTION - watchers
watch(() => info.value.licenseId, (newId, oldId) => {
    fetchData()
});
</script>

<template>
    <div class="w-full bg-[#f5f7fb] py-4">
        <div class="flex flex-col gap-2 w-full items-center">
            <div class="flex items-center w-4/5 bg-white rounded-[4px] overflow-hidden shadow">
                <div @click="changeOwnerType(0)" class="w-1/2 items-center flex justify-center gap-2 py-3 cursor-pointer" :class="ownerType === 0 ? 'text-white bg-[#2acc97]' : 'text-[#1d1d1d] bg-white hover:text-[#2acc97] duration-150 ease-out'">
                    <div class="text-[14px] font-semibold">Registration for company</div>
                    <i class="fa-solid fa-building-columns"></i>
                </div>
                <div @click="changeOwnerType(1)" class="w-1/2 items-center flex justify-center gap-2 py-3 cursor-pointer" :class="ownerType === 1 ? 'text-white bg-[#2acc97]' : 'text-[#1d1d1d] bg-white hover:text-[#2acc97] duration-150 ease-out'">
                    <div class="text-[14px] font-semibold">Registration for person</div>
                    <i class="fa-solid fa-user-tie"></i>
                </div>
            </div>
            <div>{{ info }}</div>
            <div class="w-full flex gap-2 h-[450px]">
                <RegistrationCarAndOwner :info="info" :regist-new-car="true" :owner-type="ownerType"/>
                <RegistrationCert :registry-info="registryInfo"/>
            </div>
            <div class="w-full flex gap-4 justify-end">
                <button class="flex items-center gap-2 bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-4 rounded-[4px]">
                    Regist
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>

                </button>
            </div>
        </div>
    </div>
</template>