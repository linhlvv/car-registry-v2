<script setup>
import Input from '@/components/UI/Input.vue';
import Button from '../UI/Button.vue';
import { useAccountStore } from '../../stores/AccountStore'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const logout = () => {
    const res = fetch("http://localhost:1111/logout", {
        credentials: "include",
    })
    
    if(res.error) {
        console.log(res.error);
    }
    console.log('log out');
}

const router = useRouter();
const accountStore = useAccountStore()
const accountInfo = ref({email: '', password: ''});

const loginHandler = async() => {
    // console.log(`account info: ${JSON.stringify(accountInfo.value)}`);
    const res = await fetch("http://localhost:1111/auth", {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountInfo.value),
    })
    if(res.error) {
        console.log(res.error);
    }
    if(res.status === 400) {
        document.getElementById('loginFailedMessage').innerHTML = '<i class="fa-solid fa-ban"></i> Wrong email or password'
        return
    }
    const data = JSON.parse(await res.text())
    // console.log(`account data login: ${JSON.stringify(data)}`);
    console.log(`authToken login: ${JSON.stringify(data)}`);
    accountStore.authenticate(data.token, accountInfo.value.email, data.id, data.type);
    if(data !== undefined) {
        router.push('/')
    }
};

onMounted(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('userType')
    logout()
});

</script>

<template>
    <div class="w-full flex justify-end pr-[calc(30%-300px)]">
        <div class="flex flex-col items-center justify-center">
            <div class="flex items-end mb-5 pr-6 overflow-hidden group transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 -translate-y-56 group-hover:transition-all [scale:0] group-hover:duration-300 group-hover:[scale:1] group-hover:-translate-y-0">
                    <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
                    <path fill-rule="evenodd" d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z" clip-rule="evenodd" />
                </svg>
                <p class="text-center text-4xl font-semibold text-[#2acc97] group-hover:animate-[smallbounce_0.3s_ease-in-out] group-hover:[animation-delay:0.2s]">
                    Welcome to RegistryTotal
                </p>
            </div>
            <div class="flex rounded-md overflow-hidden w-96">
                <div class="flex flex-col justify-center items-center space-y-6 p-4 bg-transparent w-full">
                    <div class="w-full flex flex-col">
                        <Input placeholder="Email" type="email" v-model="accountInfo.email">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#1d1d1d] text-opacity-60">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </Input>
                    </div>
                    <div class="w-full flex flex-col">
                        <Input placeholder="Password" type="password" v-model="accountInfo.password">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#1d1d1d] text-opacity-60">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                        </Input>
                    </div>
                    <div id="loginFailedMessage" class="w-full text-red-400 text-sm font-semibold"></div>
                    <!-- <div>{{ email }}</div> -->
                    <button @click="loginHandler" class="flex items-center justify-center bg-[#2acc97]/80 hover:bg-[#2acc97] w-fit text-white px-5 py-2 rounded-3xl relative overflow-hidden group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6 ml-1 absolute -translate-x-20 transition-transform duration-300 group-hover:-translate-x-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        <p class="text-base font-bold transition-transform duration-300 group-hover:translate-x-20">Login</p>
                    </button>
                    <!-- <div>{{ accountInfo }}</div> -->
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>