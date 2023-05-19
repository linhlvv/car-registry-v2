<script setup>
import Introduction from "../components/home/Introduction.vue";
import Categories from "../components/home/Categories.vue";
import AdminCate from "../components/home/AdminCate.vue";
import AdminIntro from "../components/home/AdminIntro.vue";
import { useAccountStore } from "../stores/AccountStore";
import { onMounted, ref } from "vue";
// import 'vue3-carousel/dist/carousel.css'
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const accountStore = useAccountStore();

const type = ref(null)

//FIXME - account store is admin bug

onMounted(() => {
  type.value = localStorage.getItem('userType') === '1'
});

</script>

<template>
  <div class="w-full">
    <div v-if="!type" class="flex flex-col w-full min-h-screen">
        <Introduction />
        <Categories />
    </div>
    <div v-else class="flex flex-col transition-all duration-300 ease-out relative">
      <AdminIntro />
      <!-- <div class="w-full px-7 py-4">
        <hr class="h-[2px] bg-[#2acc97]">
      </div> -->
      <!-- <div class="w-full flex flex-wrap">
        <div class="w-full px-[30px]">
          <p class="text-left text-white font-semibold w-full text-[26px] uppercase px-2 py-4 bg-[#2acc97] mt-4 mb-2 rounded-[4px]">
            WORKSPACE
          </p>
        </div>
        <AdminCate description="Add available car list" link="/manage-database" icon="fa-sharp fa-solid fa-database" content="Manage database"/>
        <AdminCate description="Add/deactivate accounts" icon="fa-sharp fa-solid fa-users" content="Account management" link="/account-management"/>
        <AdminCate description="View available cars" icon="fa-solid fa-car" content="Cars" link="/cars"/>
        <AdminCate description="Forecast potential re-regist car this month" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
        <AdminCate description="View cert statistics" icon="fa-solid fa-chart-simple" content="Statistics" link="/statistics"/>
      </div> -->
    </div>
  </div>
</template>
