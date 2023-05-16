<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps(['icon', 'content', 'link']);
</script>

<template>
    <router-link :to="link" :class="route.path === link ? 'bg-white/40' : ''" class="w-full p-3 gap-4 rounded-md flex items-center text-white text-sm font-semibold hover:bg-white/50 cursor-pointer">
        <i :class="icon"></i>
        <div class="">{{ content }}</div>
    </router-link>
</template>