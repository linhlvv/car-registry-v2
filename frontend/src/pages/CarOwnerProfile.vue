<script setup>
import OwnerInfo from '../components/owner/OwnerInfo.vue';
import OwnerCars from '../components/owner/OwnerCars.vue';
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
    <div class="flex flex-col p-5 gap-8 w-full">
        <div>{{ $route.params.id }}</div>
        <OwnerInfo />
        <OwnerCars />
    </div>
</template>