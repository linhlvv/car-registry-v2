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
    console.log(`license: ${license}`);
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
const carType = ref('registed');
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

const selectionOpened = ref(false)
const openSelectHandler = () => {
    selectionOpened.value = !selectionOpened.value
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

        <!-- main -->
        <div class="my-6">
            <div class="flex items-center flex-col gap-5 justify-center">

                <!-- default car type filter -->
                <div class="flex custom-shadow w-[70vw] rounded-2xl overflow-hidden bg-white max-[535px]:hidden">
                    
                    <div 
                        @click="carTypeHandler('registed')"
                        class="w-1/2 text-base font-medium gap-1 flex items-center justify-center text-center duration-200 cursor-pointer p-2 py-4 max-[997px]:text-sm max-[738px]:text-xs max-[625px]:text-[10px]"
                        :class="carTypeMatched('registed') ? 'bg-[#2acc97] text-white' : 'hover:text-[#2acc97]'"
                    >
                        <i class="fa-solid fa-car-on"></i>
                        <div>Registed cars</div>
                    </div>
                    <div 
                        @click="carTypeHandler('expired')"
                        class="w-1/2 text-base font-medium gap-1 flex items-center justify-center text-center duration-200 cursor-pointer p-2 py-4 max-[997px]:text-sm max-[738px]:text-xs max-[625px]:text-[10px]"
                        :class="carTypeMatched('expired') ? 'bg-[#2acc97] text-white' : 'hover:text-[#2acc97]'"
                    >
                        <i class="fa-solid fa-car-burst"></i>
                        <div>Expired cars</div>
                    </div>
                    
                </div>
                
                <!-- responsive select dropdown -->
                <div class="w-4/5 flex flex-col min-[535px]:hidden">
                    <div @click="openSelectHandler" class="w-full rounded-lg p-2 flex items-center justify-between text-white text-base bg-[#2acc97]">
                        <div class="font-semibold">Select</div>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div :class="!selectionOpened ? 'hidden' : ''" class="w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"  >
                            <div class="flex items-center">
                                <input @click="carTypeHandler('registed')" id="default-radio-2" type="radio" value="registed" v-model="carType" name="registed" class="w-4 h-4">
                                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Registed cars</label>
                            </div>
                        
                            <div class="flex items-center">
                                <input @click="carTypeHandler('expired')" id="default-radio-3" type="radio" value="expired" v-model="carType" name="expired" class="w-4 h-4">
                                <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expired cars</label>
                            </div>    
                        </ul>
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

    input[type=radio] {
        accent-color: #2acc97;
    }
</style>