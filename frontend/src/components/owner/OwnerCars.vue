<script setup>
import { ref } from 'vue';
import OwnerCarsNav from './OwnerCarsNav.vue';
import OwnerCarCard from './OwnerCarCard.vue';

const registedTag = ref(true);
const changeTagHandler = (value) => {
    registedTag.value = value
};

const carList = [
    {licensePlate: '29-F1 11583', name: 'RollRoyce Phantom', valid: true},
    {licensePlate: '29-F1 21529', name: 'Lamborghini Aventador', valid: true},
    {licensePlate: '29-F1 61516', name: 'Mercedes G63', valid: false},
    {licensePlate: '29-F1 61289', name: 'Kia Morning', valid: true},
    {licensePlate: '29-F1 31588', name: 'Mercedes Maybach S600', valid: false},
    {licensePlate: '29-F1 81589', name: 'Bentley Continental', valid: true},
];

const registedCarList = carList.filter(e => e.valid === true);
const expiredCarList = carList.filter(e => e.valid === false);

</script>

<template>
    <div class="w-full flex flex-col gap-3">
        <div class="w-full flex items-center justify-between">
            <div class="w-1/4 text-3xl font-medium flex items-center text-[#1d1d1d] text-opacity-60">
                Owner cars
            </div>
            <hr class="border-[1.25px] w-3/4 border-[#1d1d1d] border-opacity-10">
        </div>
        <OwnerCarsNav @change-tag="changeTagHandler" :registed-tag="registedTag"/>
        <!-- <div>{{ registedTag }}</div> -->
        <div class="flex flex-col w-full gap-[2px]">
            <OwnerCarCard :is-root-row="true" license-plate="License plate" name="Name"/>
            <div v-if="registedTag" v-for="car in registedCarList" :key="car.licensePlate" class="w-full">
                <OwnerCarCard :is-root-row="false" :license-plate="car.licensePlate" :name="car.name"/>
            </div>
            <div v-if="!registedTag" v-for="car in expiredCarList" :key="car.licensePlate" class="w-full">
                <OwnerCarCard :is-root-row="false" :license-plate="car.licensePlate" :name="car.name"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>