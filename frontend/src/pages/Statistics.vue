<script setup>
import StatisticChart from '../components/statistics/StatisticChart.vue';
import StatisticTable from '../components/statistics/StatisticTable.vue';
import CertInfoModal from '../components/modal/CertInfoModal.vue';
import { ref, watch } from 'vue';

const time = ref({
    year: 'All', quarter: 'All', month: 'All'
});

const handleTimeChange = (timeValue) => {
    time.value = timeValue
};

const scrollUp = () => {
    document.documentElement.scrollTop = screen.height/5
};

const chart = ref(null);

const modalOn = ref(false)

const openCertInfoModal = (license) => {
    modalOn.value = true
    console.log(license);
};

const closeModal = () => {
    modalOn.value = false
};

</script>

<template>
    <div class="w-full">
        <div v-if="modalOn">
            <CertInfoModal @exit-modal="closeModal"/>
        </div>
        <div class="w-full flex items-center flex-col gap-5 py-5 relative z-0">
            <StatisticTable :time="time" @selected-time-clicked="handleTimeChange" @openCertInfoModal="openCertInfoModal"/>
            <Transition name="slide-fade">
                <div ref="chart" class="w-full flex justify-center" v-if="time.year !== 'All'">
                    <StatisticChart :year="parseInt(time.year)"/>
                </div>
            </Transition>
            <!-- <div v-if="time.year !== 'All'" class="absolute ml-[86vw] mt-[150vh] w-fit h-fit">
                <svg @click="scrollUp" xmlns="http://www.w3.org/2000/svg" fill="#e3fff6" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-10 h-10  cursor-pointer absolute z-10 animate-bounce text-[#2acc97]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div> -->
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>