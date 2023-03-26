<script setup>
import ChartInner from './ChartInner.vue';
import { ref } from 'vue';

    const registeredCars = ref([
        {month: 'January', value: 31}, 
        {month: 'Febuary', value: 55},
        {month: 'March', value: 51},
        {month: 'April', value: 32},
        {month: 'May', value: 20},
        {month: 'June', value: 51},
        {month: 'July', value: 21},
        {month: 'August', value: 75},
        {month: 'September', value: 54},
        {month: 'October', value: 87},
        {month: 'November', value: 91},
        {month: 'December', value: 17},
    ]);
    const valueList = registeredCars.value.map(e => e.value)
    const maxValue = ref(Math.max(...valueList))
    const selected = ref('');
</script>

<template>
    <div class="grid-2 p-4">
        <div class="flex items-center justify-end mr-2 mt-2">
            <select v-model="selected" id="select-box">
                <option disabled value="">Please select one</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
            </select>
        </div>
        <div>
            <ChartInner :list="registeredCars" :max-value="maxValue"/>
        </div>
    </div>
</template>

<style scoped>
    .grid-2 {
        flex: 2;
        border-radius: 12px;
        background-color: white;
        box-shadow: 5px 8px 8px #ebecf0;
        max-width: 100%;
    }

    #select-box{
        height: 40px;
        overflow-y: auto;
        border-radius: 5px;
        border: 1.5px solid skyblue;
    }
    option{
        overflow-y: scroll;
        border: 1.5px solid skyblue;
    }
</style>