<template>
    <div class="bg-black/40 backdrop-blur-[2px] top-0 left-0 w-full h-screen blur-xl fixed z-10 backdrop-animation"></div>
    <div class="bg-[#f5f7fb] rounded-[8px] p-4 fixed top-[3vh] left-[20%] w-3/5 z-50 flex modal-animation overflow-hidden">

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