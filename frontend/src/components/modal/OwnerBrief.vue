<script setup>
import OwnerBriefCard from './OwnerBriefCard.vue';

const props = defineProps([
    'ownerType',
    'ownerInfo'
]);
</script>

<template>
    <div class="h-[90%] flex flex-col items-start pt-2 p-3 text-white">
        <div class="flex min-[560px]:flex-col gap-1 items-center justify-center w-full">
            <!-- <i v-if="ownerType === 1" class="fa-solid fa-user-tie text-6xl text-white border-4 rounded-[50%] border-white border-opacity-90 p-4 px-5"></i>
            <i v-else class="fa-solid fa-landmark text-6xl text-white border-4 rounded-[50%] border-white border-opacity-90 p-4 px-5"></i> -->
            <svg v-if="ownerType === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" class="w-24 h-24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 p-2 rounded-full border-solid border-4 border-white">
                <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clip-rule="evenodd" />
            </svg>

            <div class="text-2xl font-semibold hover:underline cursor-pointer flex items-center gap-1 text-center max-md:text-left max-md:ml-1 max-md:mt-1">
                <router-link :to="'/owner/' + ownerInfo.ownerId">{{ ownerInfo.ownerName }}</router-link>
            </div>
        </div>
        <div class="flex flex-col w-full items-center mt-4 gap-3">
            <OwnerBriefCard v-if="ownerType === 1" icon="fa-solid fa-cake-candles" description="D.O.B" :detail="ownerInfo.ownerDOB">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40v-2.8c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0l-24.6 42.1c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40v-2.8c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zm103.4 42.1c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40v-2.8c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5l-24.6 42.1zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4.7-.6.8-.8l.1-.1c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l.1.1l.7.7c.7.7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3l.7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1.1l.7.7c.7.7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3l.7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l.1.1l.8.8c.8.7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9v-71c0-35.3-28.7-64-64-64v-48c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256v-48c0-17.7-14.3-32-32-32s-32 14.3-32 32v48h-64v-48zm320 218.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2c-12.8 8.9-32 18.9-54.6 18.9s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8c-13.5 8.7-33.4 18.6-55.9 18.6c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32v-85.4z"/>
                    </svg>
                </template>
            </OwnerBriefCard>
            <OwnerBriefCard v-if="ownerType === 1" icon="fa-solid fa-id-card" description="SSN" :detail="ownerInfo.ownerSSN">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 576 512">
                        <path fill="currentColor" d="M0 96h576c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32v288c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V128H0zm64 277.3c0-29.5 23.9-53.3 53.3-53.3h117.4c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128a64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"/>
                    </svg>
                </template>
            </OwnerBriefCard>
            <OwnerBriefCard icon="fa-solid fa-map-location-dot" description="Address" :detail="ownerInfo.ownerAddress">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 576 512">
                        <path fill="currentColor" d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80a40 40 0 1 0 0 80z"/>
                    </svg>
                </template>
            </OwnerBriefCard>
            <OwnerBriefCard v-if="ownerType === 0" icon="fa-solid fa-scroll" description="Tax Identification Number" :detail="ownerInfo.ownerTax">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 576 512">
                        <path fill="currentColor" d="M0 80v48c0 17.7 14.3 32 32 32h64V80c0-26.5-21.5-48-48-48S0 53.5 0 80zm112-48c10 13.4 16 30 16 48v304c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zm352 448c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7v5.3c0 53-43 96-96 96h272z"/>
                    </svg>
                </template>
            </OwnerBriefCard>
            <OwnerBriefCard icon="fa-solid fa-phone" description="Phone number" :detail="ownerInfo.ownerPhone">
                <template #i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M16 64C16 28.7 44.7 0 80 0h224c35.3 0 64 28.7 64 64v384c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zm208 384a32 32 0 1 0-64 0a32 32 0 1 0 64 0zm80-384H80v320h224V64z"/>
                    </svg>
                </template>
            </OwnerBriefCard>
        </div>
    </div>
</template>