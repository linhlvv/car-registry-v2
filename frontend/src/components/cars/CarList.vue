<script setup>
import RootRow from './RootRow.vue';
import { watch, ref } from 'vue';
import { useAccountStore } from '../../stores/AccountStore';
import CarCard from './CarCard.vue';

const accountStore = useAccountStore();

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

const openCarInfo = (license) => {
    emit('openCarInfo', license);
};
const openCarRegistration = () => {
    emit('openCarRegistration');
}

const list = ref([]);
const loading = ref(false)

const fetchCarData = async() => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/vehicles/${props.carType}`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({page: props.pageNumber, resPerPage: 7}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car list: ${JSON.stringify(dataFetched.data)}`);
    list.value = dataFetched.data
    loading.value = false
}
fetchCarData()

// page number watcher
watch(() => props.pageNumber, async(newPageNumber, oldPageNumber) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newPageNumber !== oldPageNumber) {
        console.log(`page number of carlist has changed to: ${props.pageNumber}`);
    }
    fetchCarData()
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

// car type
watch(() => props.carType, async(newCarType, oldCarType) => {
    if(newCarType !== oldCarType) {
        console.log('car type changed');
    }
    fetchCarData()
});



</script>

<template>
    <div class="w-full flex flex-col">
        <RootRow :carType="props.carType"/>
        <div class="flex flex-col items-center w-full" style="{overflow-wrap: 'anywhere';}">
            <!-- <div>{{ props.pageNumber }}</div> -->
            <div v-if="loading" class="font-bold text-base w-full text-center flex items-center justify-center bg-[#2acc97] text-white py-4">
                Loading
            </div>
            <div v-else v-for="car in list" :key="car.licensePlate" class="w-full">
                <CarCard
                    @openInfo="openCarInfo"
                    @regist="openCarRegistration"
                    :car="car"
                    :carTypeSelection="props.carType"
                    :loading="loading"
                />
            </div>
        </div>
    </div>
</template>