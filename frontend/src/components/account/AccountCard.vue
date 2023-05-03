<script setup>
const props = defineProps(['item']);
const emit = defineEmits(['openModificationModal']);

const openModModal = () => {
    emit('openModificationModal')
};
</script>

<template>
    <div class="bg-white rounded-lg py-3 flex w-full text-[11px] max-[850px]:text-[10px]">
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
        <div class="flex items-center gap-2 justify-center w-[15%] text-[12px] max-[850px]:text-[8px] max-[850px]:gap-[6px] max-[710px]:w-[20%]">
            <svg @click="openModModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 p-2 rounded-[50%] cursor-pointer hover:bg-[#2acc97] hover:text-white duration-150 ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 p-2 rounded-[50%] cursor-pointer hover:bg-[#2acc97] hover:text-white duration-150 ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            <!-- <i class="fa-sharp fa-solid fa-circle-xmark cursor-pointer mt-[1px] max-[850px]:mt-[1.3px] text-[28px] max-[850px]:text-2xl text-[#293241] duration-200 hover:text-[#2acc97] active:text-[#12ad7a] mr-5"></i> -->
        </div>
    </div>
</template>