<script setup>
import Information from '../components/profile/Information.vue';
import Chart from '../components/profile/Chart.vue';
</script>

<template>
    <div class="min-w-fit">
        <div class="flex p-[2rem] gap-[3rem] relative max-w-full max-[814px]:flex-col">
            <Information />
            <Chart />
        </div>
    </div>
</template>

<style scoped>

</style>