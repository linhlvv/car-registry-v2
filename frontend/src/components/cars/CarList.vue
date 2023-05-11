<script setup>
import RootRow from './RootRow.vue';
import { watch, ref } from 'vue';
import { useAccountStore } from '../../stores/AccountStore';
import CarCard from './CarCard.vue';

const accountStore = useAccountStore();

const emit = defineEmits(['openCarInfo', 'openCarRegistration', 'totalPageNum']);
const props = defineProps([
    'pageNumber',
    'filter',
    'city',
    'brand',
    'owner',
    'time',
    'carType',
    'sortOrder',
    'specificLicense',
    'reloaded'
])

//SECTION - open car information modal
const openCarInfo = (license) => {
    emit('openCarInfo', license);
};

//SECTION - open car registration modal
const openCarRegistration = (license) => {
    emit('openCarRegistration', license);
}

//SECTION - send total page number to cars.vue
const postTotalPage = () => {
    emit('totalPageNum', totalPage.value)
}

const list = ref([]);
const totalPage = ref()
const loading = ref(false)

//SECTION - fetch default car data
//TODO
const fetchCarData = async() => {
    loading.value = true
    let fetchRoute = `http://localhost:1111/vehicles/${props.carType}`;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    const res = await fetch(fetchRoute, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({page: props.pageNumber, resPerPage: 7}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car list: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.data
    totalPage.value = dataFetched.count
    postTotalPage()
    loading.value = false
}
fetchCarData()

//SECTION - fetch data of all cars by corresponding owner code
//TODO
const fetchCarByOwnerCode = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    loading.value = true
    const res = await fetch(`http://localhost:1111/filter/owner`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({carType: props.carType, code: props.owner}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`owner cars: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.data
    totalPage.value = 1
    postTotalPage()
    loading.value = false
}

//SECTION - sort cars by brand
// logic - all brands
//TODO
const fetchDataSortedByBrand = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    loading.value = true
    const res = await fetch(`http://localhost:1111/filter/brand`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(
            {
                resPerPage: 7,
                page: props.pageNumber,
                carType: props.carType,
                order: props.sortOrder,
            }
        ),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    // console.log(`cars by brands: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.data
    totalPage.value = dataFetched.count
    postTotalPage()
    loading.value = false
}

// logic - specific brand
//TODO
const fetchCarDataWithSpecificBrand = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    loading.value = true
    const res = await fetch(`http://localhost:1111/filter/brand/exact`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(
            {
                resPerPage: 7,
                page: props.pageNumber,
                carType: props.carType,
                brand: props.brand,
            }
        ),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car brand: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.data
    totalPage.value = dataFetched.count
    postTotalPage()
    loading.value = false
}

// logic - specific time
//TODO remember to add order
const fetchCarDataWithSpecificTime = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    loading.value = true
    const res = await fetch(`http://localhost:1111/filter/time`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(
            {
                resPerPage: 7,
                page: props.pageNumber,
                carType: props.carType,
                year: props.time.year,
                quarter: props.time.quarter,
                month: props.time.month,
                order: 'desc'
            }
        ),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car time: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.data
    totalPage.value = dataFetched.count
    postTotalPage()
    loading.value = false
}

// logic - specific city
//TODO
const fetchCarDataWithSpecificCity = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    loading.value = true
    const res = await fetch(`http://localhost:1111/filter/city/exact`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(
            {
                resPerPage: 7,
                page: props.pageNumber,
                carType: props.carType,
                city: props.city
            }
        ),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car brand: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.data
    totalPage.value = dataFetched.count
    postTotalPage()
    loading.value = false
}

// logic - specific license
//TODO
const fetchCarByLicense = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {

    } else {

    }
    loading.value = true
    const res = await fetch(`http://localhost:1111/vehicles/find`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(
            {
                license: props.specificLicense,
                carType: props.carType,
            }
        ),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`car license: ${JSON.stringify(dataFetched)}`);
    list.value = dataFetched.car
    console.log(`car license: ${JSON.stringify(list.value)}`);
    // totalPage.value = 1
    loading.value = false
}

//SECTION - watchers
// logic - page number watcher
watch(() => props.pageNumber, async(newPageNumber, oldPageNumber) => {
    console.log(`page number of carlist has changed to: ${props.pageNumber}`);
        
    if(props.filter === 'No filter') {
        fetchCarData()
    }
    if(props.filter === 'Owner' && props.owner === '') {
        fetchCarData()
    }
    if(props.filter === 'Brand' && props.brand === 'All') {
        fetchDataSortedByBrand()
    } else if(props.filter === 'Brand' && props.brand !== 'All') {
        fetchCarDataWithSpecificBrand()
    }
    if(props.filter === 'Time') {
        console.log(props.pageNumber);
        fetchCarDataWithSpecificTime()
    }
    if(props.filter === 'City' && props.city !== 'All') {
        fetchCarDataWithSpecificCity()
    } else if(props.filter === 'City' && props.city === 'All') {
        fetchCarData()
    }
});

// logic - general filter watcher
watch(() => props.filter, async(newFilter, oldFilter) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newFilter !== oldFilter) {
        console.log(`filter has changed to: ${props.filter}`);
        if(newFilter === 'No filter' || newFilter === 'Owner') {
            fetchCarData()
        }
        if(newFilter === 'Brand') {
            fetchDataSortedByBrand()
        }
        if(newFilter === 'Time') {
            fetchCarDataWithSpecificTime()
        }
    }
    
});

