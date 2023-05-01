<script setup>
const props = defineProps(['totalPage', 'currentPage']);
const emit = defineEmits(['pageClicked', 'navigatePage'])

const pageClicked = (page) => {
    emit('pageClicked', page)
};

const navigatePage = (direction) => {
    emit('navigatePage', direction)
};
</script>

<template>
    <div class="w-full flex items-center justify-center gap-4">
        <div @click="navigatePage('left')" class="flex items-center cursor-pointer text-[#1d1d1d] border-t-[1.5px] border-solid border-transparent hover:border-[#2acc97] duration-150 ease-in-out px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
        </div>
        <div class="flex items-center">
            <div v-for="(index) in totalPage" :key="index">
                <div @click="pageClicked(index)" :class="currentPage === index ? 'text-[#2acc97]' : 'hover:border-[#2acc97]'" class="text-[14px] px-3 py-1 cursor-pointer font-semibold border-t-[1.5px] border-solid border-transparent duration-150 ease-linear">
                    {{ index }}
                </div>
            </div>
        </div>
        <div @click="navigatePage('right')" class="flex items-center cursor-pointer text-[#1d1d1d] border-t-[1.5px] border-solid border-transparent hover:border-[#2acc97] duration-150 ease-in-out px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </div>
    </div>
</template>