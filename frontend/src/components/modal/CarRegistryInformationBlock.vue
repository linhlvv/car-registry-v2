<script setup>
const props = defineProps(['registryCode', 'registryDate', 'expiredDate', 'centerName']);
</script>

<template>
    <div class="bg-[#f2f4f9] flex flex-col w-[90%] h-32 mb-4 rounded-md active:border-2 active:border-[#2acc97] active:bg-[#cdfcec]/40">
        <div class="text-xs max-[610px]:text-[10px] font-semibold text-[#1d1d1d] text-opacity-60 h-[15%] flex items-end justify-center text-center">
            Registry information
        </div>
        <div class="text-[#1d1d1d] text-opacity-70 h-[15%] flex items-center justify-center text-center font-bold text-xs max-[610px]:text-[10px]">
            #{{ registryCode }}
        </div>
        <div class="h-[70%] flex flex-col justify-center w-full p-3 gap-2">
            <div class="flex items-center w-full">
                <div class="flex flex-col w-1/2">
                    <div class="text-[8px] max-[610px]:text-[7px]">
                        Registry date
                    </div>
                    <div class="text-[13px] font-medium max-[610px]:text-[11px]">
                        {{ registryDate }}
                    </div>
                </div>
                <div class="flex flex-col w-1/2">
                    <div class="text-[8px] max-[610px]:text-[7px]">
                        Expired date
                    </div>
                    <div class="text-[13px] font-medium max-[610px]:text-[11px]">
                        {{ expiredDate }}
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="text-[8px] max-[610px]:text-[7px]">
                    Center
                </div>
                <div class="text-[13px] font-medium hover:underline cursor-pointer max-[610px]:text-[11px]">
                    {{ centerName }}
                </div>
            </div>
        </div>
    </div>
</template>