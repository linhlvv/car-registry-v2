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
const openCarRegistration = (license) => {
    emit('openCarRegistration', license);
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
    // console.log(`car list: ${JSON.stringify(dataFetched.data)}`);
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
            <div v-if="loading" class="font-bold text-base w-full text-center flex items-center justify-center h-[300px] bg-white text-[#2acc97] py-4">
                <button type="button" class="py-4 rounded-md flex items-center text-white text-xl font-semibold" disabled>
                    <svg class="animate-spin h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4335 4335" version="1.1">
                        <path fill="#2acc97" d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                    </svg>
                </button>
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