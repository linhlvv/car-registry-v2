<script setup>
import AccountCard from './AccountCard.vue';
import AccountManagementRootRow from './AccountManagementRootRow.vue';

const accountList = [
    {id: 1, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 2, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 3, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 4, email: 'tuandeptrai@gmail.com', password: '123456'},
    {id: 5, email: 'tuandeptrai@gmail.com', password: '123456'},
];
</script>

<template>
    <div class="flex flex-col items-center">
        <AccountManagementRootRow />
        <div class="mb-8">
            <div class=" flex flex-col gap-[6px] items-center">
                <div v-for="item in accountList" :key="item.id">
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