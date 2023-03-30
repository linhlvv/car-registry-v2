<script setup>
import Introduction from '../components/home/Introduction.vue';
import Categories from '../components/home/Categories.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

const data = ref([]);
const fetchData = async() => {
    const res = await fetch(`http://localhost:1111/`, {
        credentials: "include",
    })
    const dataList = JSON.parse(await res.text())
    data.value = dataList;
}
fetchData();

</script>

<!-- <script>
import Introduction from '../components/home/Introduction.vue';
import Categories from '../components/home/Categories.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
    setup() {
        const data = ref([]);
        const fetchData = async() => {
            const res = await fetch(`http://localhost:1111/`)
            const dataList = JSON.parse(await res.text())
            data.value = dataList;
        }
        fetchData();
        return { data }
    },
    components: {Introduction, Categories}
}
</script> -->

<template>
    <div class="flex flex-col w-full min-h-screen">
        <!-- <div> {{ data }} </div> -->
        <Introduction />
        <Categories />
        
    </div>
</template>