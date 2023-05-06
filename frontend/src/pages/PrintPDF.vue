<script setup>
import { computed, onBeforeUpdate, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRegistrationCertStore } from '../stores/RegistrationCertStore';
import logo from '../assets/logo_vietnam_register.png'

const route = useRoute()
const registrationCertStore = useRegistrationCertStore()

const carAndOwnerInfo = ref({});
const registCertInfo = ref({});
const ownerType = ref(0);
const name = ref('Vu Minh Tuan');
const date = ref(new Date())
const mutatedParam = computed(() => {
    const ans = route.params.license.replace('=', '.')
    return ans;
})

const fetchCarAndOwnerInfo = async () => {
    const res = await fetch(`http://localhost:1111/preview-info`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({licenseId: mutatedParam.value}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(JSON.stringify(dataFetched));
    carAndOwnerInfo.value = dataFetched.data[0]
    ownerType.value = dataFetched.ownerType
    carAndOwnerInfo.value.address = carAndOwnerInfo.value.address.charAt(0).toUpperCase() + carAndOwnerInfo.value.address.slice(1)
    console.log(ownerType.value);
}

const fetchLatestRegist = async () => {
    const res = await fetch(`http://localhost:1111/info/regist/latest`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({licenseId: mutatedParam.value}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(JSON.stringify(dataFetched));
    registCertInfo.value = dataFetched
}

//TODO
const print = () => {
    window.print()
};

//TODO - add fetch function, param id and license
onMounted(() => {
    fetchCarAndOwnerInfo()
    fetchLatestRegist()
    
});

</script>

<template>
    <div class="w-full min-h-screen bg-white flex items-center flex-col px-16 py-10">
        <div class="w-full flex items-end justify-between mb-6 p-4">
            <div class="flex items-end gap-1">
                <img :src="logo" class="w-24"/>
                <p class="text-center text-[20px] text-[#1d1d1d] font-semibold">
                    Vietnam<br>Register
                </p>
            </div>
            <p class="text-center text-[18px] text-[#1d1d1d] font-medium">
                Date: {{ date.getFullYear() }}-{{ date.getMonth() }}-{{ date.getDay() }}
            </p>
        </div>
        <p class="text-center text-[32px] text-[#1d1d1d] font-semibold mb-8">Registration Certificate</p>
        <div class="w-full p-4 h-full text-base text-[#1d1d1d] font-medium flex flex-col gap-6">
            <div class="w-full flex items-center gap-4">
                <p class="text-[24px] font-semibold">Owner</p>
                <hr class="border-[1px] border-[#9f9f9f] w-full">
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Name:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.name }}</p>
            </div>
            <div v-if="ownerType === 1" class="flex items-start justify-between w-full">
                <p>Gender:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.gender }}</p>
            </div>
            <div v-else class="flex items-start justify-between w-full">
                <p>Ownership:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.ownership }}</p>
            </div>
            <div v-if="ownerType === 1" class="flex items-start justify-between w-full">
                <p>D.O.B:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.dob }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Phone:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.phone }}</p>
            </div>
            <div v-if="ownerType === 1" class="flex items-start justify-between w-full">
                <p>Social security number:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.ssn }}</p>
            </div>
            <div v-else class="flex items-start justify-between w-full">
                <p>Social security number:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.taxnum }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Address:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.address }}</p>
            </div>
        </div>
        <div class="break-after-page w-full p-4 h-full text-base text-[#1d1d1d] font-medium flex flex-col gap-6 mt-4">
            <div class="w-full flex items-center gap-4">
                <p class="text-[24px] font-semibold">Car</p>
                <hr class="border-[1px] border-[#9f9f9f] w-full">
            </div>
            <div class="flex items-start justify-between w-full">
                <p>License ID:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.licenseId }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Region:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.r_name }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Name:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.brand }} {{ carAndOwnerInfo.model }} {{ carAndOwnerInfo.version }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Manufacturing date:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.manafractureDate }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Register CERT ID:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.certId }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Register CERT date:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.certDate }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Last modification date:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ carAndOwnerInfo.modifyDate ?? 'None' }}</p>
            </div>
        </div>
        <div class="w-full p-4 h-full text-base text-[#1d1d1d] font-medium flex flex-col gap-6 mt-14">
            <div class="w-full flex items-center gap-4">
                <p class="text-[24px] font-semibold">Registration Certificate</p>
                <hr class="border-[1px] border-[#9f9f9f]  w-full">
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Registry ID:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ registCertInfo.id }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Registry date:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ registCertInfo.registDate }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Expired date:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ registCertInfo.expireDate }}</p>
            </div>
            <div class="flex items-start justify-between w-full">
                <p>Center:</p>
                <p class="max-w-1/2 max-w-[50%] text-right">{{ registCertInfo.centreName }}</p>
            </div>
        </div>
        <div class="w-full flex items-center justify-center mt-6">
            <hr class="border-[1px] border-[#9f9f9f] w-[90%]">
        </div>
        <div class="w-full p-4 h-full text-base text-[#1d1d1d] font-medium flex justify-around gap-24 mt-4">
            <div class="flex flex-col gap-16">
                <p class="text-center text-[20px]">Owner confirmation</p>
                <p class="text-center">{{ carAndOwnerInfo.name }}</p>
            </div>
            <div class="flex flex-col gap-16">
                <p class="text-center text-[20px]">Center confirmation</p>
                <p class="text-center">{{ registCertInfo.centreName }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@page { 
    margin: 0; 
}
</style>