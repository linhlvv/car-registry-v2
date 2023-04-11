<script setup>
import OwnerInfo from '../components/owner/OwnerInfo.vue';
import OwnerRegistryHistory from '../components/owner/OwnerRegistryHistory.vue';
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<template>
    <div class="flex flex-col p-5 gap-8 w-full">
        <div>{{ $route.params.id }}</div>
        <OwnerInfo :id="$route.params.id"/>
        <OwnerRegistryHistory :id="$route.params.id"/>
    </div>
</template>