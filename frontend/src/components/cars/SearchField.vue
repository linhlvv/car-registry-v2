<script setup>
import { ref } from 'vue';
import SearchBar from '../UI/SearchBar.vue';

// const props = defineProps(['pageNumber']);
const emit = defineEmits([
    'nextPage',
    'prevPage',
    'specifiedPage',
    'licenseSearch',
    'selectedFilterClicked',
    'selectedCityClicked',
    'selectedOwnerClicked',
    'selectedBrandClicked',
    'selectedTimeClicked',
]);
const selected = ref('No filter');
const pageNumber = ref(1);

const pageHandler = (direction) => {
    if(direction === 'left') {
        if (pageNumber.value > 1) {
            pageNumber.value -= +1;
            emit('prevPage');
        }
    } else {
        if (pageNumber.value <100) {
            pageNumber.value += +1;
            emit('nextPage');
        }
    }
};

const enterHandler = (number) => {
    if(1 <= number && number <= 100) {
        pageNumber.value = +number;
        emit('specifiedPage', +number);
    }
};

const city = ref('All');
const owner = ref('All');
const brand = ref('All');
const time = ref({
    year: 'All', quarter: 'All', month: 'All',
});

const filterClickedHandler = (value) => {
    console.log(`filter ${selected.value}`);
    emit('selectedFilterClicked', value)
}

const cityClicked = (value) => {
    console.log(`city ${city.value}`);
    emit('selectedCityClicked', value)
}

const ownerClicked = (value) => {
    owner.value = value
    console.log(`owner ${owner.value}`);
    emit('selectedOwnerClicked', value)
}

const brandClicked = (value) => {
    console.log(`brand changes to ${brand.value}`);
    emit('selectedBrandClicked', value)
}

const timeClicked = (value, type) => {
    if(type === 'year') {
        time.value.year = value;
    } else if (type === 'quarter') {
        time.value.quarter = value
        time.value.month = 'All'
    } else {
        time.value.month = value
        time.value.quarter = 'All'
    }
    // console.log(`time changes to ${{year: time.value.year, quarter: time.value.quarter, month: time.value.month}}`);
    emit('selectedTimeClicked', time.value)
}

const filterList = ['No filter', 'City', 'Owner', 'Brand', 'Time']
const cityList = ['All', 'Ho Chi Minh', 'Ha Noi', 'Bac Ninh', 'Hue']
const brandList = ['All', 'Mercedes', 'RollRoyce', 'Toyota', 'Kia', 'Ferrari', 'Vinfast']
const yearList = ['All', '2019', '2020', '2021', '2022', '2023']
const quarterList = [
    {content: 'All', value: 'All'},
    {content: 'Q1', value: '1'},
    {content: 'Q2', value: '2'},
    {content: 'Q3', value: '3'},
    {content: 'Q4', value: '4'},
]
const monthList = [
    {content: 'All', value: 'All'}, 
    {content: 'January', value: '1'},
    {content: 'Febuary', value: '2'}, 
    {content: 'March', value: '3'}, 
    {content: 'April', value: '4'}, 
    {content: 'May', value: '5'}, 
    {content: 'June', value: '6'}, 
    {content: 'July', value: '7'}, 
    {content: 'August', value: '8'}, 
    {content: 'September', value: '9'}, 
    {content: 'October', value: '10'}, 
    {content: 'November', value: '11'}, 
    {content: 'December', value: '12'}, 
]

const fromAtoZ = ref(true);
const fromAtoZClicked = () => {
    fromAtoZ.value = true
};
const fromZtoAClicked = () => {
    fromAtoZ.value = false
};

const timeAscending = ref(true)
const timeAscendingClicked = () => {
    timeAscending.value = true
}
const timeDescendingClicked = () => {
    timeAscending.value = false
}

const licenseSearch = (content) => {
    emit('licenseSearch', content)
};

</script>

