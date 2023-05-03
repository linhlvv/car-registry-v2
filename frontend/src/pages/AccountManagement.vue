<script setup>
import AddAccountForm from '../components/account/AddAccountForm.vue';
import AccountList from '../components/account/AccountList.vue';
import ModificationModal from '../components/account/ModificationModal.vue';
import { ref } from 'vue';

const centerInfo = ref({});

const modalOn = ref(false);

const openModal = () => {
    modalOn.value = true
}

const exitModal = () => {
    modalOn.value = false
};

</script>

<template>
    <div class="w-full flex flex-col gap-8">
        <div class="flex flex-col items-center pt-4 mb-6 w-full">
            <div class="flex items-center w-3/4 gap-4 px-1">
                <span class="text-3xl font-semibold text-[#2acc97] whitespace-nowrap">Add account form</span>
                <hr class="w-full border-[1.25px] border-slate-300">
            </div>
            <AddAccountForm />
        </div>
        <div class="flex flex-col items-center w-full">
            <div class="flex items-center w-3/4 gap-4 px-1 pb-2">
                <span class="text-3xl font-semibold text-[#2acc97] whitespace-nowrap">Available account list</span>
                <hr class="w-full border-[1.25px] border-slate-300">
            </div>
            <AccountList @open-modification-modal="openModal"/>
        </div>
        <div v-if="modalOn">
            <ModificationModal @exit="exitModal"/>
        </div>
    </div>
</template>

<style scoped>
    
</style>