<script setup>
const props = defineProps(['icon', 'link', 'content', 'current']);
// border-b-2 border-solid border-[#2acc97]
</script>

<template>
    <router-link :to="link" :class="{underlined: current}" class= "text-[#293241] group relative overflow-hidden border-2 border-solid border-transparent h-full text-center dark:text-white duration-300 hover:bg-[#2acc97] hover:text-white px-4 py-3 flex flex-col">
        <div class="absolute flex items-center space-x-2 duration-300 transition-transform -translate-y-10 group-hover:block group-hover:-translate-y-0">
            <i 
                :class="icon"
            ></i>
            <span>{{ content }}</span>
        </div>
        <div class="flex items-center space-x-2 duration-300 transition-transform group-hover:translate-y-10">
            <i 
                :class="icon"
            ></i>
            <span>{{ content }}</span>
        </div>
    </router-link>
</template>

<style scoped>
    .underlined {
        border-bottom: 2px solid #2acc97;
    }
</style>