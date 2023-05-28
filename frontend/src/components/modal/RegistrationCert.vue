<script setup>
import RegistrationFormInput from './RegistrationFormInput.vue';

const props = defineProps(['registryInfo']);
</script>

<template>
    <div class="w-[35%] max-md:w-full h-full p-3 px-4 bg-white rounded-[4px] shadow flex flex-col text-[#1d1d1d]">
        <div class="w-full flex items-center text-2xl font-semibold mb-3 text-[#2acc97]">Registry Certification</div>
        <div class="flex flex-col w-full gap-6">
            <RegistrationFormInput title="ID" input-width="w-full" v-model="registryInfo.id" :disabled="true"/>
            <RegistrationFormInput title="Registry date" input-width="w-full" v-model="registryInfo.registDate" :disabled="true"/>
            <RegistrationFormInput title="Expired date" input-width="w-full" v-model="registryInfo.expireDate" :disabled="true"/>
            <RegistrationFormInput title="Center" input-width="w-full" v-model="registryInfo.centreName" :disabled="true"/>
        </div>
    </div>
</template>