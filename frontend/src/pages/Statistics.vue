<script setup>
import StatisticChart from '../components/statistics/StatisticChart.vue';
import StatisticTable from '../components/statistics/StatisticTable.vue';
import { ref, watch } from 'vue';

const time = ref({
    year: 'All', quarter: 'All', month: 'All'
});

const handleTimeChange = (timeValue) => {
    time.value = timeValue
};

</script>

<template>
    <div class="w-full flex items-center flex-col gap-5 py-5">
        <div>{{ time }}</div>
        <StatisticTable :time="time" @selected-time-clicked="handleTimeChange"/>
        <div class="w-full flex justify-center" v-if="time.year !== 'All'">
            <StatisticChart :year="parseInt(time.year)"/>
        </div>
    </div>
</template>