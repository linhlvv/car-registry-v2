<template>
    <!-- {{ data }} -->
    <div class="w-full h-full max-[914px]:w-full max-[500px]:h-[50vh]">
        <Bar :data="data" :options="options" class="w-full max-[914px]:w-full max-[500px]:h-[50vh]" />
    </div>
</template>

<style scoped></style>

<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { ref, onMounted, onBeforeMount, watch, onUpdated } from 'vue';
import { Bar } from 'vue-chartjs';
import { useAccountStore } from "../../stores/AccountStore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const accountStore = useAccountStore();
const props = defineProps(['year']);

const chartData = ref({});
let registedCarList = []
let expiredCarList = []
const dataList = ref([])
const loaded = ref(false)

const data = ref({
    labels: [],
    datasets: [{ data: [] }]
})
const options = ref({})

let chartRegisted, chartExpired;

const fetchData = async () => {
    const res = await fetch(`http://localhost:1111/chart`, {
        credentials: "include",
        headers: {
            'Authorization': `${accountStore.getToken}`
        }
    })
    dataList.value = JSON.parse(await res.text())
    chartData.value = dataList.value.Data[props.year];
    console.log(`chart data: ${JSON.stringify(chartData.value)}`);

    chartRegisted = chartData.value.regist.month;
    chartExpired = chartData.value.expire.month;

    registedCarList = [
        chartRegisted.January,
        chartRegisted.February,
        chartRegisted.March,
        chartRegisted.April,
        chartRegisted.May,
        chartRegisted.June,
        chartRegisted.July,
        chartRegisted.August,
        chartRegisted.September,
        chartRegisted.October,
        chartRegisted.November,
        chartRegisted.December,
    ]

    expiredCarList = [
        chartExpired.January,
        chartExpired.February,
        chartExpired.March,
        chartExpired.April,
        chartExpired.May,
        chartExpired.June,
        chartExpired.July,
        chartExpired.August,
        chartExpired.September,
        chartExpired.October,
        chartExpired.November,
        chartExpired.December,
    ]
    data.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Registed cars',
                color: '#36A2EB',
                backgroundColor: ['#2acc97'],
                data: registedCarList
            },
            {
                label: 'Expired cars',
                color: '#36A2EB',
                backgroundColor: ['#93a3e6'],
                data: expiredCarList
            },
        ]
    }

    options.value = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                }
            },
            x: {
                ticks: {
                    fontSize: 20,
                },
            }
        },
        animations: {
            easing: 'easeOutQuart',
        },
    }
}

fetchData();

watch(() => props.year, (newYear, oldYear) => {
    if(newYear !== oldYear) {
        console.log('change');
        chartData.value = dataList.value.Data[newYear];
        chartRegisted = chartData.value.regist.month
        chartExpired = chartData.value.expire.month

        registedCarList = [
            chartRegisted.January,
            chartRegisted.February,
            chartRegisted.March,
            chartRegisted.April,
            chartRegisted.May,
            chartRegisted.June,
            chartRegisted.July,
            chartRegisted.August,
            chartRegisted.September,
            chartRegisted.October,
            chartRegisted.November,
            chartRegisted.December,
        ]

        expiredCarList = [
            chartExpired.January,
            chartExpired.February,
            chartExpired.March,
            chartExpired.April,
            chartExpired.May,
            chartExpired.June,
            chartExpired.July,
            chartExpired.August,
            chartExpired.September,
            chartExpired.October,
            chartExpired.November,
            chartExpired.December,
        ]

        data.value = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Registed cars',
                    color: '#36A2EB',
                    backgroundColor: ['#2acc97'],
                    data: registedCarList
                },
                {
                    label: 'Expired cars',
                    color: '#36A2EB',
                    backgroundColor: ['#93a3e6'],
                    data: expiredCarList
                },
            ]
        }

    }
})

// ChartJS.defaults.font.size = 10

</script>
  