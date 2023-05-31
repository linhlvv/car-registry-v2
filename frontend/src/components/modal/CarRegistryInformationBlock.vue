<script setup>
const props = defineProps(['registryCert']);
</script>

<template>
    <div class="flex flex-col w-[90%] h-32 mb-4 rounded-md" :class="registryCert.valid === true ? 'border-2 border-[#2acc97] bg-[#2acc97]/20' : 'border-2 border-[#E0756D] bg-[#E0756D]/20'">
        <div class="text-xs font-semibold text-[#1d1d1d] text-opacity-60 h-[15%] flex items-end justify-center text-center">
            Registry information
        </div>
        <div class="text-[#1d1d1d] text-opacity-70 h-[15%] flex items-center justify-center text-center font-bold text-xs">
            #{{ registryCert.info.id === null ? 'N/A' : registryCert.info.id }}
        </div>
        <div class="h-[70%] flex flex-col justify-center w-full p-3 gap-2">
            <div class="flex items-center w-full">
                <div class="flex flex-col w-1/2">
                    <div class="text-[8px]">
                        Registry date
                    </div>
                    <div class="text-[13px] font-medium">
                        {{ registryCert.info.date === null ? 'N/A' : registryCert.info.date }}
                    </div>
                </div>
                <div class="flex flex-col w-1/2">
                    <div class="text-[8px]">
                        Expired date
                    </div>
                    <div class="text-[13px] font-medium">
                        {{ registryCert.info.expire === null ? 'N/A' : registryCert.info.expire }}
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="text-[8px]">
                    Center
                </div>
                <div class="text-[13px] font-medium hover:underline cursor-pointer">
                    {{ registryCert.info.name  === null ? 'N/A' : registryCert.info.expire }}
                </div>
            </div>
        </div>
    </div>
</template>