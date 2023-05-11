<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="w-full flex flex-col items-center text-base font-medium text-justify px-[30px]">
        
        <p class="text-left text-white font-semibold w-full text-[26px] uppercase px-2 py-4 bg-[#2acc97] mt-4 mb-2 rounded-[4px]">
            Brief introduction
        </p>
        <div class="w-full flex flex-col gap-2 duration-300 transition-all h-fit">
            <p class="font-semibold">
                The Vietnam Register (VR) is an organization directly under the Ministry of Transport, performing the function of state management of registration.
            </p>
            <p>
                ​Vietnam Register (VR) is an organization directly under the Ministry of Transport, performing the function of state management of registration of traffic vehicles and vehicles and equipment for ranking and testing. specialized tools, containers, boilers and pressure vessels used in road, railway, inland waterway and maritime transportation nationwide; organize the registration of technical safety and quality of all kinds of vehicles, transportation equipment and means of transport, equipment for oil and gas exploration, extraction and transportation at sea according to the provisions of law.
            </p>
            <p>
                The Vietnam Register has 24 Sub-Departments that carry out technical inspection of safety of watercraft and marine structures; there is a system of 140 centers/stations for technical inspection of road motor vehicle safety.
            </p>
            <p>
                Vietnam Register is a member of the Association of Asian Registers (ACS), OTHK Organization, CITA and has a bilateral cooperation relationship with all members of the International IACS Classification on the basis of signed agreement.
            </p>
            <p>
                The Vietnam Register has about 1,300 officials and employees, including more than 1000 technical staff with college and university degrees, about 100 staff with university degrees.
            </p>
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