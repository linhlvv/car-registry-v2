<script setup>
import CarCard from './CarCard.vue';

const emit = defineEmits(['openCarInfo', 'openCarRegistration']);
const openCarInfo = () => {
    emit('openCarInfo');
};
const openCarRegistration = () => {
    emit('openCarRegistration');
}

const list = [
    {name: 'Mercedes G63', licensePlate: '29-F1 61589', owner: 'Tran Ha Phuong', city: 'Ha Noi', valid: true},
    {name: 'Mercedes GLC', licensePlate: '29-F1 61589', owner: 'Vu Minh Tuan', city: 'Ho Chi Minh', valid: false},
    {name: 'RollRoyce Phantom', licensePlate: '29-F1 61589', owner: 'Le Viet Viet Linh', city: 'Thanh Hoa', valid: true},
    {name: 'Bentley Continental', licensePlate: '29-F1 61589', owner: 'Hoang Thai Quang', city: 'Vinh', valid: false},
    {name: 'Kia Morning', licensePlate: '29-F1 61589', owner: 'Vu Minh Tuan', city: 'Ha Tinh', valid: true},
    {name: 'Lamborghini Aventador', licensePlate: '29-F1 61589', owner: 'Vu Minh Tuan', city: 'Yen Bai', valid: true},
    {name: 'Mercedes Maybach S600', licensePlate: '29-F1 61589', owner: 'Tran Ha Phuong', city: 'Nghe An', valid: false},
];


</script>

<template>
    <div class="flex flex-col items-center w-full" style="{overflow-wrap: 'anywhere';}">
        <div v-for="car in list" :key="car.licensePlate" class="w-full">
            <CarCard
                @openInfo="openCarInfo"
                @regist="openCarRegistration"
                :car="car"
            />
        </div>
    </div>
</template>