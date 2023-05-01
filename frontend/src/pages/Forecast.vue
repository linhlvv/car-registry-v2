<script setup>
import Pagination from '../components/forecast/Pagination.vue';
import ForecastCard from '../components/forecast/ForecastCard.vue';
import { onMounted, ref } from 'vue';
import { useAccountStore } from '../stores/AccountStore';

const accountStore = useAccountStore()

//SECTION - pagination
const pageNumber = ref(1);
const totalPage = ref(2);

const navigateToSpecificPage = (page) => {
    pageNumber.value = page
}

const navigatePageWithDirection = (direction) => {
    if(direction === 'left') {
        if(pageNumber.value > 1) {
            pageNumber.value -= 1;
        }
    } else {
        if(pageNumber.value < totalPage.value) {
            pageNumber.value += 1;
        }
    }
}


//SECTION - data fetcher
const forecastList = ref();
const fetchForecastList = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {
        
    } else {
        fetchRoute = 'http://localhost:1111/forecast'
        fetchBody = {
            resPerPage: 7,
            page: pageNumber.value
        }
    }
    const res = await fetch(fetchRoute, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(fetchBody)
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(`forecast list: ${JSON.stringify(dataFetched)}`);
};

onMounted(() => {
    fetchForecastList()
});

</script>

<template>
    <div>
        <div class="my-6">
            <div class="flex justify-center">
                <div class="flex items-center flex-col w-[90vw]">
                    <div class="w-full">
                        <ForecastCard />
                    </div>
                    <Pagination 
                        :total-page="2" 
                        :current-page="pageNumber"
                        @pageClicked="navigateToSpecificPage"
                        @navigatePage="navigatePageWithDirection"
                    />
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