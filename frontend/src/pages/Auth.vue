<template>
    <div class="h-screen flex flex-col mt-20">
        <div class="text-[#1d1d1d] text-center mb-[3rem] text-5xl font-semibold duration-500 hover:text-[3.25rem] title">
            Welcome to RegistryTotal
        </div>
        <router-view />
    </div>
</template>

<style scoped>

    @media screen and (max-width: 768px) {
        .title {
            display: none;
        }
    }
</style>