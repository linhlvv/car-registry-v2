<script setup>
import StatisticChart from '../components/statistics/StatisticChart.vue';
import StatisticTable from '../components/statistics/StatisticTable.vue';
import CertInfoModal from '../components/modal/CertInfoModal.vue';
import NoSpecificSelect from '../components/UI/NoSpecificSelect.vue';
import { useAdminSelectionStore } from '../stores/AdminSelectionStore';
import { ref, watch } from 'vue';

const adminSelectionStore = useAdminSelectionStore()

const time = ref({
    year: 'All', quarter: 'All', month: 'All'
});

const handleTimeChange = (timeValue) => {
    time.value = timeValue
};

const chart = ref(null);

//SECTION - cert modal handler
const modalOn = ref(false)
const certId = ref(null)

const openCertInfoModal = (id) => {
    modalOn.value = true
    console.log(id);
    certId.value = id
};

const closeModal = () => {
    modalOn.value = false
};

</script>

<template>
    <div class="w-full">
        <Transition name="fade" mode="out-in">
            <div v-if="!adminSelectionStore.getVerified" class="w-full flex items-center">
                <NoSpecificSelect />
            </div>
            <div v-else class="w-full">
                <div v-if="modalOn">
                    <CertInfoModal :cert-id="certId" @exit-modal="closeModal"/>
                </div>
                <div class="w-full flex items-center flex-col gap-5 py-5">
                    <StatisticTable :time="time" @selected-time-clicked="handleTimeChange" @openCertInfoModal="openCertInfoModal"/>
                    <Transition name="slide-fade">
                        <div ref="chart" class="w-full flex justify-center" v-if="time.year !== 'All'">
                            <StatisticChart :year="parseInt(time.year)"/>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>


.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

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