<script setup>
const props = defineProps(['isRootRow', 'licensePlate', 'name']);

</script>

<template>
    <div class="w-full flex rounded-sm p-2 slide-fade" :class="isRootRow ? 'rounded-t-lg bg-[#2acc97]/10' : 'bg-white'">
        <div :class="isRootRow ? 'text-sm font-semibold' : 'text-xs font-semibold'" class="w-1/5 flex items-center justify-center text-center text-[#1d1d1d]">
            {{ licensePlate }}
        </div>
        <div :class="isRootRow ? 'text-sm font-semibold' : 'text-xs font-semibold'" class="w-1/2 flex items-center justify-start pl-2 text-center text-[#1d1d1d]">
            {{ name }}
        </div>
        <div class="w-[30%] flex items-center justify-center text-center gap-3">
            <div v-if="!isRootRow" class="flex items-center justify-start gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1">
                <i class="fa-solid fa-circle-info flex items-center text-[12px]"></i>
                <div class="max-[820px]:hidden">Detail</div>
            </div>
            <div v-if="!isRootRow" class="flex items-center justify-center gap-1 rounded-full text-[11px] bg-[#f5f7fb] px-3 py-1 mt-[2px] cursor-pointer duration-200 hover:bg-[#2acc97] text-[#293241] hover:text-white max-[820px]:bg-transparent max-[820px]:px-1">
                <i class="fa-sharp fa-solid fa-registered flex items-center text-[12px]"></i>
                <div class="max-[820px]:hidden">Regist</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .slide-fade {
        animation: slide-fade 0.5s;
    }

    @keyframes slide-fade {
        from {
            opacity: 0;
            transform: translateX(1rem);
        }
        to {
            opacity: 1;
            transform: translateX(0rem);
        }
    }
</style>