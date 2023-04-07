<script setup>
import ChartInner from './ChartInner.vue';
import { onMounted, ref } from 'vue';
import { useAccountStore } from "../../stores/AccountStore";

const accountStore = useAccountStore();

const curYear = ref(0);
const yearList = ref([
    {year: 2021, index: 0},
    {year: 2022, index: 1},
    {year: 2023, index: 2},
]);

</script>

<template>
    <div class="grid-2 flex flex-col w-[70%] rounded-xl p-4 bg-white max-[914px]:w-full max-[500px]:min-h-fit">
        <div class="flex justify-end items-center gap-2">
            <div class="text-[#1d1d1d] font-medium text-base">Year:</div>
            <select v-model="curYear" class="border-2 rounded-md border-[#2acc97]">
                <option v-for="year in yearList" :key="year.index" :value="year.index">{{ year.year }}</option>
            </select>
        </div>
        <!-- {year: 2012, expired: {jan: 12, ...}, registed: {jan: 12, ...}, notRegisted: {jan: 12, ...}} -->
        <ChartInner :year="curYear"/>
        
    </div>
</template>

<style scoped>
    .grid-2 {
        box-shadow: 5px 8px 8px #ebecf0;
    }
</style>