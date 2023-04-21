<script setup>
import { computed } from '@vue/reactivity';
import carImg from '../../assets/car.png';
// #93a3e6

let scrollTop = window.pageYOffset || document.documentElement.scrollTop

const a = computed(() => {
    return document.documentElement.scrollTop
})

const scrollDown = () => {
    document.documentElement.scrollTop = 1000
};
</script>

<template>
    <div class="flex p-10 px-20 mb-40">
        <div class="w-1/2 flex flex-col pr-5 max-[924px]:w-full">
            <div class="text-4xl font-bold mt-5 text-[#3f4f4a]">
                Let's get started your <br> Car Registration with us
            </div>
            <div class="text-md font-medium mt-5 text-[#3f4f4a] text-opacity-80">
                Hey! Have you ever wished to be a car registrar?<br> If it is truly your dream, let's get started here!
            </div>
            <div class="flex items-center gap-14 mt-9 max-[539px]:hidden">
                <div class="flex flex-col items-center h-24 w-20 border-2 border-[#2acc97] border-opacity-70 border-solid rounded-2xl p-2 pb-3">
                    <i class="fa-solid fa-check text-3xl text-[#eded4a]"></i>
                    <div class="text-center h-3/5 flex items-center text-base text-[#1d1d1d] text-opacity-90 font-semibold">Clear<br>design</div>
                </div>
                <div class="flex flex-col items-center h-24 w-20 border-2 border-[#2acc97] border-opacity-70 border-solid rounded-2xl p-2 pb-3">
                    <i class="fa-solid fa-bolt-lightning text-3xl text-[#eded4a]"></i>
                    <div class="text-center h-3/5 flex items-center text-base text-[#1d1d1d] text-opacity-90 font-semibold">Fast</div>
                </div>
                <div class="flex flex-col items-center h-24 w-20 border-2 border-[#2acc97] border-opacity-70 border-solid rounded-2xl p-2 pb-3">
                    <i class="fa-solid fa-1 text-3xl text-[#eded4a]"></i>
                    <div class="text-center h-3/5 flex items-center text-base text-[#1d1d1d] text-opacity-90 font-semibold">SPA</div>
                </div>
            </div>
            <div class="mt-7">
                <button @click="scrollDown" class="flex items-center gap-1 p-3 px-4 bg-[#93a3e6] hover:bg-[#8e9fdf] active:bg-[#97aaf7] rounded-md text-[#1d1d1d] font-bold text-xs">
                    Get started
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
        <div class="w-1/2 relative flex items-start max-[924px]:hidden max-[924px]:w[0px]">
            <div class="absolute z-10 w-full flex justify-end mt-5 pr-[320px]">
                <div class=" w-[150px] flex flex-col gap-2 bg-white p-4 rounded-xl shadow-lg max-[1030px]:hidden">
                    <div>
                        <p class="text-md font-bold text-[#1d1d1d] text-opacity-70">Registration</p>
                        <div class="flex items-center justify-between">
                            <p class="text-xs font-medium text-[#1d1d1d] text-opacity-50">In a blink <br> of an eye</p>
                            <i class="fa-solid fa-star text-xl text-[#eded4a]"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative z-0 w-full flex justify-end">
                <img :src="carImg" alt="" class="h-[550px] rounded-3xl max-[1020px]:h-[450px]"/>
            </div>
        </div>
    </div>
</template>