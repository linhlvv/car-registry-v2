<script setup>
import Input from '@/components/UI/Input.vue';
import Intro from './Intro.vue'
import Button from '../UI/Button.vue';
import { ref } from 'vue';

const email = ref('')
const password = ref('')

const loginHandler = () => {
    console.log("login");
};

</script>

<template>
    <div class="login">
        <div class="login-inner w-[60%]">
            <Intro class="w-[45%]"/>
            <div class="login-form bg-white w-[55%]">
                <div class="title">Login</div>
                <div class="w-full flex flex-col">
                    <div class="text-[10px] font-bold text-[#1d1d1d] text-opacity-90">Email</div>
                    <Input placeholder="Email" type="email" v-model="email"/>
                </div>
                <div class="w-full flex flex-col">
                    <div class="text-[10px] font-bold text-[#1d1d1d] text-opacity-90">Password</div>
                    <Input placeholder="Password" type="password" v-model="password"/>
                </div>
                <!-- <div>{{ email }}</div> -->
                <Button @clicked="loginHandler" icon="fa-sharp fa-solid fa-right-to-bracket">
                    <template #content>Login</template>
                </Button>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login {
        display: flex;
        justify-content: center;
    }
    .login-inner {
        display: flex;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 4px 5px 8px rgb(218, 218, 218);
        animation: pop-out 1s;
    }

    @keyframes pop-out {
        from {
            opacity: 0;
            transform: translateY(1rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
    }

    .title {
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
    }

    @media screen and (max-width: 768px) {
        .login-form {
            width: 70vw;
        }
    }
</style>