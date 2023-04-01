<script setup>
import Input from '@/components/UI/Input.vue';
import Intro from './Intro.vue'
import Button from '../UI/Button.vue';
import { useAccountStore } from '../../stores/AccountStore'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

localStorage.removeItem('token')

const router = useRouter();
const accountStore = useAccountStore()
const accountInfo = ref({email: '', password: ''});

const loginHandler = async() => {
    console.log(`account info: ${JSON.stringify(accountInfo.value)}`);
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
    console.log(`${res}`);
    const data = JSON.parse(await res.text())
    console.log(`account data login: ${JSON.stringify(data)}`);
    console.log(data.token);
    accountStore.authenticate(data.token);
    if(data !== undefined) {
        router.push('/')
    }
};

</script>

<template>
    <div class="flex justify-center">
        <div class="login-inner flex rounded-md overflow-hidden w-[60%]">
            <Intro class="w-[45%]"/>
            <div class="flex flex-col justify-center gap-4 p-4 max-[928px]:w-[100%] bg-white w-[55%]">
                <div class="text-center text-[2rem] font-semibold">Login</div>
                <div class="w-full flex flex-col">
                    <div class="text-[10px] font-bold text-[#1d1d1d] text-opacity-90">Email</div>
                    <Input placeholder="Email" type="email" v-model="accountInfo.email"/>
                </div>
                <div class="w-full flex flex-col">
                    <div class="text-[10px] font-bold text-[#1d1d1d] text-opacity-90">Password</div>
                    <Input placeholder="Password" type="password" v-model="accountInfo.password"/>
                </div>
                <!-- <div>{{ email }}</div> -->
                <Button @clicked="loginHandler" icon="fa-sharp fa-solid fa-right-to-bracket">
                    <template #content>Login</template>
                </Button>
                <!-- <div>{{ accountInfo }}</div> -->
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login-inner {
        box-shadow: 4px 4px 8px rgb(218, 218, 218);
        animation: pop-out 0.75s;
    }

    @keyframes pop-out {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>