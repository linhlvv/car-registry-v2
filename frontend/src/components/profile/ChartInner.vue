<template>
    <div class="w-full h-full max-[914px]:w-full max-[500px]:h-[50vh]">
        <Bar :data="data" :options="options" class="w-full max-[914px]:w-full max-[500px]:h-[50vh]"/>
    </div>
</template>

<style scoped>
</style>

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
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
// ChartJS.defaults.font.size = 10

const data = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Registed cars', 
            color: '#36A2EB', 
            backgroundColor: ['#2acc97'], 
            data: [40, 20, 12, 71, 1000, 2, 31, 51, 65, 92, 194, 49] 
        },
        {
            label: 'Expired cars', 
            color: '#36A2EB', 
            backgroundColor: ['#93a3e6'], 
            data: [40, 20, 12, 71, 100, 2, 31, 51, 65, 92, 194, 49] 
        },
    ]
})
const options = ref({
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
            fontSize: 20
        }
      }
    },
    animations: {
        easing: 'easeOutQuart',
    }
});
</script>
  