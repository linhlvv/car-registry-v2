<script setup>
import { ref } from 'vue';
import RegistrationFormInput from './RegistrationFormInput.vue';

const car = ref({
    licensePlate: '29-F1 61589', brand: 'Mercedes', model: 'Maybach', version: 'S600', region: 'Ha Noi', manufactureDate: '28/12/2021', certId: '810', certDate: '20/01/2023',
});

const person = ref ({
    name: 'Vu Minh Tuan', dob: '28/12/2003', ssn: '001203028053', address: '148 pho Yen Phu, quan Tay Ho, Ha Noi', phone: '0981054950',
});

const company = ref({
    name: 'Cong ty trach nhiem huu han Dit me may', taxNumber: 8, address: '144 Xuan Thuy, quan Cau Giay, Ha Noi'
});

</script>

<template>
    <div class="w-[65%] h-full p-3 px-4 bg-white rounded-[4px] shadow flex flex-col justify-between text-[#1d1d1d] gap-6">
        <div class="flex flex-col w-full">
            <div class="w-full flex items-center text-2xl font-semibold text-[#2acc97] mb-3">Car</div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput title="License plate" input-width="w-[30%]" v-model="car.licensePlate"/>
                <RegistrationFormInput title="Region" input-width="w-[30%]" v-model="car.region"/>
                <RegistrationFormInput title="Manufacture date" input-width="w-[30%]" v-model="car.manufactureDate"/>
            </div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput title="Brand" input-width="w-[30%]" v-model="car.brand"/>
                <RegistrationFormInput title="Model" input-width="w-[30%]" v-model="car.model"/>
                <RegistrationFormInput title="Version" input-width="w-[30%]" v-model="car.version"/>
            </div>
            <div class="w-full flex items-center gap-7">
                <RegistrationFormInput title="Certification ID" input-width="w-[20%]" v-model="car.certId"/>
                <RegistrationFormInput title="Certification date" input-width="w-[30%]" v-model="car.certDate"/>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="w-full flex items-center text-2xl font-semibold text-[#2acc97] mb-3">Owner</div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput title="Name" input-width="w-[50%]" v-model="person.name"/>
                <RegistrationFormInput title="SSN" input-width="w-[20%]" v-model="person.ssn"/>
                <RegistrationFormInput title="D.O.B" input-width="w-[20%]" v-model="person.dob"/>
            </div>
            <div class="w-full flex items-center justify-between mb-6">
                <RegistrationFormInput title="Address" input-width="w-[70%]" v-model="person.address"/>
                <RegistrationFormInput title="Phone" input-width="w-[25%]" v-model="person.phone"/>
            </div>
        </div>
    </div>
</template>