<script setup>
import { ref } from 'vue';
import RegistrationFormInput from './RegistrationFormInput.vue';

const props = defineProps(['info', 'ownerType', 'registNewCar']);

</script>

<template>
    <div class="w-[65%] max-md:w-full max-sm:h-fit h-full p-3 px-4 bg-white rounded-[4px] shadow flex flex-col justify-between text-[#1d1d1d] gap-6">
        <div class="flex flex-col w-full">
            <div class="w-full flex items-center text-2xl font-semibold text-[#2acc97] mb-3">Car</div>
            <div class="w-full grid grid-cols-3 max-sm:grid-cols-1 grid-rows-[repeat(x,max-content),1fr] gap-x-2 gap-y-6">
                <RegistrationFormInput placeholder="XXX-XXX.XX" :disabled="registNewCar ? false : true" title="License plate" input-width="w-full" v-model="info.licenseId"/>
                <RegistrationFormInput :disabled="true" title="Region" input-width="w-full" v-model="info.r_name"/>
                <RegistrationFormInput :disabled="true" title="Manufacture date" input-width="w-full" v-model="info.manafractureDate"/>
                <RegistrationFormInput :disabled="true" title="Brand" input-width="w-full" v-model="info.brand"/>
                <RegistrationFormInput :disabled="true" title="Model" input-width="w-full" v-model="info.model"/>
                <RegistrationFormInput :disabled="true" title="Version" input-width="w-full" v-model="info.version"/>
                <RegistrationFormInput :disabled="true" title="Certification ID" input-width="w-full" v-model="info.certId"/>
                <RegistrationFormInput :disabled="true" title="Certification date" input-width="w-full" v-model="info.certDate"/>
                <RegistrationFormInput :disabled="true" title="Modification date" input-width="w-full" v-model="info.modifyDate"/>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <p class="w-full flex items-center text-2xl font-semibold text-[#2acc97] mb-3">Owner</p>
            <div class="w-full grid grid-cols-3 max-sm:grid-cols-1 grid-rows-[repeat(x,max-content),1fr] gap-x-2 gap-y-6">
                <RegistrationFormInput :disabled="true" title="Name" :input-width="ownerType === 1 ? 'w-full' : 'sm:[grid-column:1/3] max-sm:w-full'" v-model="info.name"/>
                <RegistrationFormInput v-if="ownerType === 1" :disabled="true" title="D.O.B" input-width="w-full" v-model="info.dob"/>
                <RegistrationFormInput v-if="ownerType === 1" :disabled="true" title="SSN" input-width="w-full" v-model="info.ssn"/>
                <RegistrationFormInput v-if="ownerType === 0" :disabled="true" title="Tax Identification number" input-width="w-full" v-model="info.taxnum"/>
                <RegistrationFormInput :disabled="true" title="Address" input-width="sm:[grid-column:1/3] max-sm:w-full" v-model="info.address"/>
                <RegistrationFormInput :disabled="true" title="Phone" input-width="w-full" v-model="info.phone"/>
            </div>
            <div class="w-full flex items-center justify-between mb-6">
                
            </div>
        </div>
    </div>
</template>