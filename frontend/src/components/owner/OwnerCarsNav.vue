<script setup>
const props = defineProps(['registedTag']);
const emit = defineEmits(['changeTag']);

const changeTag = (value) => {
    emit('changeTag', value)
};
</script>

<template>
    <div class="w-full flex">
        <div @click="changeTag(true)" :class="registedTag ? 'border-[#2acc97] text-[#2acc97] duration-200' : ''" class="w-1/5 p-2 flex items-center justify-center text-center text-sx font-semibold border-b-[1.5px] border-[#1d1d1d] border-opacity-50 cursor-pointer hover:text-[#2acc97]">
            Registed
        </div>
        <div @click="changeTag(false)" :class="!registedTag ? 'border-[#2acc97] text-[#2acc97] duration-200' : ''" class="w-1/5 p-2 flex items-center justify-center text-center text-sx font-semibold border-b-[1.5px] border-[#1d1d1d] border-opacity-50 cursor-pointer hover:text-[#2acc97]">
            Expired
        </div>
        <div class="w-3/5 p-2 border-b-[1.5px] border-[#1d1d1d] border-opacity-50">
            
        </div>
    </div>
</template>