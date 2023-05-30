<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['icon', 'category', 'link']);

const changePage = (link) => {
    router.push(link)
};
</script>

<template>
    <div class="h-36 flex flex-col rounded-xl bg-transparent items-center p-3 px-4 cursor-pointer hover:bg-white hover:-translate-y-1 hover:shadow-lg duration-300" @click="changePage(link)">
        <div class="h-3/5 flex items-start justify-start pt-1 max-[904px]:justify-center max-[904px]:items-center">
            <!-- <i :class="icon" class="text-5xl text-[#1d1d1d] text-opacity-70"></i> -->
            <slot name="i">

            </slot>
        </div>
        <div class="py-3 h-2/5 flex items-start justify-start text-center text-[13px] max-[974px]:text-[11px] font-bold text-[#1d1d1d] text-opacity-70 max-[904px]:justify-center max-[904px]:items-center">
            {{ category }}
        </div>
    </div>
</template>