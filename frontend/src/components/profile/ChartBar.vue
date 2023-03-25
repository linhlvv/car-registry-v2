<script setup>
    const props = defineProps(['height']);
</script>

<template>
    <div class="h-52 w-4 flex justify-center items-end rounded-t-lg overflow-hidden border-solid border-2 border-slate-600">
        <div :style="{ height: height + '%'}" class="bg-white w-full ease-in-out duration-500 ">
        
        </div>
    </div>
</template>