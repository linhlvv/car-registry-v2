<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps(['totalPage', 'currentPage']);
const emit = defineEmits(['pageClicked', 'navigatePage'])

let screenW = ref(window.innerWidth)

const onResize = () => {
    screenW.value = window.innerWidth
}

onMounted(() => {
    nextTick(() => {
        window.addEventListener('resize', onResize)
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
})

const pageQuantity = computed(() => {
    if (screenW.value <  400) {
        return 3
    } else if (screenW.value <  640) {
        return 6
    } else if (screenW.value <  1024) {
        return 10
    } else {
        return 20
    }
})

watch(screenW, () => {
    console.log(screenW.value);
})

const pageArray = computed(() => {
    const currentPagePosition = Math.floor((props.currentPage - 1)/pageQuantity.value)
    const startPoint = currentPagePosition*pageQuantity.value + 1
    let endPoint = currentPagePosition*pageQuantity.value + pageQuantity.value
    if(endPoint > props.totalPage) {
        endPoint = props.totalPage
    }
    let array = []
    for(let i = startPoint; i <= endPoint; i++) {
        array.push(i)
    }
    return array
})

const pageClicked = (page) => {
    emit('pageClicked', page)
};

const navigatePage = (direction) => {
    emit('navigatePage', direction)
};
</script>

<template>
    <div class="w-full flex items-center justify-center gap-2">
        <div @click="pageClicked(1)" class="flex items-center cursor-pointer text-[#1d1d1d] border-t-2 border-solid border-transparent hover:border-[#2acc97] duration-150 ease-in-out px-2 py-[6px] group relative overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 transition-transform duration-300 absolute translate-x-10 group-hover:translate-x-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
        </div>
        <div @click="navigatePage('left')" class="flex items-center cursor-pointer text-[#1d1d1d] border-t-2 border-solid border-transparent hover:border-[#2acc97] duration-150 ease-in-out px-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
        </div>
        <div id="table" class="flex items-center">
            <div v-for="(index) in pageArray" :key="index">
                <div @click="pageClicked(index)" :class="currentPage === index ? 'text-[#2acc97]' : 'hover:border-[#2acc97]'" class="text-[14px] px-3 py-1 cursor-pointer font-semibold border-t-2 border-solid border-transparent duration-150 ease-linear">
                    {{ index }}
                </div>
            </div>
        </div>
        <div @click="navigatePage('right')" class="flex items-center cursor-pointer text-[#1d1d1d] border-t-2 border-solid border-transparent hover:border-[#2acc97] duration-150 ease-in-out px-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </div>
        <div @click="pageClicked(totalPage)" class="flex items-center cursor-pointer text-[#1d1d1d] border-t-2 border-solid border-transparent hover:border-[#2acc97] duration-150 ease-in-out px-2 py-[6px] group relative overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 transition-transform duration-300 absolute -translate-x-10 group-hover:-translate-x-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    </div>
</template>

<style scoped>
    
</style>