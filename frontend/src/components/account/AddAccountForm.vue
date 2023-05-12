<script setup>
import { ref, watch } from 'vue';
import { useAccountStore } from '../../stores/AccountStore';
import Button from '../UI/Button.vue';
import AccountInput from './AccountInput.vue';

const emit = defineEmits('refetchList')

const accountStore = useAccountStore()

const defaultInfo = {
    email: '',
    name: '',
    district: '',
    city: '',
}

const accountInfo = ref({...defaultInfo});

const messageTime = 3
const errorMessageOn = ref(false)
const errorMessageTime = ref(messageTime)
let errorMessageInterval;
//TODO - post account
const handleAddAccount = async () => {
    if(accountInfo.value.email === '' ||
        accountInfo.value.name === '' ||
        accountInfo.value.district === '' ||
        accountInfo.value.city === '') {
            errorMessageOn.value = true
            clearInterval(errorMessageInterval)
            errorMessageTime.value = messageTime
            errorMessageInterval = setInterval(() => {
                errorMessageTime.value -= 1
            }, 1000);
    } else {
        const res = await fetch(`http://localhost:1111/insert-centre`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accountStore.getToken}`
            },
            body: JSON.stringify({
                centreName: accountInfo.value.name,
                email: accountInfo.value.email,
                city: accountInfo.value.city,
                district: accountInfo.value.district,
            }),
        })
        if(res.error) {
            console.log(res.error);
        }
        console.log(res);
        if(res.status === 200) {
            emit('refetchList')
            accountInfo.value = {...defaultInfo}
        }
    }
};

//SECTION - watchers
watch(() => errorMessageTime.value, () => {
    if(errorMessageTime.value === 0) {
        errorMessageOn.value = false
        errorMessageTime.value = messageTime
        clearInterval(errorMessageInterval)
    }
});

</script>

<template>
    <div>{{ accountInfo }}</div>
    <div class="flex flex-col gap-3 p-4 px-6 bg-white rounded-lg w-3/4 mt-2">
        <div class="flex flex-col w-full">
            <AccountInput v-model="accountInfo.name" title="Name" type="text" class="w-full"/>
        </div>
        <div class="flex flex-col w-full">
            <AccountInput v-model="accountInfo.email" title="Email" type="email" class="w-full"/>
        </div>
        <div class="flex flex-col w-full">
            <AccountInput v-model="accountInfo.city" title="City" type="text" class="w-full"/>
        </div>
        <div class="flex flex-col w-full">
            <AccountInput v-model="accountInfo.district" title="District" type="text" class="w-full"/>
        </div>
        <Transition name="slide-fade">
            <div v-if="errorMessageOn" class="flex items-center gap-2 text-[#d54f16]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p class="text-base font-medium">Please fill all the fields</p>
            </div>
        </Transition>
        <div class="w-full flex items-end justify-end py-2">
            <button @click="handleAddAccount" class="flex text-[#1d1d1d] gap-1 rounded-lg items-center text-[13px] cursor-pointer duration-300 hover:text-[#16d592] active:bg-[#cdfcec]/40">
                <i class="fa-sharp fa-solid fa-circle-plus flex items-center"></i>
                <div class="font-semibold">CREATE ACCOUNT</div>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .slide-fade-enter-active {
		transition: all 0.5s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateX(50px);
		opacity: 0;
	}
</style>