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
        <div class="flex gap-3 max-[960px]:flex-col w-full">
            <div class="flex flex-col w-3/5 max-[960px]:w-full">
                <AccountInput v-model="accountInfo.name" title="Name" placeholder="Name" type="text" class="w-full"/>
            </div>
            <div class="flex flex-col w-2/5 max-[960px]:w-full">
                <AccountInput v-model="accountInfo.email" title="Email" placeholder="Email" type="email" class="w-full"/>
            </div>
        </div>
        <div class="flex gap-3 w-full max-[960px]:flex-col">
            <div class="flex items-center w-1/2 gap-3 max-[960px]:w-full">
                <div class="flex flex-col w-[50%]">
                    <AccountInput v-model="accountInfo.phone" title="Phone" placeholder="Phone" type="text" class="w-full"/>
                </div>
                <div class="flex flex-col w-[50%]">
                    <AccountInput v-model="accountInfo.district" title="District" placeholder="District" type="text" class="w-full"/>
                </div>
            </div>
            <div class="flex items-center w-1/2 gap-3 max-[960px]:w-full">
                <div class="flex flex-col w-[50%]">
                    <AccountInput v-model="accountInfo.city" title="City" placeholder="City" type="text" class="w-full"/>
                </div>
                <div class="w-[50%] flex items-end justify-end">
                    <div class="flex text-[#1d1d1d] gap-1 p-2 rounded-lg items-center text-[13px] cursor-pointer duration-300 hover:text-[#16d592] active:bg-[#cdfcec]/40">
                        <i class="fa-sharp fa-solid fa-circle-plus flex items-center"></i>
                        <div class="font-semibold">CREATE ACCOUNT</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>