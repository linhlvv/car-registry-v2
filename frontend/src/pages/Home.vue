<script setup>
import AdminIntro from "../components/home/AdminIntro.vue";
import { useAccountStore } from "../stores/AccountStore";
import { onMounted, ref } from "vue";

const accountStore = useAccountStore();

const type = ref(null)

onMounted(() => {
  type.value = localStorage.getItem('userType') === '1'
});

</script>

<template>
  <div class="w-full">
    <div class="flex flex-col transition-all duration-300 ease-out relative">
      <AdminIntro />
    </div>
  </div>
</template>
