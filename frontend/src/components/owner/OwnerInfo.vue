<script setup>
import OwnerInfoCard from './OwnerInfoCard.vue';
</script>

<template>
    <div class="w-full flex flex-col gap-3">
        <div class="w-full flex items-center justify-between">
            <div class="w-1/4 text-3xl font-medium flex items-center text-[#1d1d1d] text-opacity-60">
                Owner profile
            </div>
            <hr class="border-[1.25px] w-3/4 border-[#1d1d1d] border-opacity-10">
        </div>
        <div class="w-full flex rounded-md bg-white shadow-sm">
            <div class="w-[30%] flex flex-col p-7 gap-5 border-r border-[#1d1d1d] border-opacity-10">
                <div class="flex justify-center">
                    <i class="fa-solid fa-user-tie text-6xl text-[#2acc97] border-4 rounded-[50%] border-[#2acc97] border-opacity-90 p-4 px-5"></i>
                    <!-- <i class="fa-solid fa-landmark text-6xl text-[#2acc97] border-4 rounded-[50%] border-[#2acc97] border-opacity-90 p-4 px-5"></i> -->
                </div>
                <div class="flex justify-center text-center text-2xl font-medium text-[#1d1d1d] text-opacity-80">
                    Vu Minh Tuan
                </div>
            </div>
            <div class="w-[70%] flex flex-col p-7 justify-between">
                <div class="h-[45%] w-full flex justify-between">
                    <OwnerInfoCard title="SSN" content="001203028053" width="w-[30%]"/>
                    <OwnerInfoCard title="D.O.B" content="28/12/2003" width="w-[30%]"/>
                    <OwnerInfoCard title="Phone number" content="0981054950" width="w-[30%]"/>
                </div>
                <hr>
                <div class="h-[45%] w-full flex">
                    <OwnerInfoCard title="Address" content="148 Pho Yen Phu, phuong Yen Phu, quan Tay Ho, Ha Noi" width="w-full" justify="justify-end"/>
                </div>
            </div>
        </div>
    </div>
</template>