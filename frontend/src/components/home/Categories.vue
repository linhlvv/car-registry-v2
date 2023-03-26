<script setup>
import CategoryCard from './CategoryCard.vue';
</script>

<template>
    <div class="flex items-start w-full p-5 bg-[#2acc97]/[0.08] py-20">
        <div class="w-[45%] flex flex-col pl-32 mt-10 gap-5 max-[1000px]:pl-5 max-[539px]:hidden">
            <div class="text-4xl font-bold text-[#1d1d1d] text-opacity-70 w-full">
                Categories
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div class="text-base font-medium text-[#1d1d1d] text-opacity-50 w-4/5">
                Five Categories that will help you in managing Car Registration the easiest and fastest way!
            </div>
        </div>
        <div class="w-[55%] flex justify-center items-center max-[539px]:w-full">
            <div class="w-full flex flex-wrap gap-10 pl-5">
                <CategoryCard icon="fa-solid fa-car" category="Cars" link="/cars"/>
                <CategoryCard icon="fa-sharp fa-solid fa-car-on" category="Registed cars" link="/registedCars"/>
                <CategoryCard icon="fa-sharp fa-solid fa-car-burst" category="Expired cars" link="/expiredCars"/>
                <CategoryCard icon="fa-solid fa-car-tunnel" category="Not registried cars" link="/notRegistedCars"/>
                <CategoryCard icon="fa-solid fa-lightbulb" category="Forecast" link="/forecast"/> 
            </div>
        </div>
    </div>
</template>