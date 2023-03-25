<script setup>
import RegistrationCarAndOwner from './RegistrationCarAndOwner.vue';
import RegistrationCert from './RegistrationCert.vue';

const emit = defineEmits(['exitModal']);
const exitModal = () => {
    emit('exitModal');
};

</script>

<!-- <script>
export default {
    created() {
        console.log('registration form opened');
    }
}
</script> -->

<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation" @click="exitModal"></div>
    <div class="bg-[#f5f7fb] rounded-[8px] p-4 absolute top-[5vh] left-[10%] w-4/5 z-50 flex modal-animation overflow-hidden">
        <div class="flex flex-col gap-2 w-full">
            <div class="w-full flex gap-2 h-[450px]">
                <RegistrationCarAndOwner />
                <RegistrationCert />
            </div>
            <div class="w-full flex gap-4 justify-end">
                <button @click="exitModal" class="bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Cancel
                </button>
                <button class="bg-[#2acc97]/60 hover:bg-[#2acc97]/75 active:bg-[#2acc97]/90 text-white font-semibold text-xs p-3 px-5 rounded-[4px]">
                    Regist
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .modal-animation {
        animation: slide-down 0.5s;
    }

    @keyframes slide-down {
        from {
            opacity: 0;
            transform: translateY(-2rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>