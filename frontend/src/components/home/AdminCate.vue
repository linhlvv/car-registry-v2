<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps(['icon', 'content', 'link', 'description']);
const hovered = ref(false)

const navigate = () => {
    router.push(props.link)
};
</script>

<template>
    <div class="w-1/3 flex flex-col items-center">
        <div class="w-4/5 bg-transparent flex flex-col items-center justify-center h-60 gap-2">
            <div @mouseover="hovered = true" @mouseleave="hovered = false" @click="navigate" class="h-4/5 w-full ease-in-out duration-150 hover:bg-[#2acc97]/70 hover:border-opacity-50 cursor-pointer rounded-xl bg-[#2acc97]/50 border-4 border-solid border-[#2acc97] border-opacity-20 flex flex-col justify-between items-center p-6 gap-4">
                <i :class="icon" class="text-[80px] text-white"></i>
                <div class="text-lg font-semibold text-center text-white">
                    {{ content }}
                </div>
            </div>
        </div>
        <Transition name="slide">
            <div v-if="hovered" class="text-center w-3/5 text-xl font-semibold text-[#585858]">
                {{ description }}
            </div>
        </Transition>
    </div>
</template>

<style scoped>

.slide-enter-active {
    transition: all 0.3s ease-out;
}
.slide-leave-active {
    transition: all 0.25s ease-out;
}
.slide-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}
.slide-leave-to {
    opacity: 0;
    transform: translateX(70px);
}

.slide-fade {
    animation: slide 1s;
}

@keyframes slide {
    from {
        opacity: 0;
        transform: translateX(-2rem);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>