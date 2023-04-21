<script setup>
import CategoryCard from './CategoryCard.vue';
</script>

<template>
    <div class="flex w-full p-5 bg-[#2acc97]/[0.08] py-20">
        <div class="w-[45%] flex flex-col pl-32 mt-5 gap-5 max-[1000px]:pl-5 max-[539px]:hidden">
            <div class="text-4xl font-bold text-[#1d1d1d] text-opacity-70 w-full">
                Categories
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div class="text-base font-medium text-[#1d1d1d] text-opacity-50 w-4/5">
                Categories that will help you in managing Car Registration the easiest and fastest way!
            </div>
        </div>
        <div class="w-[55%] flex justify-center items-center max-[539px]:w-full">
            <div class="w-full flex flex-wrap gap-10 pl-5 items-center">
                <CategoryCard icon="fa-solid fa-car" category="Cars" link="/cars"/>
                <CategoryCard icon="fa-solid fa-circle-plus" category="Regist" link="/regist-new-car"/>
                <CategoryCard icon="fa-solid fa-lightbulb" category="Forecast" link="/forecast"/> 
                <CategoryCard icon="fa-solid fa-chart-simple" category="Statistics" link="/statistics"/> 
            </div>
        </div>
    </div>
</template>