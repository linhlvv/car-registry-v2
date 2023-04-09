<script setup>
const props = defineProps(['item']);
</script>

<template>
    <div class="bg-white rounded-lg py-3 flex w-full">
        <!-- <div class="flex flex-col text-black">
            <div>Email: {{ item.email }}</div>
            <div>Password: {{ item.password }}</div>
        </div>
        <div class="flex items-center gap-3">
            <i class="fa-sharp fa-solid fa-pen p-2 cursor-pointer text-[12px] text-white border-none rounded-[50%] bg-[#293241] hover:bg-[#e7e7e7] hover:text-[#293241]"></i>
            <i class="fa-sharp fa-solid fa-xmark p-2 px-[10px] text-[12px] cursor-pointer text-white border-none rounded-[50%] bg-[#293241] hover:bg-[#e7e7e7] hover:text-[#293241]"></i>
        </div> -->
        <div class="font-bold text-[11px] text-[#4f555a] flex items-center ml-5 w-[25%]">
            Trung Tâm Đăng Kiểm Trần Vỹ
        </div>
        <div class="font-bold text-[11px] text-[#4f555a] break-all flex items-center justify-center text-center w-[15%]">
            0981054950
        </div>
        <div class="font-bold text-[11px] text-[#4f555a] flex items-center text-center justify-center w-[15%]">
            Ho Chi Minh
        </div>
        <div class="font-bold text-[11px] text-[#4f555a] flex items-center text-right justify-end w-[30%]">
            tranhaphuong081003@gmail.com
        </div>
        <div class="text-xl flex items-center gap-3 justify-end w-[15%]">
            <i class="fa-sharp fa-solid fa-pen p-2 cursor-pointer text-[12px] text-white border-none rounded-[50%] bg-[#293241] duration-200 hover:bg-[#2acc97] active:bg-[#12ad7a] hover:text-white"></i>
            <i class="fa-sharp fa-solid fa-xmark p-2 px-[10px] text-[12px] cursor-pointer text-white border-none rounded-[50%] bg-[#293241] duration-200 hover:bg-[#2acc97] active:bg-[#12ad7a] hover:text-white mr-5"></i>
        </div>
    </div>
</template>