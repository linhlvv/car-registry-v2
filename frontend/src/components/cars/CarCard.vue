<script setup>
const props = defineProps(['car', 'carTypeSelection', 'loading']);

const emit = defineEmits(['openInfo', 'regist']);
const openInfo = () => {
    emit('openInfo', props.car.license)
};
const regist = () => {
    emit('regist', props.car.license)
};

</script>

<template>
    <div class="bg-white p-2 flex w-full mt-[2px] min-h-[50px]">
        <div class="max-[736px]:w-[28%] font-semibold text-[#616367] text-[11px] max-[900px]:text-[10px] flex justify-center items-center w-[14%]">
            {{ car.license }}
        </div>
        <div class="max-[736px]:w-[36%] font-semibold text-[#616367] text-[11px] max-[900px]:text-[10px] flex items-center w-[22%]">
            {{ car.brand }} {{ car.model }} {{ car.version }}
        </div>

        <div v-if="carTypeSelection === 'registed'" class="w-[26%] flex items-center max-[736px]:hidden">
            <div class="max-[736px]:hidden font-semibold text-[#616367] text-[11px] max-[900px]:text-[10px] flex justify-center items-center w-1/2">
                {{ car.registryDate }}
            </div>
            <div class="max-[736px]:hidden font-semibold text-[#616367] text-[11px] max-[900px]:text-[10px] flex justify-center items-center w-1/2">
                {{ car.expire }}
            </div>
        </div>
        <div v-else class="max-[736px]:hidden font-bold text-[11px] max-[900px]:text-[10px] flex justify-center items-center w-[26%]">
            <div class="max-[736px]:hidden font-semibold text-[#616367] text-[11px] max-[900px]:text-[10px] flex justify-center items-center w-full">
                {{ car.expire }}
            </div>
        </div>

        <div class="font-semibold text-[#616367] text-[11px] max-[900px]:text-[10px] flex text-right justify-end items-center w-[17%]">
            {{ car.name }}
        </div>
        <div class="flex items-center w-[21%] justify-evenly max-[820px]:justify-center max-[820px]:gap-4">
            <div class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1" @click="openInfo">
                <i class="fa-solid fa-circle-info flex items-center text-[12px] max-[952px]:hidden max-[820px]:flex"></i>
                <div class="max-[820px]:hidden font-semibold">Detail</div>
            </div>
            <div class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1" @click="regist">
                <i class="fa-sharp fa-solid fa-registered flex items-center text-[12px] max-[952px]:hidden max-[820px]:flex"></i>
                <div class="max-[820px]:hidden font-semibold">Regist</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>