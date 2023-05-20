<script setup>
import { onMounted, ref, watch } from 'vue';
import AccountCard from './AccountCard.vue';
import AccountManagementRootRow from './AccountManagementRootRow.vue';
import { useAccountStore } from '../../stores/AccountStore';

const props = defineProps(['isRefetched'])
const emit = defineEmits(['openModificationModal', 'stopRefetch', 'bindId'])

const openModModal = (item) => {
    emit('openModificationModal', item)
}

const accountList = ref([]);
const loading = ref(false)

const fetchAvailableCenters = async () => {
    loading.value = true
    const res = await fetch(`http://localhost:1111/centre/all`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
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
    <div id="table" class="flex flex-col items-center w-3/4 overflow-x-scroll mb-8">
        <div class="w-full mb-1">
            <div class=" flex flex-col-reverse gap-[6px] items-center w-full">
                <div v-for="item in accountList" :key="item.id" class="w-full">
                    <AccountCard :item="item" @open-modification-modal="openModModal"/>
                </div>
                <div class="w-full">
                    <AccountManagementRootRow />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #table::-webkit-scrollbar {
        height: 7px;
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