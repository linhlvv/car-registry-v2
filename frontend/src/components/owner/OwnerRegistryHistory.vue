<script setup>
import { ref } from 'vue';
import OwnerCarsNav from './OwnerValidNav.vue';
import OwnerRegistryCard from './OwnerRegistryCard.vue';
import { useRoute } from "vue-router";

const route = useRoute();

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

const registryList = ref([])

// const fetchRegistryList = async() => {
//     const res = await fetch(`http://localhost:1111/owner/valid`, {
//         method: 'POST',
//         credentials: "include",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({id: route.params.id}),
//     })
//     if(res.error) {
//         console.log(res.error);
//     }
//     // console.log(`${res}`);
//     const data = JSON.parse(await res.text())
//     console.log(`owner registed cars: ${JSON.stringify(data)}`);
// 
// };
// fetchRegistryList()

const registedList = ref([]);
const expiredList = ref([]);

</script>

<template>
    <div class="w-full flex flex-col gap-3">
        <div class="w-full flex items-center justify-between">
            <div class="w-1/4 text-3xl font-medium flex items-center text-[#1d1d1d] text-opacity-60">
                Owner registries
            </div>
            <hr class="border-[1.25px] w-3/4 border-[#1d1d1d] border-opacity-10">
        </div>
        <OwnerCarsNav @change-tag="changeTagHandler" :registed-tag="registedTag"/>
        <!-- <div>{{ registedTag }}</div> -->
        <div class="flex flex-col w-full gap-[2px]">
            <OwnerRegistryCard :is-root-row="true" license-plate="License plate" name="Name"/>
            <div v-if="registedTag" v-for="card in registedList" :key="card.licensePlate" class="w-full">
                
            </div>
            <div v-if="!registedTag" v-for="card in expiredList" :key="card.licensePlate" class="w-full">
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>