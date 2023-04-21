<script setup>
import { ref } from 'vue';
import AccountCard from './AccountCard.vue';
import AccountManagementRootRow from './AccountManagementRootRow.vue';
import { useAccountStore } from '../../stores/AccountStore';

const accountStore = useAccountStore()

const accountList = ref([
    {id: 1, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 2, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 3, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 4, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 5, email: 'tuandeptrai@gmail.com', password: '123456'},
]);
const loading = ref(false)

const fetchAvailableCenters = async () => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/view-all-centres`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    accountList.value = [...dataFetched]
    console.log(`centers: ${JSON.stringify(accountList.value)}`);
    loading.value = false
};

fetchAvailableCenters()

</script>

<template>
    <div class="flex flex-col items-center w-3/4">
        <AccountManagementRootRow />
        <div class="mb-8 w-full">
            <div class=" flex flex-col gap-[6px] items-center w-full">
                <div v-for="item in accountList" :key="item.id" class="w-full">
                    <AccountCard :item="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
    @media screen and (max-width: 640px) {
        .item {
            flex-direction: column;
        }
    }
</style>