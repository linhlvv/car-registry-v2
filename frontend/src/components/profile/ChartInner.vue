<script setup>
import ChartBar from './ChartBar.vue';
import Button from '../UI/Button.vue'
import { ref } from 'vue';
const props = defineProps(['list', 'maxValue']);

let index = ref(100);
const turnOff = () => {
    if(index.value === 100) {
        index.value = 0
    } else {
        index.value = 100
    }
};
</script>

<template>
    <div class="flex justify-around space-x-2 mt-8 max-w-full mb-4">
        <div v-for="month in list" :key="month.month">
            <div class="flex justify-center text-white mb-1">
                {{ month.value }}
            </div>
            <div class="flex justify-center">
                <ChartBar :height="(month.value / maxValue) * index"/>
            </div>
            <div class="flex justify-center text-white"> {{ month.month.slice(0,3) }} </div>
        </div>
    </div>
    <div>
        <Button @clicked="turnOff">
            <template #content>Change</template>
        </Button>
    </div>
</template>

<style scoped>
</style>