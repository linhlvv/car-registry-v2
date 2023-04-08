<script setup>
import { ref } from 'vue';
import Button from '../UI/Button.vue';
import AccountInput from './AccountInput.vue';

const accountInfo = ref({
    email: '',
    phone: '',
    name: '',
    district: '',
    city: '',
});
</script>

<template>
    <div class="flex flex-col gap-3 p-4 px-6 bg-white rounded-lg w-3/4 mt-2" :class="{'hidden': formClosed}">
        <div class="flex gap-3 email-password">
            <div class="flex flex-col w-3/5">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Name</div>
                <AccountInput v-model="accountInfo.name" placeholder="Name" type="text" class="w-full"/>
            </div>
            <div class="flex flex-col w-2/5">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Email</div>
                <AccountInput v-model="accountInfo.email" placeholder="Email" type="email" class="w-full"/>
            </div>
        </div>
        <div class="flex gap-3 email-password">
            <div class="flex flex-col w-1/4">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Phone</div>
                <AccountInput v-model="accountInfo.phone" placeholder="Phone" type="text" class="w-full"/>
            </div>
            <div class="flex flex-col w-[25%]">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">District</div>
                <AccountInput v-model="accountInfo.district" placeholder="District" type="text" class="w-full"/>
            </div>
            <div class="flex flex-col w-[25%]">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">City</div>
                <AccountInput v-model="accountInfo.city" placeholder="City" type="text" class="w-full"/>
            </div>
            <div class="w-[25%] flex items-end justify-end">
                <div class="flex text-[#1d1d1d] gap-1 p-2 rounded-lg items-center text-[13px] cursor-pointer duration-300 hover:text-[#16d592] active:bg-[#cdfcec]/40">
                    <i class="fa-sharp fa-solid fa-circle-plus flex items-center"></i>
                    <div class="font-semibold">CREATE ACCOUNT</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    @media screen and (max-width: 932px) {
        .email-password {
            flex-direction: column;
        }
    }
</style>