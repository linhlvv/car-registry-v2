<script setup>
const props = defineProps(['car', 'isRootRow']);
const emit = defineEmits(['openInfo'])

const openInfo = () => {
    // console.log(props.car.id);
    emit('openInfo', props.car.id)
};
</script>

<template>
    <div class="p-2 flex w-full mt-[2px]" :class="isRootRow ? 'bg-[#f5f7fb] h-9' : 'bg-white min-h-[50px]'">
        <div class="max-[736px]:w-[28%] font-semibold text-[#616367] flex justify-center items-center w-[14%]" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
            {{ isRootRow ? 'License' : car.licenseId }}
        </div>
        <div class="max-[736px]:w-[36%] font-semibold text-[#616367] flex items-center w-[22%]" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
            {{ isRootRow ? 'Name' : `${car.brand} ${car.model} ${car.version}` }}
        </div>

        <div class="w-[26%] flex items-center max-[736px]:hidden">
            <div class="max-[736px]:hidden font-semibold text-[#616367] flex justify-center items-center w-1/2" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
                {{ isRootRow ? 'Regist date' : car.date}}
            </div>
            <div class="max-[736px]:hidden font-semibold text-[#616367] flex justify-center items-center w-1/2" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
                {{ isRootRow ? 'Expired date' : car.expire}}
            </div>
        </div>

        <div v-if="isRootRow" class="font-semibold text-[#616367] flex text-center justify-center items-center w-[6%]" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
            Valid
        </div>

        <div v-else class="font-semibold text-[#616367] flex text-center justify-center items-center w-[6%]" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
            <i v-if="car.status === 0" class="fa-solid fa-circle-check text-[11px] text-[#2acc97]"></i>
            <i v-else class="fa-solid fa-circle-xmark text-[11px] text-[#cc552a]"></i>
        </div>

        <div class="font-semibold text-[#616367] flex text-right justify-end items-center w-[22%]" :class="isRootRow ? 'text-[12px] max-[900px]:text-[11px]' : 'text-[11px] max-[900px]:text-[10px]'">
            {{ isRootRow ? 'Center' : car.name}}
        </div>

        <div v-if="!isRootRow" class="flex items-center w-[10%] justify-center">
            <div class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-2 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1" @click="openInfo">
                <i class="fa-solid fa-circle-info flex items-center text-[12px] max-[952px]:hidden max-[820px]:flex"></i>
                <div class="max-[820px]:hidden font-semibold">Detail</div>
            </div>
        </div>
    </div>
</template>