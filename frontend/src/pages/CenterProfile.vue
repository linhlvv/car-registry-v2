<script setup>
import Information from '../components/profile/Information.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute()
const isAdmin = ref(localStorage.getItem('userType') == 1)
const isAdminPage = ref(route.params.id == 111)

const centerInfo = ref({});
const fetchCenterInfoData = async() => {
    if(isAdmin.value) {
        const res = await fetch(`http://localhost:1111/preview-centre-info`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `${localStorage.getItem('token')}`
			},
            body: JSON.stringify({ centreId: route.params.id })
        })
        if(res.error) {
            console.log(res.error);
        }
        const dataList = JSON.parse(await res.text())[0]
        centerInfo.value = dataList
    } else {
        const res = await fetch(`http://localhost:1111/centre-info`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
				'Authorization': `${localStorage.getItem('token')}`
			},
        })
        if(res.error) {
            console.log(res.error);
        }
        const dataList = JSON.parse(await res.text())[0]
        centerInfo.value = dataList
    }
    
};


onMounted(() => {
    fetchCenterInfoData();
});

</script>

<template>
    <div class="w-full">
        <div v-if="isAdmin && isAdminPage" class="flex flex-col w-full p-8 items-center space-y-4">
            <div class="bg-white w-full max-w-5xl rounded-xl flex flex-col items-center space-y-4 shadow p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-24 h-24 p-2 rounded-full text-[#2acc97] border-solid border-4 border-[#2acc97]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
                <p class="text-2xl text-[#1d1d1d] font-medium">Vietnam Register</p>
            </div>
            <div class="w-full max-w-5xl grid grid-cols-2 max-sm:grid-cols-1 grid-rows-[repeat(x,max-content),1fr] gap-4">
                <div class="w-full rounded-xl shadow bg-white flex flex-col space-y-1 items-center py-4 max-sm:px-4 px-10 group transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md">
                    <p class="text-lg font-semibold text-[#1d1d1d]">Address</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 p-2 rounded-full text-red-500 bg-red-500/20 transition-all duration-500 group-hover:[transform:rotateY(180deg)]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p class="text-base font-medium text-[#1d1d1d] text-center">
                        18 Pham Hung Street, My Đinh 2 Ward, Nam Tu Liem, Hanoi
                    </p>
                </div>
                <div class="w-full rounded-xl shadow bg-white flex flex-col space-y-1 items-center py-4 max-sm:px-4 px-10 group transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md">
                    <p class="text-lg font-semibold text-[#1d1d1d]">Phone</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 p-2 rounded-full text-[#93a3e6] bg-[#93a3e6]/20 transition-all duration-500 group-hover:[transform:rotateY(180deg)]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <p class="text-base font-medium text-[#1d1d1d] text-center">
                        (84) 024.37684719 - 37684716
                    </p>
                </div>
                <div class="w-full rounded-xl shadow bg-white flex flex-col space-y-1 items-center py-4 max-sm:px-4 px-10 group transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md">
                    <p class="text-lg font-semibold text-[#1d1d1d]">Fax</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 p-2 rounded-full text-[#ff8c00] bg-[#ff8c00]/20 transition-all duration-500 group-hover:[transform:rotateY(180deg)]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg>
                    <p class="text-base font-medium text-[#1d1d1d] text-center">
                        (84) 024.37684779 - 37684727
                    </p>
                </div>
                <div class="w-full rounded-xl shadow bg-white flex flex-col space-y-1 items-center py-4 max-sm:px-4 px-10 group transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md">
                    <p class="text-lg font-semibold text-[#1d1d1d]">Email</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 p-2 rounded-full text-[#ff00ff] bg-[#ff00ff]/20 transition-all duration-500 group-hover:[transform:rotateY(180deg)]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <p class="text-base font-medium text-[#1d1d1d] text-center">
                        vr-id@vr.org.vn
                    </p>
                </div>
            </div>
        </div>
        <div v-else class="flex p-8 gap-[3rem] max-w-full max-[914px]:flex-col">
            <Information :center="centerInfo"/>
        </div>
    </div>
</template>

<style scoped>

</style>