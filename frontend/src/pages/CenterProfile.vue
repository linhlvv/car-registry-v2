<script setup>
import Information from '../components/profile/Information.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute()
const isAdmin = localStorage.getItem('userType') == 1

const centerInfo = ref({});
const fetchCenterInfoData = async() => {
    if(isAdmin) {
        const res = await fetch(`http://localhost:1111/preview-centre-info`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `${localStorage.getItem('token')}`
			},
            body: JSON.stringify({ centreId: route.params.id })
        })
        const dataList = JSON.parse(await res.text())[0]
        console.log(`center info: ${JSON.stringify(dataList)}`);
        centerInfo.value = dataList
    } else {
        const res = await fetch(`http://localhost:1111/centre-info`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `${localStorage.getItem('token')}`
			},
        })
        const dataList = JSON.parse(await res.text())[0]
        console.log(`center info: ${JSON.stringify(dataList)}`);
        centerInfo.value = dataList
    }
    
};


onMounted(() => {
    fetchCenterInfoData();
});

</script>

<template>
    <div class="w-full">
        <div class="flex p-[2rem] gap-[3rem] max-w-full max-[914px]:flex-col">
            <Information :center="centerInfo"/>
        </div>
    </div>
</template>

<style scoped>

</style>