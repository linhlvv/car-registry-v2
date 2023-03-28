<script setup>
import CarInfoModal from '../components/modal/CarInfoModal.vue';
import RegistrationFormModal from '../components/modal/RegistrationFormModal.vue';
import RootRow from '../components/cars/RootRow.vue';
import CarList from '../components/cars/CarList.vue';
import SearchField from '../components/cars/SearchField.vue';
import { ref } from 'vue';

const carDetailModal = ref(false);
const openCarInfo = () => {
    carDetailModal.value = true
};

const registrationModal = ref(false);
const openCarRegistration = () => {
    registrationModal.value = true
};

const turnOffModal = () => {
    carDetailModal.value = false
    registrationModal.value = false
};
</script>

<template>
    <div>
        <div v-if="carDetailModal">
            <CarInfoModal @exit-modal="turnOffModal"/>
        </div>
        <div v-if="registrationModal">
            <RegistrationFormModal @exit-modal="turnOffModal"/>
        </div>
        <div class="my-6">
            <div class="flex justify-center">
                <div class="flex items-center flex-col w-[80vw] custom-shadow rounded-2xl overflow-hidden">
                    <SearchField />
                    <CarList @openCarInfo="openCarInfo" @openCarRegistration="openCarRegistration"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-shadow {
        box-shadow: -5px 8px 8px #ebecf0;
    }
</style>