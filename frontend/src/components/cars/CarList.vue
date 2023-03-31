<script setup>
import RootRow from './RootRow.vue';
import { watch, ref } from 'vue';
import CarCard from './CarCard.vue';

const emit = defineEmits(['openCarInfo', 'openCarRegistration']);
const props = defineProps([
    'pageNumber',
    'filter',
    'city',
    'brand',
    'owner',
    'time',
    'carType'
])

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
// page number watcher
watch(() => props.pageNumber, async(newPageNumber, oldPageNumber) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newPageNumber !== oldPageNumber) {
        console.log(`page number of carlist has changed to: ${props.pageNumber}`);
    }
});

// filter watcher
watch(() => props.filter, async(newFilter, oldFilter) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newFilter !== oldFilter) {
        console.log(`filter has changed to: ${props.filter}`);
    }
});

// city watcher
watch(() => props.city, async(newCity, oldCity) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newCity !== oldCity) {
        console.log(`city has changed to: ${props.city}`);
    }
});

// brand watcher
watch(() => props.brand, async(newBrand, oldBrand) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newBrand !== oldBrand) {
        console.log(`brand has changed to: ${props.brand}`);
    }
});

// owner watcher
watch(() => props.owner, async(newOwner, oldOwner) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newOwner !== oldOwner) {
        console.log(`owner has changed to: ${props.owner}`);
    }
});

// time
watch(() => props.time, async(newTime, oldTime) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newTime !== oldTime) {
        console.log(`time has changed to: ${props.time}`);
    }
});

watch(() => props.carType, async(newCarType, oldCarType) => {
    if(newCarType !== oldCarType) {
        console.log('car type changed');
    }
})

</script>

<template>
    <div class="w-full flex flex-col">
        <RootRow />
        <div class="flex flex-col items-center w-full" style="{overflow-wrap: 'anywhere';}">
            <!-- <div>{{ props.pageNumber }}</div> -->
            <div v-for="car in list" :key="car.licensePlate" class="w-full">
                <CarCard
                    @openInfo="openCarInfo"
                    @regist="openCarRegistration"
                    :car="car"
                />
            </div>
        </div>
    </div>
</template>