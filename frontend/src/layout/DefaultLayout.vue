<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Navbar from '../components/UI/Navbar.vue';
import VerticalNavbar from '../components/UI/VerticalNavbar.vue';

const verticalNavOpened = ref(false);
const verticalNavHandler = () => {
    verticalNavOpened.value = !verticalNavOpened.value
};

const screenW = ref(window.innerWidth)

const onResize = () => {
    screenW.value = window.innerWidth
}

onMounted(() => {
    nextTick(() => {
        window.addEventListener('resize', onResize)
    })
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
});

watch(screenW, () => {
    if(screenW.value >= 732) {
        verticalNavOpened.value = false
    }
});

</script>

<template>
    <Navbar :vertical-nav-on="verticalNavOpened" @vertical-nav-clicked="verticalNavHandler"/>
    <Transition name="nav-slide-fade">
        <div v-if="verticalNavOpened" class="fixed w-full top-0 z-50 h-screen">
            <VerticalNavbar :nav-on="verticalNavOpened" @turn-off-nav="verticalNavHandler"/>
        </div>
    </Transition>
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

    .nav-slide-fade-enter-active {
        transition: all 0.5s ease-in-out;
    }

    .nav-slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .nav-slide-fade-enter-from,
    .nav-slide-fade-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }

    .scale-enter-active,
    .scale-leave-active {
        transition: all 0.5s ease;
    }
    
    .scale-enter-from,
    .scale-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }
</style>