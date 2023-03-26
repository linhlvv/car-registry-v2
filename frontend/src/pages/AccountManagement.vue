<script setup>
import AddAccountForm from '../components/account/AddAccountForm.vue';
import AccountList from '../components/account/AccountList.vue';
</script>

<template>
    <div>
        <div class="flex flex-col items-center pt-4 mb-6">
            <AddAccountForm />
        </div>
        <div class="flex flex-col items-center">
            <AccountList />
        </div>
    </div>
</template>

<style scoped>
    
</style>