<script setup>
import { onMounted, ref } from 'vue';
import bg from '../../assets/bg6.png'
import CategoryCard from './CategoryCard.vue';

const about = ref(null)
const terms = ref(null)
const services = ref(null)

const scrollToAbout = () => {
    document.documentElement.scrollTop = about.value.offsetTop
};

const scrollToTerms = () => {
    document.documentElement.scrollTop = terms.value.offsetTop
};

const scrollToServices = () => {
    document.documentElement.scrollTop = services.value.offsetTop
};

</script>

<template>
    <div class="w-full h-full flex flex-col items-center relative overflow-hidden">
        <div class=" w-full flex items-center justify-end pt-5 px-10">
            <div class="flex gap-5 text-lg text-white font-semibold">
                <button @click="scrollToAbout" class="relative inline-block after:contents-[''] after:w-full after:absolute after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 hover:after:origin-bottom-left">
                    About
                </button>
                <button @click="scrollToTerms" class="relative inline-block after:contents-[''] after:w-full after:absolute after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 hover:after:origin-bottom-left">
                    Terms
                </button>
                <button @click="scrollToServices" class="relative inline-block after:contents-[''] after:w-full after:absolute after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 hover:after:origin-bottom-left">
                    Services
                </button>
            </div>
        </div>
        <div class="w-full flex justify-around items-start px-10 max-lg:flex-col-reverse max-lg:items-center">
            <div class="lg:pt-40 text-white">
                <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold mb-5">
                    Take your car registry management experience to the next level.
                </p>
                <p class="text-[10px] md:text-xs lg:text-sm xl:text-base font-medium mb-4">
                    With this application, registry management can be much easier and enjoyable than ever with modern interface and extremely convenient functions.
                </p>
                <button @click="scrollToServices" class="flex items-center bg-[#2acc97]/80 hover:bg-[#2acc97] transition-all ease-in-out duration-200 px-3 py-3 gap-2 mb-10 font-semibold rounded-lg">
                    Get to work
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
                <div class="flex items-center gap-16 max-sm:hidden">
                    <div class="flex flex-col justify-around items-center h-32 w-28 border-2 rounded-2xl p-2 pb-3 bg-white shadow-sm">
                        <i class="fa-solid fa-check text-3xl text-[#eded4a]"></i>
                        <div class="text-center flex items-center text-base text-[#1d1d1d] text-opacity-90 font-semibold">Convenient</div>
                    </div>
                    <div class="flex flex-col justify-around items-center h-32 w-28 border-2 rounded-2xl p-2 pb-3 bg-white shadow-sm">
                        <i class="fa-solid fa-bolt-lightning text-3xl text-[#eded4a]"></i>
                        <div class="text-center flex items-center text-base text-[#1d1d1d] text-opacity-90 font-semibold">Fast</div>
                    </div>
                    <div class="flex flex-col justify-around items-center h-32 w-28 border-2 rounded-2xl p-2 pb-3 bg-white shadow-sm">
                        <i class="fa-solid fa-1 text-3xl text-[#eded4a]"></i>
                        <div class="text-center flex items-center text-base text-[#1d1d1d] text-opacity-90 font-semibold">SPA</div>
                    </div>
                </div>
            </div>
            <img :src="bg" alt="" class="transition-all duration-200 ease-in-out md:w-[450px] lg:w-[500px] xl:w-[600px] 2xl:w-[800px]"/>
        </div>
        <div class="w-[600%] absolute z-[-1] bottom-0 bg-[#93a3e6]/60 h-[200%] -translate-y-1/3 sm:-translate-y-[31%] md:-translate-y-1/3 lg:-translate-y-[36%] xl:-translate-y-[35%] rotate-[6deg] rounded-bl-xl"></div>
        <div ref="about" class="w-full px-10">
            <div class="w-full mt-24 py-10 px-5 rounded-lg bg-white border border-gray-100 hover:-translate-x-2 hover:-translate-y-2 hover:shadow-xl shadow transition-all duration-300 ease-in-out">
                <p class="text-center text-3xl font-semibold mb-5"><span class="text-[#2acc97] text-5xl">A</span>bout</p>
                <div class="font-medium text-sm text-justify">
                    <p class="font-semibold text-md ">
                        The Vietnam Register (VR) is an organization directly under the Ministry of Transport, performing the function of state management of registration.
                    </p>
                    <p class=" ">
                        ​Vietnam Register (VR) is an organization directly under the Ministry of Transport, performing the function of state management of registration of traffic vehicles and vehicles and equipment for ranking and testing. specialized tools, containers, boilers and pressure vessels used in road, railway, inland waterway and maritime transportation nationwide; organize the registration of technical safety and quality of all kinds of vehicles, transportation equipment and means of transport, equipment for oil and gas exploration, extraction and transportation at sea according to the provisions of law.
                    </p>
                    <p class=" ">
                        The Vietnam Register has 24 Sub-Departments that carry out technical inspection of safety of watercraft and marine structures; there is a system of 140 centers/stations for technical inspection of road motor vehicle safety.
                    </p>
                    <p class=" ">
                        The Vietnam Register has about 1,300 officials and employees, including more than 1000 technical staff with college and university degrees, about 100 staff with university degrees.
                    </p>
                </div>
            </div>
        </div>
        <div ref="terms" class="w-full pt-24 pb-10 px-10">
            <p class="text-center text-3xl font-semibold mb-8"><span class="text-[#2acc97] text-5xl">T</span>erms</p>
            <div class="grid grid-cols-4 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2">
                <div class="w-full flex flex-col bg-white items-center gap-4 py-10 shadow rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-8 h-8 p-1 bg-red-500/20 text-red-500 rounded-[50%]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-center">Do not violate the system</p>
                </div>
                <div class="w-full flex flex-col bg-white items-center gap-4 py-10 shadow rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-8 h-8 p-1 bg-red-500/20 text-red-500 rounded-[50%]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-center">Do not violate the system</p>
                </div>
                <div class="w-full flex flex-col bg-white items-center gap-4 py-10 shadow rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-8 h-8 p-1 bg-red-500/20 text-red-500 rounded-[50%]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-center">Do not violate the system</p>
                </div>
                <div class="w-full flex flex-col bg-white items-center gap-4 py-10 shadow rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-8 h-8 p-1 bg-red-500/20 text-red-500 rounded-[50%]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-center">Do not violate the system</p>
                </div>
            </div>
        </div>
        <div ref="services" class="w-full grid grid-cols-2 items-center pt-24  pb-10 bg-[#2acc97]/10 px-10">
            <div class="text-center p-20">
                <p class="text-3xl font-semibold text-left"><span class="text-[#2acc97] text-5xl">S</span>ervices</p>
                <p class="text-lg font-medium text-left">With these functions, management will be easier than ever</p>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-5">
                <CategoryCard icon="fa-solid fa-car" category="Cars" link="/cars" class="w-full"/>
                <CategoryCard icon="fa-solid fa-circle-plus" category="Regist" link="/regist-new-car" class="w-full"/>
                <CategoryCard icon="fa-solid fa-lightbulb" category="Forecast" link="/forecast" class="w-full"/> 
                <CategoryCard icon="fa-solid fa-chart-simple" category="Statistics" link="/statistics" class="w-full"/> 
                <CategoryCard icon="fa-sharp fa-solid fa-users" category="Account management" link="/account-management" class="w-full"/> 
                <CategoryCard icon="fa-sharp fa-solid fa-database" category="Manage database" link="/manage-database" class="w-full"/> 
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>