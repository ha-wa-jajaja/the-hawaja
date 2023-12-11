<template>
    <button class="px-4 py-2 relative btn">
        <div
            class="h-full w-full px-4 py-2 bg-white text-black absolute inset-0 overlay"
        >
            {{ props.text }}
        </div>
        <p class="text-white dm-sans">{{ props.text }}</p>
    </button>
</template>
<script setup>
const props = defineProps({
    text: {
        type: String,
        default: "VIEW MORE",
    },
});
</script>
<style lang="scss" scoped>
.btn {
    font-size: 28px;
    .overlay {
        -webkit-clip-path: inset(0 98% 0 0);
        clip-path: inset(0 98% 0 0);
        transition: all 0.2s ease-in-out;
    }

    &:hover {
        .overlay {
            -webkit-clip-path: inset(0);
            clip-path: inset(0);
        }
    }
}
</style>
