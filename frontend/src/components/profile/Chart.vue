<script setup>
import ChartInner from './ChartInner.vue';
import { ref } from 'vue';
</script>

<template>
    <div class="grid-2 w-[70%] rounded-xl p-4 bg-white max-[914px]:w-full max-[500px]:min-h-fit">
        <ChartInner />
    </div>
</template>

<style scoped>
    .grid-2 {
        box-shadow: 5px 8px 8px #ebecf0;
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