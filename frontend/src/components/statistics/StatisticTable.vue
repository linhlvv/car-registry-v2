<script setup>
import StatisticTableCard from './StatisticTableCard.vue';
import SearchBar from '../UI/SearchBar.vue';
import { ref } from 'vue';

//SECTION - time handler
const yearList = ['All', '2021', '2022', '2023']
const quarterList = [
    {content: 'All', value: 'All'},
    {content: 'Q1', value: '1'},
    {content: 'Q2', value: '2'},
    {content: 'Q3', value: '3'},
    {content: 'Q4', value: '4'},
]
const monthList = [
    {content: 'All', value: 'All'}, 
    {content: 'January', value: '1'},
    {content: 'Febuary', value: '2'}, 
    {content: 'March', value: '3'}, 
    {content: 'April', value: '4'}, 
    {content: 'May', value: '5'}, 
    {content: 'June', value: '6'}, 
    {content: 'July', value: '7'}, 
    {content: 'August', value: '8'}, 
    {content: 'September', value: '9'}, 
    {content: 'October', value: '10'}, 
    {content: 'November', value: '11'}, 
    {content: 'December', value: '12'}, 
];

const time = ref({
    year: 'All', quarter: 'All', month: 'All'
});

//SECTION - page number handler
const pageNumber = ref(1);
const pageHandler = (direction) => {
    if(direction === 'left') {
        if (pageNumber.value > 1) {
            pageNumber.value -= +1;
            emit('prevPage');
        }
    } else {
        if (pageNumber.value < 100) {
            pageNumber.value += +1;
            emit('nextPage');
        }
    }
};

const pageEnteredHandler = (number) => {
    if(1 <= number && number <= 100) {
        pageNumber.value = +number;
    }
};


</script>

<template>
    <div class="w-4/5 flex flex-col bg-white p-4 rounded-md mt-6 gap-3">
        <div class="w-full flex items-center justify-between">
            <SearchBar width="w-2/5" placeholder="Enter a license ID or tax number..."/>
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle-arrow-left text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('left')"></i>
                <div class="flex items-center">
                    <input type="number" min="1" :max="100" @keyup.enter="pageEnteredHandler($event.target.value)" :value="pageNumber" class="w-[30px] border border-solid border-[#1d1d1d]/50"/>
                    <div>/100</div>
                </div>
                <i class="fa-solid fa-circle-arrow-right text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('right')"></i>
            </div>
        </div>
        <div class="flex items-center gap-2 w-full">
            <select v-model="time.year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="singleYear in yearList" :key="singleYear" :value="singleYear">
                    {{ singleYear }}
                </option>
            </select>
            <select :disabled="time.year === 'All'" v-model="time.quarter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-60">
                <option v-for="singleQ in quarterList" :key="singleQ.value" :value="singleQ.value">
                    {{ singleQ.content }}
                </option>
            </select>
            <select :disabled="time.year === 'All'" v-model="time.month" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-60">
                <option v-for="singleMonth in monthList" :key="singleMonth.value" :value="singleMonth.value">
                    {{ singleMonth.content }}
                </option>
            </select>
        </div>
        <div>
            <StatisticTableCard />
        </div>
    </div>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }
</style>