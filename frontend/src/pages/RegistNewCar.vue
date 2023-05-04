<script setup>
import RegistrationCarAndOwner from '../components/modal/RegistrationCarAndOwner.vue';
import RegistrationCert from '../components/modal/RegistrationCert.vue';
import { useAccountStore } from '../stores/AccountStore';
import { ref, watch } from 'vue';

const accountStore = useAccountStore()

//SECTION - details
// logic - owner
const defaultInfo = {
    licenseId: '', r_name: '', manafractureDate: '', brand: '', model: '', version: '',
    certId: '', certDate: '', modifyDate: '',
    name: '', ssn: '', dob: '', address: '', phone: '', taxnum:''
}
let prevLicenseInput
const info = ref({...defaultInfo});

// logic - form
const defaultCert = {
    id: '',
    registDate: '',
    expireDate: '',
    centreName: '',
}
const registryInfo = ref({...defaultCert})

//SECTION - owner type handler
const ownerType = ref(0);
const changeOwnerType = (type) => {
    ownerType.value = type
    info.value = {...defaultInfo}
    registryInfo.value = {...defaultCert}
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
const noResultFound = ref(false)
const hasResult = ref(false)
const fetchCarAndOwnerDataDetails = async () => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/preview-info`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(
            {
                licenseId: info.value.licenseId,
            }
        ),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car info: ${JSON.stringify(dataFetched)}`);
    if(dataFetched.data === null) {
        prevLicenseInput = info.value.licenseId
        noResultFound.value = true
        hasResult.value = false
        info.value = {...defaultInfo, licenseId: prevLicenseInput}
        registryInfo.value = {...defaultCert}
    } else {
        hasResult.value = true
        info.value = dataFetched.data[0]
        ownerType.value = dataFetched.ownerType
        noResultFound.value = false
        fetchRegistryInfo()
    }
    loading.value = false
};

const fetchRegistryInfo = async () => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/preview-regist`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({licenseId: info.value.licenseId}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car info: ${JSON.stringify(dataFetched)}`);
    registryInfo.value = dataFetched
    // console.log(dataFetched.ownerType);
    console.log(`info: ${JSON.stringify(registryInfo.value)}`);
    loading.value = false
}

const messageTime = 3
const errorMessageTime = ref(messageTime)
const errorMessageOn = ref(false)
let errorMessageInterval
const handleRegist = async () => {
    if(noResultFound.value === true || hasResult.value === false) {
        errorMessageOn.value = true
        errorMessageTime.value = messageTime
        clearInterval(errorMessageInterval)
        errorMessageInterval = setInterval(() => {
            errorMessageTime.value -= 1
        }, 1000);
    } else {
        const res = await fetch(`http://localhost:1111/new-regist`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accountStore.getToken}`
            },
            body: JSON.stringify({
                id: registryInfo.value.id,
                licenseId: info.value.licenseId,
                registDate: registryInfo.value.registDate,
                expireDate: registryInfo.value.expireDate,
            }),
        })
        if(res.error) {
            console.log(res.error);
        }
        console.log(res.status);
        // if(res.status === 200) {
        //     triggerInterval()
        // }
    }
}

//SECTION - watchers
watch(() => info.value.licenseId, (newId, oldId) => {
    fetchData()
});

watch(() => errorMessageTime.value, () => {
    if(errorMessageTime.value === 0) {
        errorMessageTime.value = messageTime
        errorMessageOn.value = false
        clearInterval(errorMessageInterval)
    }
});
</script>

<template>
    <div class="w-full relative">
        <div class="w-full bg-[#f5f7fb] py-4 px-2">
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
                <div class="w-full h-6">
                    <Transition name="slide-fade">
                        <div v-if="noResultFound" class="w-full flex items-center text-[#cc502a] gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            <p class="text-base font-medium">No result found! Please try again</p>
                        </div>
                    </Transition>
                </div>
                <div class="w-full flex gap-2 h-[450px]">
                    <RegistrationCarAndOwner :info="info" :regist-new-car="true" :owner-type="ownerType"/>
                    <RegistrationCert :registry-info="registryInfo"/>
                </div>
                <div class="w-full h-6">
                    <Transition name="fade">
                        <div v-if="errorMessageOn" class="w-full flex items-center g-1 text-[#cc502a]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <p class="text-base font-medium">No valid CERT to be registed</p>
                        </div>
                    </Transition>
                </div>
                <div class="w-full flex gap-4 justify-end">
                    <button @click="handleRegist" class="flex items-center gap-2 bg-[#2acc97]/80 hover:bg-[#2acc97]/90 active:bg-[#2acc97] text-white font-semibold text-xs p-3 px-4 rounded-[4px]">
                        Regist
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.5s ease-out;
}

.fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>