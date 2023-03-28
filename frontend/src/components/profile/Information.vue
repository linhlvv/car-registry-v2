<script setup>
import avatar from '../../assets/haphuong.png';
import InformationDetailedCard from './InformationDetailedCard.vue';
</script>

<template>
    <div class="bg-white w-[30%] rounded-xl flex flex-col items-center text-[#1d1d1d] p-4 grid-1 max-[914px]:w-full">
        <img :src="avatar" alt=""/>
        <div class="flex flex-col items-center justify-center gap-1">
            <h1 class="text-2xl font-semibold mt-2 text-center flex items-center justify-center">Ha Phuong xinh gai</h1>
            <h4 class="text-[#2acc97] bg-[#cdfcec]/40 text-xs font-medium rounded-xl p-1 px-4 flex items-center justify-center">Id: 8</h4>
        </div>
        <div class="flex flex-col mt-2 w-4/5 gap-2">
            <InformationDetailedCard description="Name" detail="Ha Phuong xinh gai"/>
            <InformationDetailedCard description="Email" detail="tranhaphuong081003@gmail.com"/>
            <InformationDetailedCard description="Phone" detail="0981054950"/>
            <InformationDetailedCard description="City" detail="Ho Chi Minh"/>
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