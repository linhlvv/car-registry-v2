<script setup>
import Pagination from '../components/forecast/Pagination.vue';
import ForecastCard from '../components/forecast/ForecastCard.vue';
import CarInfoModal from '../components/modal/CarInfoModal.vue';
import RegistrationFormModal from '../components/modal/RegistrationFormModal.vue';
import { useAdminSelectionStore } from '../stores/AdminSelectionStore';
import NoSpecificSelect from '../components/UI/NoSpecificSelect.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useAccountStore } from '../stores/AccountStore';

const accountStore = useAccountStore()
const adminSelectionStore = useAdminSelectionStore()

//SECTION - response per page
const resPerPage = ref(7);

const minHeight = ref('min-h-[400px]')

//SECTION - modal
const registModalOn = ref(false)
const infoModalOn = ref(false)
const modalLicense = ref()

//FIXME - regist modal bug
const handleRegistModal = (license) => {
    modalLicense.value = license
    registModalOn.value = !registModalOn.value
}

const handleInfoModal = (license) => {
    modalLicense.value = license
    infoModalOn.value = !infoModalOn.value
}

//SECTION - pagination
const pageNumber = ref(1);
const totalPage = ref(2);

const navigateToSpecificPage = (page) => {
    pageNumber.value = page
}

const navigatePageWithDirection = (direction) => {
    if(direction === 'left') {
        if(pageNumber.value > 1) {
            pageNumber.value -= 1;
        }
    } else {
        if(pageNumber.value < totalPage.value) {
            pageNumber.value += 1;
        }
    }
}


//SECTION - data fetcher
const forecastList = ref();
const totalRes = ref(0);
const fetchForecastList = async () => {
    let fetchRoute;
    let fetchBody;
    if(accountStore.isAdmin) {
        if(adminSelectionStore.getSelected === 'all') {
            fetchRoute = `http://localhost:1111/forecast/admin/all`
            fetchBody = {
                resPerPage: resPerPage.value,
                page: pageNumber.value
            }
        } else if(adminSelectionStore.getSelected === 'region') {
            fetchRoute = `http://localhost:1111/forecast/admin/area`
            fetchBody = {
                resPerPage: resPerPage.value,
                page: pageNumber.value,
                area: adminSelectionStore.getOptionSelected
            }
        } else {
            fetchRoute = `http://localhost:1111/forecast/admin/centre`
            fetchBody = {
                resPerPage: resPerPage.value,
                page: pageNumber.value,
                centre: adminSelectionStore.getOptionSelected
            }
        } 
    } else {
        fetchRoute = `http://localhost:1111/forecast`
        fetchBody = {
            resPerPage: resPerPage.value,
            page: pageNumber.value
        }
    }
    console.log(fetchRoute);
    const res = await fetch(fetchRoute, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify(fetchBody)
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    console.log(dataFetched);
    forecastList.value = dataFetched.data
    totalPage.value = dataFetched.countPage
    totalRes.value = dataFetched.countData
};

onMounted(() => {
    fetchForecastList()
});

watch(() => pageNumber.value, (newPage, oldPage) => {
    fetchForecastList()
});

watch(() => resPerPage.value, () => {
    pageNumber.value = 1
    if(resPerPage.value === 5) {
        minHeight.value = 'min-h-[300px]'
    }
    if(resPerPage.value === 7) {
        minHeight.value = 'min-h-[400px]'
    }
    if(resPerPage.value === 10) {
        minHeight.value = 'min-h-[550px]'
    }
    if(resPerPage.value === 12) {
        minHeight.value = 'min-h-[650px]'
    }
    fetchForecastList()
});

watch(() => adminSelectionStore.getOptionSelected, () => {
    fetchForecastList()
});

watch(() => adminSelectionStore.getSelected, () => {
    fetchForecastList()
});

</script>

<template>
    <div>
        <Transition name="fade" mode="out-in">
            <div v-if="!adminSelectionStore.getVerified" class="w-full flex items-center">
                <NoSpecificSelect />
            </div>
            <div v-else>
                <div>{{ adminSelectionStore.getOptionSelected }}</div>
                <div v-if="registModalOn">
                    <RegistrationFormModal :license="modalLicense" @exit-modal="handleRegistModal"/>
                </div>
                <div v-if="infoModalOn">
                    <CarInfoModal :license-id="modalLicense" @exit-modal="handleInfoModal"/>
                </div>
                <div class="my-6">
                    <div class="flex justify-center">
                        <div class="flex items-center flex-col w-[90vw]">
                            <div class="flex justify-end items-center w-full gap-8">
                                <div class="flex items-center gap-2">
                                    <div class="text-[13px] font-semibold">Results per page</div>
                                    <select v-model="resPerPage" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-[#2acc97] block w-full p-2.5">
                                        <option value="5">5</option>
                                        <option value="7" selected>7</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div class="text-[14px] font-semibold flex items-center gap-2">
                                    <p>Total:</p>
                                    <p class="text-[#2acc97]">{{ totalRes }}</p>
                                </div>
                            </div>
                            <div id="table" class="w-full overflow-x-scroll flex flex-col gap-[2px] mb-4" :class="minHeight">
                                <ForecastCard :is-root-row="true"/>
                                <div v-for="card in forecastList" :key="card">
                                    <ForecastCard 
                                        :info="card"
                                        @open-info="handleInfoModal"
                                        @regist="handleRegistModal"
                                    />
                                </div>
                            </div>
                            <Pagination 
                                :total-page="totalPage" 
                                :current-page="pageNumber"
                                @pageClicked="navigateToSpecificPage"
                                @navigatePage="navigatePageWithDirection"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .custom-shadow {
        box-shadow: -5px 6px 8px #ebecf0;
    }

    input[type=radio] {
        accent-color: #2acc97;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.3s ease;
    }
    
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    #table::-webkit-scrollbar {
        height: 6px;
    }
    
    #table::-webkit-scrollbar-track {
        border-radius: 12px;
    }
    
    #table::-webkit-scrollbar-thumb {
        background-color: #2acc97;
        outline: none;
        border-radius: 12px;
    }
    #table::-webkit-scrollbar-thumb:hover {
        background-color: #0ce29b;
    }
</style>