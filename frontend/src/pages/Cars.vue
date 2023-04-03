<script setup>
import CarInfoModal from '../components/modal/CarInfoModal.vue';
import RegistrationFormModal from '../components/modal/RegistrationFormModal.vue';
import RootRow from '../components/cars/RootRow.vue';
import CarList from '../components/cars/CarList.vue';
import SearchField from '../components/cars/SearchField.vue';
import { ref } from 'vue';

//SECTION - car info modal handler
const carDetailModal = ref(false);
const carInfoLicense = ref('')
const openCarInfo = (license) => {
    carInfoLicense.value = license
    carDetailModal.value = true
};

//SECTION - car reg form modal handler
const registrationModal = ref(false);
const openCarRegistration = () => {
    registrationModal.value = true
};

//SECTION - modal turn off
const turnOffModal = () => {
    carDetailModal.value = false
    registrationModal.value = false
};

//SECTION - page handler
const pageNumber = ref(1);
const totalPageNumber = ref()

const nextPage = () => {
    pageNumber.value += +1
}
const prevPage = () => {
    pageNumber.value += -1
}
const specifiedPage = (number) => {
    pageNumber.value = +number
};

//SECTION - license search
const licenseSearchContent = ref('');
const licenseSearchEntered = (content) => {
    licenseSearchContent.value = content
};

//SECTION - filter handler
const filter = ref('');
const city = ref('')
const brand = ref('')
const owner = ref('')
const time = ref ({
    year: '', quarter: '', month: ''
})
const filterSelected = (value) => {
    filter.value = value
    console.log(`filter value: ${filter.value}`);
};
const citySelected = (value) => {
    city.value = value
    console.log(`city value: ${city.value}`);
}
const ownerEntered = (value) => {
    owner.value = value
    console.log(`owner value: ${owner.value}`);
}
const brandSelected = (value) => {
    brand.value = value
    console.log(`brand value: ${brand.value}`);
}
const timeSelected = (value) => {
    time.value = value
    console.log(`time value: ${time.value.year} ${time.value.quarter} ${time.value.month}`);
};

//SECTION - car type handler
const carType = ref('all');
const carTypeHandler = (value) => {
    carType.value = value
    pageNumber.value = 1
};

const carTypeMatched = (value) => {
    if(carType.value === value) {
        return true
    } else {
        return false
    }
};

</script>

<template>
    <div>
        <!-- <div>{{ pageNumber }}</div> -->
        <div v-if="carDetailModal">
            <CarInfoModal :license-id="carInfoLicense" @exit-modal="turnOffModal"/>
        </div>
        <div v-if="registrationModal">
            <RegistrationFormModal @exit-modal="turnOffModal"/>
        </div>
        <!-- <div>{{ licenseSearchContent }}</div> -->
        <div class="my-6">
            <div class="flex items-center flex-col gap-5 justify-center">
                <div class="flex custom-shadow w-[70vw] rounded-2xl overflow-hidden bg-white">
                    <div 
                        @click="carTypeHandler('all')"
                        class="w-1/4 text-base font-medium gap-1 flex items-center justify-center text-center duration-200 cursor-pointer p-2 py-4 max-[997px]:text-sm max-[738px]:text-xs"
                        :class="carTypeMatched('all') ? 'bg-[#2acc97] text-white' : 'hover:text-[#2acc97]'"
                    >
                        <i class="fa-solid fa-car"></i>
                        <div>All cars</div>
                    </div>
                    <div 
                        @click="carTypeHandler('registed')"
                        class="w-1/4 text-base font-medium gap-1 flex items-center justify-center text-center duration-200 cursor-pointer p-2 py-4 max-[997px]:text-sm max-[738px]:text-xs"
                        :class="carTypeMatched('registed') ? 'bg-[#2acc97] text-white' : 'hover:text-[#2acc97]'"
                    >
                        <i class="fa-solid fa-car-on"></i>
                        <div>Registed cars</div>
                    </div>
                    <div 
                        @click="carTypeHandler('expired')"
                        class="w-1/4 text-base font-medium gap-1 flex items-center justify-center text-center duration-200 cursor-pointer p-2 py-4 max-[997px]:text-sm max-[738px]:text-xs"
                        :class="carTypeMatched('expired') ? 'bg-[#2acc97] text-white' : 'hover:text-[#2acc97]'"
                    >
                        <i class="fa-solid fa-car-burst"></i>
                        <div>Expired cars</div>
                    </div>
                    <div 
                        @click="carTypeHandler('unregisted')" 
                        class="w-1/4 text-base font-medium gap-1 flex items-center justify-center text-center duration-200 cursor-pointer p-2 py-4 max-[997px]:text-sm max-[738px]:text-xs"
                        :class="carTypeMatched('unregisted') ? 'bg-[#2acc97] text-white' : 'hover:text-[#2acc97]'"
                    >
                        <i class="fa-solid fa-car-tunnel"></i>
                        <div>Not registed cars</div>
                    </div>
                </div>
                <div class="flex custom-shadow items-center flex-col w-[80vw] rounded-2xl overflow-hidden">
                    <SearchField
                        @selectedFilterClicked="filterSelected" 
                        @selectedCityClicked="citySelected"
                        @selectedBrandClicked="brandSelected"
                        @selectedTimeClicked="timeSelected"
                        @selectedOwnerClicked="ownerEntered"
                        @licenseSearch="licenseSearchEntered" 
                        @next-page="nextPage" 
                        @prev-page="prevPage" 
                        @specified-page="specifiedPage"
                        :page-num="pageNumber"
                    />
                    <CarList 
                        :filter="filter" 
                        :city="city"
                        :brand="brand"
                        :owner="owner"
                        :time="time"
                        :page-number="pageNumber" 
                        :car-type="carType"
                        @openCarInfo="openCarInfo" 
                        @openCarRegistration="openCarRegistration"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-shadow {
        box-shadow: -5px 6px 8px #ebecf0;
    }
</style>