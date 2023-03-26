<script setup>
const props = defineProps(['icon', 'link', 'content', 'current']);
// border-b-2 border-solid border-[#2acc97]
</script>

<template>
    <router-link :to="link" :class="{underlined: current}" class= "text-[#293241] border-2 border-solid border-transparent h-full text-center dark:text-white duration-300 hover:text-base hover:bg-[#2acc97] hover:text-white p-4 flex items-center gap-1">
        <i :class="icon"></i>
        {{ content }}
    </router-link>
</template>

<style scoped>
    .underlined {
        border-bottom: 2px solid #2acc97;
    }
</style>