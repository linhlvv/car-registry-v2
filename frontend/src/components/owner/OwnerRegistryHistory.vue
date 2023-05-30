<script setup>
import { ref } from 'vue';
import OwnerCarsNav from './OwnerValidNav.vue';
import OwnerRegistryCard from './OwnerRegistryCard.vue';
import { useAccountStore } from '../../stores/AccountStore';
import { useRoute } from "vue-router";

const props = defineProps(['id']);
const isAdmin = localStorage.getItem('userType') == 1

const registedTag = ref(true);
const changeTagHandler = (value) => {
    registedTag.value = value
};

const registedList = ref([]);
const expiredList = ref([]);

const fetchOwnerRegistryHistory = async () => {
    let fetchRoute
    if (isAdmin) {
        fetchRoute = `http://localhost:1111/owner/admin/history`
    } else {
        fetchRoute = `http://localhost:1111/owner/history`
    }
    const res = await fetch(fetchRoute, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ownerid: props.id }),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(JSON.stringify(dataFetched));
    registedList.value = dataFetched.registed
    expiredList.value = dataFetched.expired
};
fetchOwnerRegistryHistory()


</script>

<template>
    <div class="w-full flex flex-col gap-3">
        <div class="w-full flex items-center justify-between">
            <div class="w-1/4 text-3xl font-medium flex items-center text-[#1d1d1d] text-opacity-60">
                Owner registries
            </div>
            <hr class="border-[1.25px] w-3/4 border-[#1d1d1d] border-opacity-10">
        </div>
        <OwnerCarsNav @change-tag="changeTagHandler" :registed-tag="registedTag"/>
        <!-- <div>{{ registedTag }}</div> -->
        <div id="table" class="flex flex-col w-full gap-[2px] overflow-x-scroll">
            <OwnerRegistryCard :is-root-row="true" license-plate="License plate" name="Name"/>
            <div v-if="registedTag && registedList.length > 0" v-for="card in registedList" :key="card.licensePlate" class="w-full">
                <OwnerRegistryCard :is-root-row="false" :license-plate="card.license" :name="`${card.brand} ${card.model} ${card.version}`" :regist-date="card.registryDate" :expired-date="card.expire" :center="card.name"/>
            </div>
            <div v-else-if="registedTag && registedList.length === 0" class="slide-fade p-2 text-[#f5604c] text-base font-semibold w-full items-center justify-center text-center">
                No valid car available
            </div>
            <div v-if="!registedTag && expiredList.length > 0" v-for="card in expiredList" :key="card.licensePlate" class="w-full">
                <OwnerRegistryCard :is-root-row="false" :license-plate="card.license" :name="`${card.brand} ${card.model} ${card.version}`" :regist-date="card.registryDate" :expired-date="card.expire" :center="card.name"/>
            </div>
            <div v-else-if="!registedTag && expiredList.length === 0" class="slide-fade p-2 text-[#f5604c] text-base font-semibold w-full items-center justify-center text-center">
                No invalid car available
            </div>
        </div>
    </div>
</template>

<style scoped>
    .slide-fade {
        animation: slide-fade 0.5s;
    }

    @keyframes slide-fade {
        from {
            opacity: 0;
            transform: translateX(1rem);
        }
        to {
            opacity: 1;
            transform: translateX(0rem);
        }
    }

    #table::-webkit-scrollbar {
        height: 6px;
    }
    
    #table::-webkit-scrollbar-track {
        border-radius: 12px;
    }
    
    #table::-webkit-scrollbar-thumb {
        background-color: #2acc97;
        outline: none;
        border-radius: 12px;
    }
    #table::-webkit-scrollbar-thumb:hover {
        background-color: #0ce29b;
    }
</style>