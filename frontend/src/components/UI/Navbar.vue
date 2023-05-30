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
    <div :class="route.path !== '/' ? 'sticky' : ''" class="top-0 z-50">
        <nav class="bg-[#2acc97] max-[732px]:bg-[#f5f7fb] transition-all duration-200 border-gray-200 py-4 w-full">
            <div class="flex flex-wrap justify-between items-center mx-auto w-full px-4 md:px-6 ">
                <router-link to="/" >
                    <div class="text-3xl font-bold text-white cursor-pointer max-[732px]:text-[#2acc97] transition-all duration-200">RegistryTotal</div>
                </router-link>
                <div class="flex items-center">
                    <div class="flex items-center pt-[2px] cursor-pointer mr-6 text-[16px] font-semibold text-white hover:underline max-[732px]:hidden">2812-0810-2001</div>
                    <div v-if="!isLoggedIn">
                        <router-link to="/log-and-reg/login" class="text-[16px] text-slate-700 font-medium p-2 px-4 bg-white hover:text-[#2acc97] rounded-lg">Login</router-link>
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
            <nav class="bg-white">
                <div class="max-w-screen-xl px-4 mx-auto md:px-6">
                    <div class="flex items-center justify-center">
                        <ul class="flex flex-row mt-0 mr-6 text-sm font-medium">
                            <li>
                                <NavbarButton content="Home" link="/">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1c-1.4.1-2.8.1-4.2.1H392c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2c-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                            <li v-if="!isAdmin">
                                <NavbarButton :current="route.path === '/regist-new-car'" content="Regist" link="/regist-new-car">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512zm-24-168v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                            <li v-if="isAdmin">
                                <NavbarButton :current="route.path === '/manage-database'" content="Manage database" link="/manage-database">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                            <li v-if="isAdmin"> 
                                <NavbarButton :current="route.path === '/account-management'" content="Account management" link="/account-management">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 640 512">
                                            <path fill="currentColor" d="M144 0a80 80 0 1 1 0 160a80 80 0 1 1 0-160zm368 0a80 80 0 1 1 0 160a80 80 0 1 1 0-160zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0a96 96 0 1 1-192 0zm-96 261.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                            <li> 
                                <NavbarButton :current="route.path === '/cars'" content="Cars" link="/cars">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M135.2 117.4L109.1 192h293.8l-26.1-74.6c-4.5-12.8-16.6-21.4-30.2-21.4H165.4c-13.6 0-25.7 8.6-30.2 21.4zm-95.6 79.4L74.8 96.3C88.3 57.8 124.6 32 165.4 32h181.2c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2v192c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-48H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0-64 0a32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64a32 32 0 1 0 0 64z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                            <li> 
                                <NavbarButton :current="route.path === '/forecast'" content="Forecast" link="/forecast">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 384 512">
                                            <path fill="currentColor" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c19.8 27.1 39.7 54.4 49.2 86.2h160zm-80 128c44.2 0 80-35.8 80-80v-16H112v16c0 44.2 35.8 80 80 80zm-80-336c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                            <li> 
                                <NavbarButton :current="route.path === '/statistics'" content="Statistics" link="/statistics">
                                    <template #i>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48h-32c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48v160c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48h-32c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/>
                                        </svg>
                                    </template>
                                </NavbarButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div v-show="(route.path === '/forecast' || route.path === '/cars' || route.path === '/statistics') && isAdmin" class="w-full">
            <nav class="bg-white max-[732px]:bg-[#f5f7fb]">
                <div class="">
                    <div class="flex items-center justify-between w-full">
                        <button @click="moveSelection('left')" class="flex justify-center items-center cursor-pointer p-8 text-[#2acc97] duration-200 hover:text-white hover:bg-[#2acc97]/90 active:bg-[#2acc97]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <Transition>
                            <div class="py-3 w-3/5 flex flex-col items-center justify-center gap-2">
                                <div class="flex items-center gap-1">
                                    <svg v-if="currentSelection.value === selection.all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-4 p-1 text-[#eded4a] bg-red-400">
                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg v-if="currentSelection.value === selection.region" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#2acc97]" viewBox="0 0 640 512">
                                        <path fill="currentColor" d="M480 48c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v48h-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24v72h-64V24c0-13.3-10.7-24-24-24S64 10.7 64 24v72H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H480V48zm96 320v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zm-336 48h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm-112-16c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm432-144c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32zm-304-80v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zm-144-16c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32zm144 144c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm-144 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm304-48v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32zm16 112v32c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z"/>
                                    </svg>
                                    <svg v-if="currentSelection.value === selection.center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-[#2acc97]">
                                        <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clip-rule="evenodd" />
                                    </svg>
                                    <p class="text-lg font-medium text-[#1d1d1d]">{{ currentSelection.name }}</p>
                                </div>
                                <SuggestionSelect v-model="currentSpecificSelect" @bindSpecificSelect="handleSetSelection" v-if="currentSelection.value !== selection.all" :data="currentList"/>
                            </div>
                        </Transition>
                        
                        <button @click="moveSelection('right')" class="flex justify-center items-center cursor-pointer p-8 text-[#2acc97] duration-200 hover:text-white hover:bg-[#2acc97]/90 active:bg-[#2acc97]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
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