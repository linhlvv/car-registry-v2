<script setup>
import Information from '../components/profile/Information.vue';
import Chart from '../components/profile/Chart.vue';
import { ref } from 'vue';

const centerInfo = ref({});
const fetchCenterInfoData = async() => {
    const res = await fetch(`http://localhost:1111/centre-info`, {
        credentials: "include",
    })
    const dataList = JSON.parse(await res.text())[0]
    console.log(`center info: ${JSON.stringify(dataList)}`);
    centerInfo.value = dataList
};
fetchCenterInfoData();

</script>

<template>
    <div class="w-full">
        <div class="flex p-[2rem] gap-[3rem] relative max-w-full max-[914px]:flex-col">
            <Information :center="centerInfo"/>
            <Chart />
        </div>
    </div>
</template>

<style scoped>

</style>