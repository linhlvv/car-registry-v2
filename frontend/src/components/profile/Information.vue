<script setup>
import avatar from '../../assets/haphuong.png';
import InformationDetailedCard from './InformationDetailedCard.vue';

const props = defineProps(['center']);
</script>

<template>
    <div class="bg-white w-full rounded-xl flex flex-col items-center text-[#1d1d1d] p-4 grid-1 max-[914px]:w-full">
        <i class="fa-solid fa-building-user text-6xl border-[3px] border-solid text-[#2acc97] border-[#2acc97] rounded-[50%] p-6 py-7"></i>
        <div class="flex flex-col items-center justify-center gap-1">
            <h1 class="text-2xl font-semibold mt-2 text-center flex items-center justify-center">{{ center.name }}</h1>
            <h4 class="text-[#2acc97] bg-[#cdfcec]/40 text-xs font-medium rounded-xl p-1 px-4 flex items-center justify-center">Id: {{ center.id }}</h4>
        </div>
        <div class="flex flex-col mt-2 w-4/5 gap-2">
            <InformationDetailedCard description="Name" :detail="center.name"/>
            <InformationDetailedCard description="Activation date" :detail="center.activation"/>
            <InformationDetailedCard description="City" :detail="center.city"/>
            <InformationDetailedCard description="District" :detail="center.district"/>
        </div>
    </div>
</template>

<style scoped>

    .grid-1 {
        box-shadow: 5px 8px 8px #ebecf0;
    }

    
    img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        border-radius: 50%;
    }
</style>