// logic - city watcher
watch(() => props.city, async(newCity, oldCity) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newCity !== oldCity) {
        console.log(`city has changed to: ${props.city}`);
        if(newCity === 'All') {
            fetchCarData()
        } else {
            fetchCarDataWithSpecificCity()
        }
    }
});


// logic - brand sort order watcher
watch(() => props.sortOrder, async(newOrder, oldOrder) => {
    if(newOrder !== oldOrder) {
        if(props.filter === 'Brand') {
            fetchDataSortedByBrand()
        }
    }
})

// logic - brand watcher
watch(() => props.brand, async(newBrand, oldBrand) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newBrand !== oldBrand) {
        console.log(`brand has changed to: ${props.brand}`);
        if(newBrand === 'All') {
            fetchDataSortedByBrand()
        } else {
            fetchCarDataWithSpecificBrand()
        }
    }
});

// logic - owner watcher
watch(() => props.owner, async(newOwner, oldOwner) => {
    // console.log(props.pageNumber, newPageNumber, oldPageNumber);
    if(newOwner !== oldOwner) {
        console.log(`owner has changed to: ${props.owner}`);
        fetchCarByOwnerCode()
    } 
});

// logic - time watcher
watch(() => props.time, async(newTime, oldTime) => {
    if(newTime.year !== oldTime.year || newTime.month !== oldTime.month || newTime.quarter !== oldTime.quarter) {
        console.log(`time has changed to: ${JSON.stringify(props.time)}`);
        fetchCarDataWithSpecificTime()
    }
});

// logic - car type watcher
watch(() => props.carType, async(newCarType, oldCarType) => {
    if(newCarType !== oldCarType) {
        console.log('car type changed');
        fetchCarData()
    }
    
});

// logic - license id watcher
watch(() => props.specificLicense, async(newLicense, oldLicense) => {
    if(newLicense !== oldLicense) {
        console.log(`license: ${newLicense}`);
        fetchCarByLicense()
    }
});

// logic - reload watcher
watch(() => props.reloaded, async(newReloaded, oldReloaded) => {
    console.log(newReloaded, oldReloaded);
    if(newReloaded !== oldReloaded) {
        console.log(newReloaded);
        fetchCarData()
    }
});
</script>

<template>
    <div class="w-full flex flex-col">
        <RootRow :carType="props.carType"/>
        <!-- <div>{{ reloaded }}</div> -->
        <div class="flex flex-col items-center w-full" style="{overflow-wrap: 'anywhere';}">
            <div v-if="loading" class="font-bold text-base w-full text-center flex items-center justify-center h-[350px] bg-white text-[#2acc97] py-4">
                <button type="button" class="py-4 rounded-md flex items-center text-white text-xl font-semibold" disabled>
                    <svg class="animate-spin h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4335 4335" version="1.1">
                        <path fill="#2acc97" d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                    </svg>
                </button>
            </div>
            <div v-else-if="!loading && list.length !== 0" v-for="car in list" :key="car.licensePlate" class="w-full">
                <CarCard
                    @openInfo="openCarInfo"
                    @regist="openCarRegistration"
                    :car="car"
                    :carTypeSelection="props.carType"
                    :loading="loading"
                />
            </div>
            <div v-else-if="!loading && list.length === 0" class="w-full bg-white flex items-center justify-center text-center text-xl font-semibold py-4 text-[#f5604c]">
                No results found!
            </div>
        </div>
    </div>
</template>