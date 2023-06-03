<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps(['data', 'modelValue'])
const emit = defineEmits(['bindSpecificSelect', 'update:modelValue'])

const cloneData = ref([])
const shownData = ref([])

const dropdownShown = ref(false);

onMounted(() => {
    cloneData.value = [...props.data]
    shownData.value = [...props.data]
});

watch(() => props.modelValue, () => {
    cloneData.value = cloneData.value.filter((item) => searchResult(item) === true)
    shownData.value = [...cloneData.value]
    cloneData.value = [...props.data]
});

watch(() => props.data, () => {
    cloneData.value = [...props.data]
    shownData.value = [...props.data]
})

const searchResult = (result) => {
    const textArr = props.modelValue.split(' ')
    for(let i = 0; i < textArr.length; i++) {
        if(result.match(new RegExp(textArr[i], 'i')) === null) {
            return false
        }
    }
    return true
};

const bindSpecificSelect = (item) => {
    emit('bindSpecificSelect', item)
};

</script>

<template>
    
    <div class="w-1/2 relative" tabindex="0" @click="dropdownShown = !dropdownShown" @focusout="dropdownShown = false">
        <div class="w-full flex relative justify-end z-0">
            <input placeholder="Choose an option" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="w-full relative z-10 p-1 pl-2 text-[13px] text-[#1d1d1d] font-semibold border-dashed border-2 border-[#2acc97] rounded-lg"/>
            <div class="absolute z-10 py-1 flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 z-30 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </div>
        </div>
        <div id="dropdown" v-if="dropdownShown" class="w-full flex flex-col z-50 rounded-lg absolute min-h-[50px] max-h-52 overflow-y-scroll border-solid border-2 border-[#93a3e6] bg-white">
            <span @mousedown="bindSpecificSelect(item)" v-for="item in shownData" :key="item" class="w-full px-1 py-2 font-semibold text-[#1d1d1d] text-[14px] duration-100" :class="modelValue === item ? 'text-[#93a3e6]' : 'hover:bg-[#93a3e6] hover:text-white'">
                {{ item }}
            </span>
        </div>
    </div>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }

    #dropdown::-webkit-scrollbar {
        width: 6px;
    }
    
    #dropdown::-webkit-scrollbar-track {
        border-radius: 8px;
    }
    
    #dropdown::-webkit-scrollbar-thumb {
        background-color: rgb(151, 151, 151);
        outline: none;
        border-radius: 8px;
    }
</style>