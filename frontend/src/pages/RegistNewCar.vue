<script setup>
import RegistrationCarAndOwner from '../components/modal/RegistrationCarAndOwner.vue';
import RegistrationCert from '../components/modal/RegistrationCert.vue';
import { ref } from 'vue';

const info = ref({
    licenseId: '', r_name: '', manafractureDate: '', brand: '', model: '', version: '',
    certId: '', certDate: '', modifyDate: '',
    name: '', ssn: '', dob: '', address: '', phone: '', taxnum:''
});
</script>

<template>
    <div class="w-full bg-[#f5f7fb] py-4">
        <div class="flex flex-col gap-2 w-full">
            <div class="w-full flex gap-2 h-[450px]">
                <RegistrationCarAndOwner :info="info" :regist-new-car="true"/>
                <RegistrationCert />
            </div>
            <div class="w-full flex gap-4 justify-end">
                <button class="bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Regist
                </button>
            </div>
        </div>
    </div>
</template>