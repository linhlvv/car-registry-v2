<script setup>
import ProfileDropdown from './ProfileDropdown.vue';
import NavbarButton from './NavbarButton.vue';
import SuggestionSelect from './SuggestionSelect.vue'

import { useRoute } from 'vue-router';
import { useAccountStore } from '../../stores/AccountStore'
import { ref } from 'vue';

const accountStore = useAccountStore()
const route = useRoute();

const emit = defineEmits(['verticalNavClicked']);

const verticalNavClickedHandler = () => {
    emit('verticalNavClicked');
};

const isLoggedIn = ref(false)
if(localStorage.getItem('token') === null) {
    isLoggedIn.value = false
} else {
    isLoggedIn.value = true
};

const selection = ref({
    all: 0,
    region: 1,
    center: 2,
})

const adminSelections = ref([
    {name: 'All', value: selection.value.all},
    {name: 'Region', value: selection.value.region},
    {name: 'Center', value: selection.value.center},
]);

</script>

<template>
    <nav class="bg-[#2acc97] border-gray-200 dark:bg-gray-900 py-4 w-full">
        <div class="flex flex-wrap justify-between items-center mx-auto w-full px-4 md:px-6 ">
            <router-link to="/" >
                <div class="text-3xl font-bold text-white cursor-pointer">RegistryTotal</div>
            </router-link>
            <div class="flex items-center">
                <div class="flex items-center pt-[2px] cursor-pointer mr-6 text-[16px] font-semibold text-white dark:text-white hover:underline max-[732px]:hidden">2812-0810-2001</div>
                <div v-if="!isLoggedIn">
                    <router-link to="/log-and-reg/login" class="text-[16px] text-slate-700 font-medium p-2 px-4 bg-white dark:text-blue-500 hover:text-[#2acc97] rounded-lg">Login</router-link>
                </div>
                <div v-else>
                    <ProfileDropdown />
                </div>
                <div v-show="route.path !== '/'" class="min-[732px]:hidden flex items-center">
                    <div class="p-1 px-2 rounded-md duration-150 hover:bg-white/50 cursor-pointer" @click="verticalNavClickedHandler">
                        <i class="fa-solid fa-bars text-white"></i>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div v-show="route.path !== '/'" class="max-[732px]:hidden w-full">
        <nav class="bg-white dark:bg-gray-700">
            <div class="max-w-screen-xl px-4 mx-auto md:px-6">
                <div class="flex items-center justify-center">
                    <ul class="flex flex-row mt-0 mr-6 text-sm font-medium">
                        <li>
                            <NavbarButton icon="fa-sharp fa-solid fa-house" content="Home" link="/"/>
                        </li>
                        <li v-if="!accountStore.isAdmin">
                            <NavbarButton :current="route.path === '/regist-new-car'" icon="fa-solid fa-circle-plus" content="Regist" link="/regist-new-car"/>
                        </li>
                        <li v-if="accountStore.isAdmin">
                            <NavbarButton :current="route.path === '/manage-database'" icon="fa-sharp fa-solid fa-database" content="Manage database" link="/manage-database"/>
                        </li>
                        <li v-if="accountStore.isAdmin"> 
                            <NavbarButton :current="route.path === '/account-management'" icon="fa-sharp fa-solid fa-users" content="Account management" link="/account-management"/>
                        </li>
                        <li> 
                            <NavbarButton :current="route.path === '/cars'" icon="fa-solid fa-car" content="Cars" link="/cars"/>
                        </li>
                        <li> 
                            <NavbarButton :current="route.path === '/forecast'" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
                        </li>
                        <li> 
                            <NavbarButton :current="route.path === '/statistics'" icon="fa-solid fa-chart-simple" content="Statistics" link="/statistics"/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div v-show="route.path !== '/'" class="max-[732px]:hidden w-full">
        <nav class="bg-white dark:bg-gray-700">
            <div class="max-w-screen-xl mx-auto">
                <div class="flex items-center justify-between">
                    <div class="flex justify-center items-center cursor-pointer w-[10%] py-6 text-[#2acc97] duration-200 hover:text-white hover:bg-[#2acc97]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="py-3 w-4/5 flex items-center justify-center">
                        <SuggestionSelect :data="['Tuan', 'Phuong', 'Phuong xinh', 'Ha Phuong', 'Tran Ha Phuong', 'Vu Minh Tuan', 'Tuan yeu Phuong', 'Minh Tuan', 'THP', 'VMT']"/>
                    </div>
                    <div class="flex justify-center items-center cursor-pointer w-[10%] py-6 text-[#2acc97] duration-200 hover:text-white hover:bg-[#2acc97]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    
</template>

<style scoped>

</style>