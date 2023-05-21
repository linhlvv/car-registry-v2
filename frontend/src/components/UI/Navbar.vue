<script setup>
import ProfileDropdown from './ProfileDropdown.vue';
import NavbarButton from './NavbarButton.vue';
import SuggestionSelect from './SuggestionSelect.vue'

import { useRoute, useRouter } from 'vue-router';
import { useAccountStore } from '../../stores/AccountStore'
import { useAdminSelectionStore } from '../../stores/AdminSelectionStore'
import { onMounted, ref, watch } from 'vue';

const accountStore = useAccountStore()
const adminSelectionStore = useAdminSelectionStore()
const route = useRoute();
const router = useRouter()

const emit = defineEmits(['verticalNavClicked']);
const props = defineProps(['verticalNavOn'])

const verticalNavClickedHandler = () => {
    emit('verticalNavClicked');
};

//SECTION - auth handler
const isLoggedIn = ref(false)

const isAdmin = ref(localStorage.getItem('userType') === '1')
console.log(isAdmin.value);


//SECTION - admin selection
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

const currentSelection = ref(adminSelections.value[selection.value.all])
const currentSpecificSelect = ref('')
const verification = ref(true)

// logic - navigate next, prev selection
const moveSelection = (direction) => {
    currentSpecificSelect.value = ''
    if(direction === 'right') {
        if(currentSelection.value.value === selection.value.center) {
            currentSelection.value = adminSelections.value[selection.value.all]
        } else {
            currentSelection.value = adminSelections.value[currentSelection.value.value + 1]
        }
    } else {
        if(currentSelection.value.value === selection.value.all) {
            currentSelection.value = adminSelections.value[selection.value.center]
        } else {
            currentSelection.value = adminSelections.value[currentSelection.value.value - 1]
        }   
    }
    adminSelectionStore.setSelection(currentSelection.value.value, currentSpecificSelect.value)
    verification.value = adminSelectionStore.getVerified
};

// logic - set specific option of selection
const handleSetSelection = (item) => {
    currentSpecificSelect.value = item
    adminSelectionStore.setSelection(currentSelection.value.value, currentSpecificSelect.value)
}

//SECTION - fetch region and center name

const regionList = ref(null)
const centerList = ref(null)
const currentList = ref()
const fetchRegionAndCenterList = async () => {
    const res1 = await fetch(`http://localhost:1111/stats/area`, {
        credentials: "include",
        headers: {
            'Authorization': `${accountStore.getToken}`,
            'Content-Type': 'application/json',
        }
    })
    if(res1.error) {
        console.log(res1.error);
    }
    const dataFetched1 = JSON.parse(await res1.text())
    regionList.value = dataFetched1.areas

    const res2 = await fetch(`http://localhost:1111/stats/centre`, {
        credentials: "include",
        headers: {
            'Authorization': `${accountStore.getToken}`,
            'Content-Type': 'application/json',
        }
    })
    if(res2.error) {
        console.log(res2.error);
    }
    const dataFetched2 = JSON.parse(await res2.text())
    centerList.value = dataFetched2.areas
}


watch(() => currentSelection.value, () => {
    if(currentSelection.value.value === adminSelections.value[selection.value.region].value) {
        currentList.value = []
        currentList.value = [...regionList.value]
    } else if (currentSelection.value.value === adminSelections.value[selection.value.center].value) {
        currentList.value = []
        currentList.value = [...centerList.value]
    }
    currentSpecificSelect.value = ''
});

onMounted(() => {
    if(localStorage.getItem('token') === null) {
        isLoggedIn.value = false
    } else {
        isLoggedIn.value = true
    }
    if(isLoggedIn.value === false) {
        router.push('/log-and-reg/login')
    } else {
        adminSelectionStore.setSelection(currentSelection.value.value, currentSpecificSelect.value)
        fetchRegionAndCenterList()
    }
});

</script>

<template>
    <nav class="bg-[#2acc97] max-[732px]:bg-[#f5f7fb] transition-all duration-200 border-gray-200 dark:bg-gray-900 py-4 w-full">
        <div class="flex flex-wrap justify-between items-center mx-auto w-full px-4 md:px-6 ">
            <router-link to="/" >
                <div class="text-3xl font-bold text-white cursor-pointer max-[732px]:text-[#2acc97] transition-all duration-200">RegistryTotal</div>
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
                    <div :class="verticalNavOn ? ' text-white hover:bg-white/30' : 'text-[#2acc97] hover:bg-[#2acc97]/10'" class="p-1 px-2 relative z-40 rounded-md duration-150 cursor-pointer" @click="verticalNavClickedHandler">
                        <i :class="verticalNavOn ? ' text-white' : 'text-[#2acc97]'" class="fa-solid fa-bars duration-200 ease-in-out transition-all"></i>
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
                        <li v-if="!isAdmin">
                            <NavbarButton :current="route.path === '/regist-new-car'" icon="fa-solid fa-circle-plus" content="Regist" link="/regist-new-car"/>
                        </li>
                        <li v-if="isAdmin">
                            <NavbarButton :current="route.path === '/manage-database'" icon="fa-sharp fa-solid fa-database" content="Manage database" link="/manage-database"/>
                        </li>
                        <li v-if="isAdmin"> 
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
    <div v-show="route.path === '/forecast' && route.path === '/cars' && route.path === '/statistics' && isAdmin" class="max-[732px]:hidden w-full">
        <nav class="bg-white dark:bg-gray-700">
            <div class="max-w-screen-xl mx-auto">
                <div class="flex items-center justify-between">
                    <button @click="moveSelection('left')" class="flex justify-center items-center cursor-pointer w-[10%] py-6 text-[#2acc97] duration-200 hover:text-white hover:bg-[#2acc97]/90 active:bg-[#2acc97]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <Transition>
                        <div class="py-3 w-4/5 flex flex-col items-center justify-center gap-2">
                            <div class="flex items-center gap-1">
                                <svg v-if="currentSelection.value === selection.all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-4 p-1 text-[#eded4a] bg-red-400">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <i v-if="currentSelection.value === selection.region" class="fa-solid fa-city text-[#2acc97]"></i>
                                <svg v-if="currentSelection.value === selection.center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-[#2acc97]">
                                    <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clip-rule="evenodd" />
                                </svg>
                                <p class="text-lg font-medium text-[#1d1d1d]">{{ currentSelection.name }}</p>
                            </div>
                            <SuggestionSelect v-model="currentSpecificSelect" @bindSpecificSelect="handleSetSelection" v-if="currentSelection.value !== selection.all" :data="currentList"/>
                        </div>
                    </Transition>
                    
                    <button @click="moveSelection('right')" class="flex justify-center items-center cursor-pointer w-[10%] py-6 text-[#2acc97] duration-200 hover:text-white hover:bg-[#2acc97]/90 active:bg-[#2acc97]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    
</style>