<script setup>
import { ref, watch } from 'vue';

const second = ref(0);
const on = ref(false)
let modalInterval;
const trigger = () => {
  setTimeout(() => {console.log(3);}, 3000)
  on.value = true
  second.value = 0
  modalInterval = setInterval(() => {
    second.value += 1
  }, 1000);
  
};

watch(second, (newSec, oldSec) => {
  if(newSec === 3) {
    on.value = false
    second.value = 0
    clearInterval(modalInterval)
  }
});

</script>

<template>
  <div>
    <button @click="trigger" >
        click
    </button>
    <div class="text-red-500">
        dasd
    </div>
    <div v-if="on" class="w-screen flex justify-center items-center">
        <button type="button" class=" py-4 rounded-md flex items-center justify-center text-xl font-semibold w-full" disabled>
            <div v-if="second < 1">
                <svg class="animate-spin h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4335 4335" version="1.1">
                    <path fill="#2acc97" d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                </svg>
            </div>
            <div v-else class="text-black">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            </div>
        </button>
    </div>
    <div>
        {{ second }}
    </div>
  </div>
</template>

<style scoped>
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #2acc97;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #2acc97;
  stroke-miterlimit: 10;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 50px white;
  }
}
</style>