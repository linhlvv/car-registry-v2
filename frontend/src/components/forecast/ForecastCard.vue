<script setup>
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
    <div class="w-full rounded-[3px] p-2 flex items-center min-h-[50px]" :class="isRootRow ? '' : 'bg-white'">
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
            <div class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1" @click="openInfo">
                <i class="fa-solid fa-circle-info flex items-center text-[12px] max-[952px]:hidden"></i>
                <div class="font-semibold">Detail</div>
            </div>
            <div class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1" @click="regist">
                <i class="fa-sharp fa-solid fa-registered flex items-center text-[12px] max-[952px]:hidden"></i>
                <div class="font-semibold">Regist</div>
            </div>
        </div>
    </div>
</template>