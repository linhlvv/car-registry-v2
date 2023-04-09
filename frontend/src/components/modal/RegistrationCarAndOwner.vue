<script setup>
import { ref } from 'vue';
import RegistrationFormInput from './RegistrationFormInput.vue';

const props = defineProps(['info', 'ownerType', 'registNewCar']);

</script>

<template>
    <div class="w-[65%] h-full p-3 px-4 bg-white rounded-[4px] shadow flex flex-col justify-between text-[#1d1d1d] gap-6">
        <div class="flex flex-col w-full">
            <div class="w-full flex items-center text-2xl font-semibold text-[#2acc97] mb-3">Car</div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="License plate" input-width="w-[30%]" v-model="info.licenseId"/>
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Region" input-width="w-[30%]" v-model="info.r_name"/>
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Manufacture date" input-width="w-[30%]" v-model="info.manafractureDate"/>
            </div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Brand" input-width="w-[30%]" v-model="info.brand"/>
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Model" input-width="w-[30%]" v-model="info.model"/>
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Version" input-width="w-[30%]" v-model="info.version"/>
            </div>
            <div class="w-full flex items-center gap-7">
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Certification ID" input-width="w-[30%]" v-model="info.certId"/>
                <RegistrationFormInput :disabled="registNewCar ? false : true" title="Certification date" input-width="w-[30%]" v-model="info.certDate"/>
                <RegistrationFormInput title="Modification date" input-width="w-[30%]" v-model="info.modifyDate"/>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="w-full flex items-center text-2xl font-semibold text-[#2acc97] mb-3">Owner</div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput title="Name" input-width="w-[30%]" v-model="info.name"/>
                <div v-if="ownerType === 1" class="w-1/4 flex items-center">
                    <RegistrationFormInput title="D.O.B" input-width="w-full" v-model="info.dob"/>
                </div>
                <div v-if="ownerType === 1" class="w-[35%] flex items-center">
                    <RegistrationFormInput title="SSN" input-width="w-full" v-model="info.ssn"/>
                </div>
                
            </div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput title="Address" input-width="w-[70%]" v-model="info.address"/>
                <RegistrationFormInput title="Phone" input-width="w-[25%]" v-model="info.phone"/>
            </div>
        </div>
    </div>
</template>