<template>
    <div class="bg-white w-full p-6 px-7 flex flex-col gap-3 justify-center">
        <div class="w-full flex items-center">
            <div class="flex items-center w-[77.5%] gap-3">
                <SearchBar @search-entered="licenseSearch" width="w-[30%]" placeholder="Enter a license plate..."/>
            </div>

            <!-- Pagination -->
            <div class="flex items-center gap-2 w-[20%] justify-end">
                <i class="fa-solid fa-circle-arrow-left text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('left')"></i>
                <div class="flex items-center">
                    <input type="number" min="1" :value="pageNumber" @keyup.enter="enterHandler($event.target.value)" class="border border-[#1d1d1d] border-opacity-10 p-[2px] w-10">
                    <div>/100</div>
                    <!-- <div class="text-green-400">{{ typeof pageNumber }}</div> -->
                </div>
                <i class="fa-solid fa-circle-arrow-right text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('right')"></i>
            </div>
        </div>
        <div class="w-full flex items-center">
            <div class="w-[30%] flex items-center gap-2">
                <div class="flex items-center">
                    <h1 class="text-[#9196a4] font-semibold">Filter</h1>
                </div>
                <select @change="filterClickedHandler(selected)" v-model="selected" id="countries" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option :value="item" v-for="item in filterList" :key="item">
                        {{ item }}
                    </option>
                </select>

                <!-- Ordering -->
                <div v-if="selected !== 'No filter' && selected !== 'Time' && city === 'All' && owner === 'All' && brand === 'All'" class="flex flex-col gap-1">
                    <i @click="fromAtoZClicked" class="fa-solid fa-arrow-up-z-a text-[#1d1d1d] cursor-pointer duration-100" :class="fromAtoZ ? 'text-[#2acc97]' : ''"></i>
                    <i @click="fromZtoAClicked" class="fa-solid fa-arrow-up-a-z text-[#1d1d1d] cursor-pointer duration-100" :class="!fromAtoZ ? 'text-[#2acc97]' : ''"></i>
                </div>
                <div v-else-if="selected === 'Time'" class="flex flex-col gap-1">
                    <i @click="timeAscendingClicked" class="fa-solid fa-arrow-up text-[#1d1d1d] cursor-pointer duration-100" :class="timeAscending ? 'text-[#2acc97]' : ''"></i>
                    <i @click="timeDescendingClicked" class="fa-solid fa-arrow-down text-[#1d1d1d] cursor-pointer duration-100" :class="!timeAscending ? 'text-[#2acc97]' : ''"></i>
                </div>
            </div>
            <div class="w-[70%] flex items-center ml-3">
                <!-- City filter -->
                <div id="sub-filter" v-show="selected === 'City'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">City</h1>
                    </div>
                    <select v-model="city" @change="cityClicked(city)" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="singleCity in cityList" :key="singleCity">
                            {{ singleCity }}
                        </option>
                    </select>
                </div>

                <!-- Owner filter -->
                <div id="sub-filter" v-show="selected === 'Owner'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">Owner</h1>
                    </div>
                    <SearchBar @search-entered="ownerClicked" width="w-[70%]" placeholder="Enter the SSN..."/>
                </div>

                <!-- Brand filter -->
                <div id="sub-filter" v-show="selected === 'Brand'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">Brand</h1>
                    </div>
                    <select v-model="brand" @change="brandClicked(brand)" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="singleBrand in brandList" :key="singleBrand">
                            {{ singleBrand }}
                        </option>
                    </select>
                </div>

                <!-- Time filter -->
                <div id="sub-filter" v-show="selected === 'Time'" class="flex items-center gap-2 w-full">
                    <select v-model="time.year" @change="timeClicked(time.year, 'year')" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="singleYear in yearList" :key="singleYear" :value="singleYear">
                            {{ singleYear }}
                        </option>
                    </select>
                    <select :disabled="time.year === 'All'" v-model="time.quarter" @change="timeClicked(time.quarter, 'quarter')" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-60">
                        <option v-for="singleQ in quarterList" :key="singleQ.value" :value="singleQ.value">
                            {{ singleQ.content }}
                        </option>
                    </select>
                    <select :disabled="time.year === 'All'" v-model="time.month" @change="timeClicked(time.month, 'month')" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-60">
                        <option v-for="singleMonth in monthList" :key="singleMonth.value" :value="singleMonth.value">
                            {{ singleMonth.content }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    textarea:focus, input:focus{
        outline: none;
    }

    #sub-filter {
        animation: slide 0.5s;
    }
    @keyframes slide {
        from {
            opacity: 0;
            transform: translateX(10px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
</style>