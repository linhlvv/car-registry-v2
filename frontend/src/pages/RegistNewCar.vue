<script setup>
import RegistrationCarAndOwner from '../components/modal/RegistrationCarAndOwner.vue';
import RegistrationCert from '../components/modal/RegistrationCert.vue';
import { ref } from 'vue';

const info = ref({
    licenseId: '', r_name: '', manafractureDate: '', brand: '', model: '', version: '',
    certId: '', certDate: '', modifyDate: '',
    name: '', ssn: '', dob: '', address: '', phone: '', taxnum:''
});

const ownerType = ref(0);

</script>

<template>
    <div class="w-full bg-[#f5f7fb] py-4">
        <div class="flex flex-col gap-2 w-full items-center">
            <div class="flex items-center w-4/5 bg-white rounded-[4px] overflow-hidden shadow">
                <div class="w-1/2 items-center flex justify-center gap-2 py-3 cursor-pointer" :class="ownerType === 0 ? 'text-white bg-[#2acc97]' : 'text-[#1d1d1d] bg-white hover:text-[#2acc97] duration-150'">
                    <div class="text-[14px] font-semibold">Registration for company</div>
                    <i class="fa-solid fa-building-columns"></i>
                </div>
                <div class="w-1/2 items-center flex justify-center gap-2 py-3 cursor-pointer" :class="ownerType === 1 ? 'text-white bg-[#2acc97]' : 'text-[#1d1d1d] bg-white hover:text-[#2acc97] duration-150'">
                    <div class="text-[14px] font-semibold">Registration for person</div>
                    <i class="fa-solid fa-user-tie"></i>
                </div>
            </div>
            <div class="w-full flex gap-2 h-[450px]">
                <!-- <RegistrationCarAndOwner :info="info" :regist-new-car="true"/>
                <RegistrationCert /> -->
            </div>
            <div class="w-full flex gap-4 justify-end">
                <button class="bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Regist
                </button>
            </div>
        </div>
    </div>
</template>