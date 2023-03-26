<script setup>
    const props = defineProps(['color', 'bgColor', 'icon']);
    const emit = defineEmits(['clicked']);
    const clickHandler = () => {
        emit('clicked')
    };

</script>

<template>
    <button
        @click="clickHandler"
        :style="{color: color, background: bgColor}"
        class="text-white"
    >
        <strong>
            <slot name="content"></slot>
        </strong>
        <i :class="icon">
            <slot name="icon"></slot>
        </i>
    </button>
</template>

<style scoped>
    button {
        border-radius: 4px;
        padding: 5px;
        background-color: #2acc97;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    button:active {
        background-color: #1feea9;
    }
</style>