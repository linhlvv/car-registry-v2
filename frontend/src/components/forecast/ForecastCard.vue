<script setup>
import { useAccountStore } from '../../stores/AccountStore';

const accountStore = useAccountStore()

defineProps({
    isRootRow: Boolean,
    info: Object,
});

const emit = defineEmits(['openInfo', 'regist']);

const openInfo = (license) => {
    emit('openInfo', license)
};

const regist = (license) => {
    emit('regist', license)
};

</script>

<template>
    <div class="w-full rounded-[3px] p-2 flex items-center min-w-[800px] min-h-[50px]" :class="isRootRow ? '' : 'bg-white group relative'">
        <svg v-if="!isRootRow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-[#2acc97] absolute transition-transform duration-200 -translate-x-7 group-hover:translate-x-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <p class="text-center font-medium text-[#1d1d1d] w-1/5" :class="isRootRow ? 'text-[14px]' : 'text-[12px]'">
            {{ isRootRow ? 'License ID' : info.licenseId }}
        </p>
        <p class="text-left font-medium text-[#1d1d1d] w-[35%]" :class="isRootRow ? 'text-[14px]' : 'text-[12px]'">
            {{ isRootRow ? 'Car' : `${info.brand} ${info.model} ${info.version}` }}
        </p>
        <p class="text-center font-medium text-[#1d1d1d] w-1/5" :class="isRootRow ? 'text-[14px]' : 'text-[12px]'">
            {{ isRootRow ? 'Expired date' : info.expire }}
        </p>
        <div v-if="!isRootRow" class="w-1/4 flex justify-evenly">
            <button class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white" @click="openInfo(info.licenseId)">
                <i class="fa-solid fa-circle-info flex items-center text-[12px]"></i>
                <div class="font-semibold">Detail</div>
            </button>
            <button v-if="!accountStore.isAdmin" class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white" @click="regist(info.licenseId)">
                <i class="fa-sharp fa-solid fa-registered flex items-center text-[12px]"></i>
                <div class="font-semibold">Regist</div>
            </button>
        </div>
    </div>
</template>