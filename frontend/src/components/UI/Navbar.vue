<script setup>
import ProfileDropdown from './ProfileDropdown.vue';
import NavbarButton from './NavbarButton.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();

const emit = defineEmits(['verticalNavClicked']);

const verticalNavClickedHandler = () => {
    emit('verticalNavClicked');
};

const isLoggedIn = ref(false)
if(localStorage.getItem('email') === null) {
    isLoggedIn.value = false
} else {
    isLoggedIn.value = true
};

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
                    <router-link to="/logAndReg/login" class="text-[16px] text-slate-700 font-medium p-2 px-4 bg-white dark:text-blue-500 hover:text-[#2acc97] rounded-lg">Login</router-link>
                </div>
                <div v-else class="max-[732px]:hidden">
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
                        <!-- <li>
                            <NavbarButton :current="route.path === '/manageDatabase'" icon="fa-sharp fa-solid fa-database" content="Manage database" link="/manageDatabase"/>
                        </li>
                        <li> 
                            <NavbarButton :current="route.path === '/accountManagement'" icon="fa-sharp fa-solid fa-users" content="Account management" link="/accountManagement"/>
                        </li> -->
                        <li> 
                            <NavbarButton :current="route.path === '/cars'" icon="fa-solid fa-car" content="Cars" link="/cars"/>
                        </li>
                        <!-- <li> 
                            <NavbarButton :current="route.path === '/registedCars'" icon="fa-sharp fa-solid fa-car-on" content="Registed cars" link="/registedCars"/>
                        </li>
                        <li> 
                            <NavbarButton :current="route.path === '/expiredCars'" icon="fa-sharp fa-solid fa-car-burst" content="Expired cars" link="/expiredCars"/>
                        </li>
                        <li> 
                            <NavbarButton :current="route.path === '/notRegistedCars'" icon="fa-solid fa-car-tunnel" content="Not registed cars" link="/notRegistedCars"/>
                        </li> -->
                        <li> 
                            <NavbarButton :current="route.path === '/forecast'" icon="fa-solid fa-lightbulb" content="Forecast" link="/forecast"/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    
</template>

<style scoped>

</style>