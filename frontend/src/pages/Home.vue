<script setup>
import Introduction from '../components/home/Introduction.vue';
import Categories from '../components/home/Categories.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<template>
    <div class="flex flex-col w-full min-h-screen">
        <Introduction />
        <Categories />
    </div>
</template>