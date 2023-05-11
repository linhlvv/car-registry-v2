<script setup>
import { onMounted, ref, watch } from 'vue';
import AccountCard from './AccountCard.vue';
import AccountManagementRootRow from './AccountManagementRootRow.vue';
import { useAccountStore } from '../../stores/AccountStore';

const props = defineProps(['isRefetched'])
const emit = defineEmits(['openModificationModal', 'stopRefetch'])

const accountStore = useAccountStore()

const openModModal = () => {
    emit('openModificationModal')
}

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
    const res = await fetch(`http://localhost:1111/centre/all`, {
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
    accountList.value = [...dataFetched.data]
    console.log(`centers: ${JSON.stringify(accountList.value)}`);
    loading.value = false
};

onMounted(() => {
    fetchAvailableCenters()
});

watch(() => props.isRefetched, (newStatus, oldStatus) => {
    if(newStatus) {
        fetchAvailableCenters()
    }
});

</script>

<template>
    <div class="flex flex-col items-center w-3/4">
        <AccountManagementRootRow />
        <div class="mb-8 w-full">
            <div class=" flex flex-col gap-[6px] items-center w-full">
                <div v-for="item in accountList" :key="item.id" class="w-full">
                    <AccountCard :item="item" @open-modification-modal="openModModal"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>