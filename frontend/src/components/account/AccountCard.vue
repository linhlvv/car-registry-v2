<script setup>
import ModificationModal from './ModificationModal.vue';
const props = defineProps(['item']);
</script>

<template>
    <div class="bg-white rounded-lg py-3 flex w-full text-[11px] max-[850px]:text-[10px]">
        <!-- <div class="flex flex-col text-black">
            <div>Email: {{ item.email }}</div>
            <div>Password: {{ item.password }}</div>
        </div>
        <div class="flex items-center gap-3">
            <i class="fa-sharp fa-solid fa-pen p-2 cursor-pointer text-[12px] text-white border-none rounded-[50%] bg-[#293241] hover:bg-[#e7e7e7] hover:text-[#293241]"></i>
            <i class="fa-sharp fa-solid fa-xmark p-2 px-[10px] text-[12px] cursor-pointer text-white border-none rounded-[50%] bg-[#293241] hover:bg-[#e7e7e7] hover:text-[#293241]"></i>
        </div> -->
        <div class="font-bold text-[#4f555a] flex items-center ml-5 w-[25%] max-[770px]:w-[34.5%] max-[710px]:w-[40%] max-[600px]:w-4/5">
            {{ item.name }}
        </div>
        <div class="font-bold text-[#4f555a] break-all flex items-center justify-center text-center w-[15%] max-[710px]:hidden">
            {{ item.activation }}
        </div>
        <div class="font-bold text-[#4f555a] flex items-center text-center justify-center w-[15%] max-[770px]:hidden">
            {{ item.city }}
        </div>
        <div class="font-bold text-[#4f555a] flex items-center text-right justify-end w-[30%] max-[770px]:w-[35.5%] max-[710px]:w-[40%] max-[600px]:hidden">
            tranhaphuong081003@gmail.com
        </div>
        <div class="flex items-center gap-3 justify-end w-[15%] text-[12px] max-[850px]:text-[8px] max-[850px]:gap-[6px] max-[710px]:w-[20%]">
            <i class="fa-sharp fa-solid fa-pen p-2 cursor-pointer text-white border-none rounded-[50%] bg-[#293241] duration-200 hover:bg-[#2acc97] active:bg-[#12ad7a] hover:text-white"></i>
            <i class="fa-sharp fa-solid fa-circle-xmark cursor-pointer mt-[1px] max-[850px]:mt-[1.3px] text-[28px] max-[850px]:text-2xl text-[#293241] duration-200 hover:text-[#2acc97] active:text-[#12ad7a] mr-5"></i>
        </div>
    </div>
</template>