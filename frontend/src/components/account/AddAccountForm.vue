<script setup>
import { ref } from 'vue';
import Button from '../UI/Button.vue';
import AccountInput from './AccountInput.vue';

const formClosed = ref(false);
const closeHandler = () => {
    formClosed.value = !formClosed.value;
    console.log(formClosed.value);
};
</script>

<template>
    <div class="flex flex-col gap-3 p-4 px-6 bg-white rounded-lg w-[65vw] mt-2" :class="{'hidden': formClosed}">
        <div class="flex gap-3 email-password">
            <div class="flex flex-col w-3/5">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Email</div>
                <AccountInput placeholder="Email" type="email" class="w-full"/>
            </div>
            <div class="flex flex-col w-1/3">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Password</div>
                <AccountInput placeholder="Password" type="password" class="w-full"/>
            </div>
            <div class="flex flex-col w-1/3">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Phone</div>
                <AccountInput placeholder="Phone" type="text" class="w-full"/>
            </div>
        </div>
        <div class="flex gap-3 email-password">
            <div class="flex flex-col w-1/3">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">Name</div>
                <AccountInput placeholder="Name" type="text" class="w-full"/>
            </div>
            <div class="flex flex-col w-[22.2222%]">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">District</div>
                <AccountInput placeholder="District" type="text" class="w-full"/>
            </div>
            <div class="flex flex-col w-[22.2222%]">
                <div class="text-[10px] font-medium text-[#898c91] ml-[1px]">City</div>
                <AccountInput placeholder="City" type="text" class="w-full"/>
            </div>
            <div class="w-[22.2222%] flex items-end justify-end">
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