<script setup>
import { ref, watch } from 'vue';
import SearchBar from '../UI/SearchBar.vue';
import { useAccountStore } from '../../stores/AccountStore';

const accountStore = useAccountStore()

const props = defineProps(['pageNum', 'totalPage', 'carType']);
const emit = defineEmits([
    'nextPage',
    'prevPage',
    'sendSortOrder',
    'specifiedPage',
    'licenseSearch',
    'selectedFilterClicked',
    'selectedCityClicked',
    'selectedOwnerClicked',
    'selectedBrandClicked',
    'selectedTimeClicked',
    'reloadData',
]);

//SECTION - Filter list
const filterList = ['No filter', 'City', 'Owner', 'Brand', 'Time']
const cityList = ['All', 'Ho Chi Minh', 'Ha Noi', 'Bac Ninh', 'Hue']
const brandList = ref(['All'])
const yearList = ['All', '2021', '2022', '2023']
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

//SECTION - filter sorting
const fromAtoZ = ref('asc');

// logic - alphabetical order asc or desc
const fromAtoZClicked = () => {
    fromAtoZ.value = 'asc'
    emit('sendSortOrder', fromAtoZ.value)
};
const fromZtoAClicked = () => {
    fromAtoZ.value = 'desc'
    emit('sendSortOrder', fromAtoZ.value)
};

// logic - time order
const timeAscending = ref(true)
const timeAscendingClicked = () => {
    timeAscending.value = true
}
const timeDescendingClicked = () => {
    timeAscending.value = false
}


//SECTION - find car by license
const licenseSearch = (content) => {
    emit('licenseSearch', content)
};

//SECTION - fetch all available brands
const fetchAllAvailableBrands = async () => {
    // console.log(`cartype: ${props.carType}`);
    const res = await fetch(`http://localhost:1111/filter/allBrand`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accountStore.getToken}`
        },
        body: JSON.stringify({carType: props.carType}),
    })
    if(res.error) {
        console.log(res.error);
    }
    const dataFetched = JSON.parse(await res.text())
    brandList.value = ['All', ...dataFetched.data]
    // console.log(`all available brands: ${JSON.stringify(brandList.value)}`);
};

//SECTION - handle pagination
// logic - pagination with previous and next button
const pageNumber = ref(props.pageNum);
const pageHandler = (direction) => {
    if(direction === 'left') {
        if (pageNumber.value > 1) {
            pageNumber.value -= +1;
            emit('prevPage');
        }
    } else {
        if (pageNumber.value < props.totalPage) {
            pageNumber.value += +1;
            emit('nextPage');
        }
    }
};

// logic - navigate to exact page when enter is pressed
const enterHandler = (number) => {
    if(1 <= number && number <= props.totalPage) {
        pageNumber.value = +number;
        emit('specifiedPage', +number);
    }
};

//SECTION - Filter handler
const selected = ref('No filter');
const city = ref('All');
const owner = ref('');
const brand = ref('All');
const time = ref({
    year: 'All', quarter: 'All', month: 'All',
});

// logic - general filter
const filterClickedHandler = (value) => {
    brand.value = 'All'
    time.value = {
        year: 'All', quarter: 'All', month: 'All',
    }
    console.log(`filter ${selected.value}`);
    if(selected.value === 'Brand') {
        fetchAllAvailableBrands()
    }
    emit('selectedFilterClicked', value)
}

// logic - city filter
const cityClicked = (value) => {
    console.log(`city ${city.value}`);
    emit('selectedCityClicked', value)
}

// logic - owner filter
const ownerClicked = (value) => {
    owner.value = value
    console.log(`owner ${owner.value}`);
    emit('selectedOwnerClicked', value)
}

// logic - brand filter
const brandClicked = (value) => {
    console.log(`brand changes to ${brand.value}`);
    emit('selectedBrandClicked', value)
}

// logic - time filter with year + quarter or year + month
const timeClicked = (value, type) => {
    if(type === 'year') {
        time.value.year = value;
        time.value.month = 'All'
        time.value.quarter = 'All'
    } else if (type === 'quarter') {
        time.value.quarter = value
        time.value.month = 'All'
    } else {
        time.value.month = value
        time.value.quarter = 'All'
    }
    // console.log(`time changes to ${{year: time.value.year, quarter: time.value.quarter, month: time.value.month}}`);
    emit('selectedTimeClicked', {year: time.value.year, quarter: time.value.quarter, month: time.value.month})
};

//SECTION - watcher
// logic - reset filter after car type change event
watch(() => props.carType, (newCarType, oldCarType) => {
    if(newCarType !== oldCarType) {
        selected.value = 'No filter'
        time.value = {
            year: 'All', quarter: 'All', month: 'All',
        }
        owner.value = ''
        brand.value = 'All'
        city.value = 'All'
    }
});

//SECTION - reload data
const reload = async () => {
    selected.value = 'No filter'
    brand.value = 'All'
    city.value = 'All'
    owner.value = ''
    emit('reloadData')
};

</script>

<template>
    <div class="bg-white w-full p-6 px-7 flex flex-col gap-3 justify-center">
        <div class="w-full flex items-center">
            <div class="flex items-center w-[77.5%] gap-3">
                <SearchBar @search-entered="licenseSearch" width="w-[30%]" placeholder="Enter a license plate..."/>
                <i @click="reload" class="fa-solid fa-rotate text-[#292929] p-[6px] rounded-[50%] hover:text-[#2acc97] active:bg-[#2acc97]/10 cursor-pointer"></i>
            </div>

            <!-- Pagination -->
            <div class="flex items-center gap-2 w-[20%] justify-end">
                <i class="fa-solid fa-circle-arrow-left text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('left')"></i>
                <div class="flex items-center">
                    <input type="number" min="1" :max="totalPage" :value="props.pageNum" @keyup.enter="enterHandler($event.target.value)" class="border border-[#1d1d1d] border-opacity-10 p-[2px] w-10">
                    <div>/{{ totalPage }}</div>
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
                <div v-if="selected !== 'No filter' && selected !== 'Time' && city === 'All' && brand === 'All'" class="flex flex-col gap-1">
                    <i @click="fromAtoZClicked" class="fa-solid fa-arrow-up-z-a text-[#1d1d1d] cursor-pointer" :class="fromAtoZ === 'asc' ? 'text-[#2acc97]' : ''"></i>
                    <i @click="fromZtoAClicked" class="fa-solid fa-arrow-up-a-z text-[#1d1d1d] cursor-pointer" :class="fromAtoZ === 'desc' ? 'text-[#2acc97]' : ''"></i>
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
                    <SearchBar @search-entered="ownerClicked" width="w-[70%]" placeholder="Enter the SSN or tax..."/>
                </div>

                <!-- Brand filter -->
                <div id="sub-filter" v-show="selected === 'Brand'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">Brand</h1>
                    </div>
                    <select v-model="brand" @change="brandClicked(brand)" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="singleBrand in brandList" :key="singleBrand" :value="singleBrand">
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