<script setup>
import { ref } from 'vue';
import SearchBar from '../UI/SearchBar.vue';

// const props = defineProps(['pageNumber']);
const emit = defineEmits(['nextPage', 'prevPage', 'specifiedPage', 'licenseSearch']);
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
    <div class="bg-white w-full p-6 px-7 flex items-center justify-between">
        <div class="flex items-center w-[80%] gap-3">
            <SearchBar @search-entered="licenseSearch" width="w-[25%]" placeholder="Enter a license plate..."/>

            <!-- Default filter -->
            <div class="w-[75%] flex items-center gap-4">
                <div class="flex flex-col">
                    <div class="w-fit flex items-center gap-2">
                        <div class="flex items-center">
                            <h1 class="text-[#9196a4] font-semibold">Filter</h1>
                        </div>
                        <select v-model="selected" id="countries" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>No filter</option>
                            <option value="city">City</option>
                            <option value="owner">Owner</option>
                            <option value="brand">Brand</option>
                            <option value="time">Time</option>
                        </select>

                        <!-- Ordering -->
                        <div v-if="selected !== 'No filter' && selected !== 'time' && city === 'All' && owner === 'All' && brand === 'All'" class="flex flex-col gap-1">
                            <i @click="fromAtoZClicked" class="fa-solid fa-arrow-up-z-a text-[#1d1d1d] cursor-pointer duration-100" :class="fromAtoZ ? 'text-[#2acc97]' : ''"></i>
                            <i @click="fromZtoAClicked" class="fa-solid fa-arrow-up-a-z text-[#1d1d1d] cursor-pointer duration-100" :class="!fromAtoZ ? 'text-[#2acc97]' : ''"></i>
                        </div>
                        <div v-else-if="selected === 'time'" class="flex flex-col gap-1">
                            <i @click="timeAscendingClicked" class="fa-solid fa-arrow-up text-[#1d1d1d] cursor-pointer duration-100" :class="timeAscending ? 'text-[#2acc97]' : ''"></i>
                            <i @click="timeDescendingClicked" class="fa-solid fa-arrow-down text-[#1d1d1d] cursor-pointer duration-100" :class="!timeAscending ? 'text-[#2acc97]' : ''"></i>
                        </div>
                    </div>
                </div>

                <!-- City filter -->
                <div id="sub-filter" v-show="selected === 'city'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">City</h1>
                    </div>
                    <select v-model="city" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>All</option>
                        <option value="Ho Chi Minh">Ho Chi Minh</option>
                        <option value="Ha Noi">Ha Noi</option>
                        <option value="Bac Ninh">Bac Ninh</option>
                        <option value="Hue">Hue</option>
                    </select>
                </div>

                <!-- Owner filter -->
                <div id="sub-filter" v-show="selected === 'owner'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">Owner</h1>
                    </div>
                    <SearchBar width="w-[70%]" placeholder="Enter the SSN..."/>
                </div>

                <!-- Brand filter -->
                <div id="sub-filter" v-show="selected === 'brand'" class="flex items-center gap-2">
                    <div class="flex items-center">
                        <h1 class="text-[#9196a4] font-semibold">Brand</h1>
                    </div>
                    <select v-model="brand" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>All</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="RollRoyce">RollRoyce</option>
                        <option value="Bentley">Bentley</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Kia">Kia</option>
                        <option value="Vinfast">Vinfast</option>
                    </select>
                </div>

                <!-- Time filter -->
                <div id="sub-filter" v-show="selected === 'time'" class="flex items-center gap-2">
                    <select v-model="time.year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>All</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                    <select v-model="time.quarter" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>All</option>
                        <option value="q1">Q1</option>
                        <option value="q2">Q2</option>
                        <option value="q3">Q3</option>
                        <option value="q4">Q4</option>
                    </select>
                    <select v-model="time.month" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-[#2acc97] focus:border-[#2acc97] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>All</option>
                        <option value="January">Jan</option>
                        <option value="Febuary">Feb</option>
                        <option value="March">Mar</option>
                        <option value="April">Apr</option>
                        <option value="May">May</option>
                        <option value="June">Jun</option>
                        <option value="July">Jul</option>
                        <option value="August">Aug</option>
                        <option value="September">Sep</option>
                        <option value="October">Oct</option>
                        <option value="November">Nov</option>
                        <option value="December">Dec</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center gap-2 w-[17%] justify-end">
            <i class="fa-solid fa-circle-arrow-left text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('left')"></i>
            <div class="flex items-center">
                <input type="number" min="1" :value="pageNumber" @keyup.enter="enterHandler($event.target.value)" class="border border-[#1d1d1d] border-opacity-10 p-[2px] w-10">
                <div>/100</div>
                <!-- <div class="text-green-400">{{ typeof pageNumber }}</div> -->
            </div>
            <i class="fa-solid fa-circle-arrow-right text-[#1d1d1d] text-base cursor-pointer hover:text-[#2acc97]" @click="pageHandler('right')"></i>
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