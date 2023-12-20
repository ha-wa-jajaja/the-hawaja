<template>
    <UiStickyPinSection :height="200" ref="pinWrapper">
        <p class="text-[100px] text-white">WHO I</p>
    </UiStickyPinSection>
</template>
<script setup>
const pinWrapper = ref(null);
const scrollProgress = computed(
    () => pinWrapper.value?.progress
);
</script>
<style lang=""></style>
