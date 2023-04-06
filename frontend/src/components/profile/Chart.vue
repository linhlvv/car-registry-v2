<script setup>
import ChartInner from './ChartInner.vue';
import { onMounted, ref } from 'vue';
import { useAccountStore } from "../../stores/AccountStore";

const accountStore = useAccountStore();

const year = ref('2023');

</script>

<template>
    <div class="grid-2 flex flex-col w-[70%] rounded-xl p-4 bg-white max-[914px]:w-full max-[500px]:min-h-fit">
        <div class="flex justify-end items-center gap-2">
            <div class="text-[#1d1d1d] font-medium text-base">Year:</div>
            <select v-model="year" class="border-2 rounded-md border-[#2acc97]">
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </select>
        </div>
        <!-- {year: 2012, expired: {jan: 12, ...}, registed: {jan: 12, ...}, notRegisted: {jan: 12, ...}} -->
        <ChartInner :year="year"/>
        
    </div>
</template>

<style scoped>
    .grid-2 {
        box-shadow: 5px 8px 8px #ebecf0;
    }
</style>