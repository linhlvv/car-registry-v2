<script setup>
import Introduction from "../components/home/Introduction.vue";
import Categories from "../components/home/Categories.vue";
import AdminCate from "../components/home/AdminCate.vue";
import { useAccountStore } from "../stores/AccountStore";
// import 'vue3-carousel/dist/carousel.css'
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const accountStore = useAccountStore();

</script>

<template>
  <div class="w-full">
    <div v-if="!accountStore.isAdmin" class="flex flex-col w-full min-h-screen">
        <Introduction />
        <Categories />
    </div>
    <div v-else class="w-full flex flex-col">
      
      <div class="w-full flex items-start">
        <AdminCate description="Manage database by adding available car list" link="/manage-database" icon="fa-sharp fa-solid fa-database" content="Manage database"/>
        <AdminCate description="Manage center accounts" icon="fa-sharp fa-solid fa-users" content="Account management" link="/account-management"/>
      </div>
      <div class="w-full flex items-start">
        <AdminCate description="View all available cars and their status" icon="fa-solid fa-car" content="Cars" link="/cars"/>
        <AdminCate description="View all cars that have high probability of re-registration this month" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
      </div>
        
        
      <AdminCate description="View statistics" icon="fa-solid fa-chart-simple" content="Statistics" link="/statistics"/>
      <!-- <div class="w-1/2">
        <carousel :perPage="3">
          <slide v-for="slide in 10" :key="slide">
            <AdminCate description="View all cars that have high probability of re-registration this month" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel> -->
      <!-- </div> -->
    </div>
  </div>
</template>
